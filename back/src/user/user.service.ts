import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { User } from './entities/user.entity';

import { Repository, ILike } from 'typeorm';

import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { SECRET } from 'src/config';

@Injectable()
export class UserService {
  constructor(
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async auth(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    const token = this.jwtService.sign(user.id_user.toString());

    console.log(token);

    return { token, ...user };
  }

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await this.bcryptService.hash(
      createUserDto.password,
    );

    const newUser = this.userRepository.create(createUserDto);

    const userCreated = await this.userRepository.save(newUser);

    const token = this.jwtService.sign(userCreated.id_user.toString());

    return { token, ...newUser };
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id_user: number) {
    return this.userRepository.findOne({ where: { id_user } });
  }

  findByUsername(nickname: string) {
    return this.userRepository.findOne({
      where: { nickname: ILike(`%${nickname}%`) },
    });
  }

  async findUsers(username: string) {
    return this.userRepository.find({
      where: { nickname: ILike(`%${username}%`) },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  validate(token: string) {
    console.log(token);
    const id_user = this.jwtService.verify(token);

    if (!id_user) {
      throw new NotFoundException('Token inválido');
    }

    return this.userRepository.findOne({ where: { id_user } });
  }
}
