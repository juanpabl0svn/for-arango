import { Module } from '@nestjs/common';
import { FollowService } from './follow.service';
import { FollowController } from './follow.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SECRET } from 'src/config';
import { User } from 'src/user/entities/user.entity';
import { Follow } from './entities/follow.entity';

import { Post } from 'src/post/entities/post.entity';

@Module({
  controllers: [FollowController],
  providers: [FollowService],
  imports: [
    TypeOrmModule.forFeature([User, Follow, Post]),
    JwtModule.register({
      global: true,
      secret: SECRET,
    }),
  ],
})
export class FollowModule {}
