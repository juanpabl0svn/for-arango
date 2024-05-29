import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { User } from './entities/user.entity';

import { Repository, ILike } from 'typeorm';

import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { SECRET } from 'src/config';
import { Follow } from 'src/follow/entities/follow.entity';
import { Post as PostEntity } from 'src/post/entities/post.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Follow)
    private readonly followRepository: Repository<Follow>,
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async auth(email: string, password: string) {
    const userData = await this.userRepository.findOne({
      where: { email },
    });

    if (!userData) {
      throw new NotFoundException('User not found');
    }

    const token = this.jwtService.sign(userData.id_user.toString());

    const user = await this.getUserInfo(userData.nickname);

    return { token, ...user };
  }

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await this.bcryptService.hash(
      createUserDto.password,
    );

    const newUser = this.userRepository.create(createUserDto);

    const userCreated = await this.userRepository.save(newUser);

    const token = this.jwtService.sign(userCreated.id_user.toString());

    return { token, ...userCreated };
  }

  async getUserInfo(nickname: string) {
    const user = await this.userRepository.findOne({ where: { nickname } });

    if (!user) {
      throw new Error('User not found');
    }

    const followersCount = await this.followRepository
      .createQueryBuilder('follow')
      .where('follow.id_user = :id_user', { id_user: user.id_user })
      .andWhere('follow.state = :state', { state: 'accepted' })
      .getCount();

    const posts = await this.postRepository
      .createQueryBuilder('post')
      .where('post.id_user = :id_user', { id_user: user.id_user })
      .getMany();

    const pendingFollowsCount = await this.followRepository
      .createQueryBuilder('follow')
      .where('follow.id_user = :id_user', { id_user: user.id_user })
      .andWhere('follow.state = :state', { state: 'pending' })
      .getCount();

    return {
      followersCount,
      posts,
      pendingFollowsCount,
    };
  }

  async findUsers(username: string) {
    return this.userRepository.find({
      where: { nickname: ILike(`%${username}%`) },
    });
  }

  async searchUser(nickname: string, id_user: number) {
    const data = await this.getUserInfo(nickname);

    const user = await this.userRepository.findOne({ where: { nickname } });

    const isFollowing = await this.followRepository.findOne({
      where: {
        id_user,
        id_user_follower: user.id_user,
      },
    });
    return { ...data, ...user, state: isFollowing?.state || null };
  }

  async validate(token: string) {
    const id_user = this.jwtService.verify(token);

    if (!id_user) {
      throw new NotFoundException('Token inválido');
    }

    const user = await this.userRepository.findOne({
      where: { id_user },
    });

    return { ...user, token };
  }

  async update(id_user: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id_user } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.update(id_user, updateUserDto);

    return this.userRepository.findOne({ where: { id_user } });
  }

  async isFollowing(id_user: number, id_user_follower: number) {
    const follow = await this.followRepository.findOne({
      where: { id_user, id_user_follower },
    });
    return follow ? true : false;
  }
}
