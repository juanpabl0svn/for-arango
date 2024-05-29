import { IsEnum, IsNotEmpty } from 'class-validator';
import { FollowState } from '../entities/follow.entity';

export class  CreateFollowDto {
  @IsNotEmpty({ message: 'User id is required' })
  id_user: number;

  @IsNotEmpty({ message: 'User follower id is required' })
  id_user_follower: number;
}
