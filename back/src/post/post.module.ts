import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SECRET } from 'src/config';
import { Follow } from 'src/follow/entities/follow.entity';
import { User } from 'src/user/entities/user.entity';
import { Post } from './entities/post.entity';


@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [
    TypeOrmModule.forFeature([User, Follow, Post]),
    JwtModule.register({
      global: true,
      secret: SECRET,
    }),
  ],
})
export class PostModule {}
