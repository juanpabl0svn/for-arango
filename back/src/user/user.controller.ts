import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('auth')
  auth(@Body() body: { email: string; password: string }) {
    return this.userService.auth(body.email, body.password);
  }

  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    console.log('entra');
    return this.userService.create(createUserDto);
  }

  @Post('validate')
  validate(@Body() body: { token: string }) {
    return this.userService.validate(body.token);
  }

  @Post('users')
  findUsers(@Body() body: { username: string }) {
    return this.userService.findUsers(body.username);
  }

  @Get('nickname/:nickname')
  findOne(@Param('nickname') nickname: string) {
    return this.userService.getUserInfo(nickname);
  }

  @Post('search')
  searchUser(@Body() body: { nickname: string; id_user: number }) {
    return this.userService.searchUser(body.nickname, +body.id_user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
}
