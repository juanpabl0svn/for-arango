import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FollowService } from './follow.service';
import { CreateFollowDto } from './dto/create-follow.dto';
import { UpdateFollowDto } from './dto/update-follow.dto';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post()
  create(@Body() createFollowDto: CreateFollowDto) {
    return this.followService.create(createFollowDto);
  }

  @Get(':id')
  findUserFollows(@Param('id') id_user: string) {
    return this.followService.findUserFollows(+id_user);
  }

  @Post('accept')
  acceptFollow(@Body() body: { id_follow: number }) {
    return this.followService.acceptFollow(body.id_follow);
  }

  @Post('reject')
  rejectFollow(@Body() body: { id_follow: number }) {
    return this.followService.rejectFollow(body.id_follow);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFollowDto: UpdateFollowDto) {
    return this.followService.update(+id, updateFollowDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.followService.remove(+id);
  }
}
