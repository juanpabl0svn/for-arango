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
    console.log('entra')
    return this.userService.create(createUserDto);
  }

  @Post('validate')
  validate(@Body() body: { token: string }) {
    return this.userService.validate(body.token);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Post('users')
  findUsers(@Body() body: { username: string }) {
    return this.userService.findUsers(body.username);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
}
