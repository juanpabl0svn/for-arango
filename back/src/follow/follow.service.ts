import { Injectable } from '@nestjs/common';
import { CreateFollowDto } from './dto/create-follow.dto';
import { UpdateFollowDto } from './dto/update-follow.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Follow, FollowState } from './entities/follow.entity';

import { Repository } from 'typeorm';

import { Post as PostEntity } from 'src/post/entities/post.entity';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Follow)
    private readonly followRepository: Repository<Follow>,
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  create(createFollowDto: CreateFollowDto) {
    const newFollow = this.followRepository.create(createFollowDto);

    return this.followRepository.save(newFollow);
  }

  async findUserFollows(id_user: number) {
    const followersReq = await this.followRepository
      .createQueryBuilder('follow')
      .innerJoin(User, 'user', 'follow.id_user = user.id_user')
      .where('follow.id_user = :id_user', { id_user })
      .select([
        'follow.id_follow',
        'follow.id_user',
        'follow.id_user_follower',
        'follow.state',
        'follow.request_date',
        'follow.request_update_date',
        'user.nickname',
      ])
      .addSelect('user.id_user', 'follower_id') // Optional: to include follower_id separately
      .getMany();

    console.log(followersReq);
    return followersReq;
  }

  async acceptFollow(id_follow: number) {
    const follow = await this.followRepository.findOne({
      where: { id_follow },
    });

    follow.state = FollowState.ACCEPTED;

    return this.followRepository.save(follow);
  }

  async rejectFollow(id_follow: number) {
    const follow = await this.followRepository.findOne({
      where: { id_follow },
    });

    follow.state = FollowState.REJECTED;

    return this.followRepository.save(follow);
  }

  findOne(id: number) {
    return `This action returns a #${id} follow`;
  }

  update(id: number, updateFollowDto: UpdateFollowDto) {
    return `This action updates a #${id} follow`;
  }

  remove(id: number) {
    return `This action removes a #${id} follow`;
  }
}
