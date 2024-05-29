import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { BcryptService } from 'src/bcrypt/bcrypt.service';
import { JwtModule } from '@nestjs/jwt';
import { SECRET } from 'src/config';
import { Follow } from 'src/follow/entities/follow.entity';
import { Post } from 'src/post/entities/post.entity';

@Module({
  controllers: [UserController],
  providers: [UserService, BcryptService],
  imports: [
    TypeOrmModule.forFeature([User, Follow, Post]),
    JwtModule.register({
      global: true,
      secret: SECRET,
    }),
  ],
})
export class UserModule {}
