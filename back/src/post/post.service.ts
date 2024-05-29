import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Follow } from 'src/follow/entities/follow.entity';
import { User } from 'src/user/entities/user.entity';

import { Post as PostEntity } from './entities/post.entity';

import { Repository } from 'typeorm';
@Injectable()
export class PostService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Follow)
    private readonly followRepository: Repository<Follow>,
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    const newPost = this.postRepository.create(createPostDto);

    return await this.postRepository.save(newPost);
  }

  findAllPosts(id_user: number) {
    return this.postRepository.find({ where: { id_user } });
  }

  findAll() {
    return this.postRepository.find();
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    return `This action updates a #${id} post`;
  }
}
