import { IsNotEmpty } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty({ message: 'Post id is required' })
  id_post: number;

  @IsNotEmpty({ message: 'User id is required' })
  id_user: number;

  @IsNotEmpty({ message: 'Nickname is required' })
  nickname: string;

  @IsNotEmpty({ message: 'Comment is required' })
  comment: string;
}
