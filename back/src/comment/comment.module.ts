import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SECRET } from 'src/config';
import { Follow } from 'src/follow/entities/follow.entity';
import { User } from 'src/user/entities/user.entity';
import { Post } from 'src/post/entities/post.entity';
import { Comment } from './entities/comment.entity';
@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports: [
    TypeOrmModule.forFeature([User, Follow, Post, Comment]),
    JwtModule.register({
      global: true,
      secret: SECRET,
    }),
  ],
})
export class CommentModule {}
