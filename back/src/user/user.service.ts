import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { User } from '../entities/user.entity';

import { Repository, ILike } from 'typeorm';

import { BcryptService } from 'src/bcrypt/bcrypt.service';


@Injectable()
export class UserService {
  constructor(
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async auth(nickname: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { nickname },
    });

    if (!this.bcryptService.compare(password, user.password)) {
      throw new Error('Invalid password');
    }






  }

  create(createUserDto: CreateUserDto) {
    return this.create(createUserDto);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id } });
  }

  findByUsername(nickname: string) {
    return this.userRepository.findOne({
      where: { nickname: ILike(`%${nickname}%`) },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}
