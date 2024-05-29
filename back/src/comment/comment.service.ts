import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from 'src/follow/entities/follow.entity';

import { Repository } from 'typeorm';

import { Post as PostEntity } from 'src/post/entities/post.entity';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Follow)
    private readonly followRepository: Repository<Follow>,
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    console.log(createCommentDto);

    const post = await this.postRepository.findOne({
      where: { id_post: createCommentDto.id_post },
    });

    const follow = await this.followRepository
      .createQueryBuilder('follow')
      .where('follow.id_user = :id_user', { id_user: post.id_user })
      .andWhere('follow.id_user = :id_user', {
        id_user: createCommentDto.id_user,
      })
      .andWhere('follow.state = :state', { state: 'accepted' })
      .getOne();

    //Si no hay follow pero si es el mismo usuario
    if (!follow && createCommentDto.id_user !== post.id_user)
      throw new UnauthorizedException(
        'You are not allowed to comment this post',
      );

    const newComment = this.commentRepository.create(createCommentDto);

    return this.commentRepository.save(newComment);
  }

  findCommentsInPost(id_post: number) {
    console.log(id_post);
    return this.commentRepository.find({ where: { id_post } });
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
