import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsDate,
  IsDateString,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Nickname is required' })
  nickname: string;

  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsNotEmpty({ message: 'Last name is required' })
  last_name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email' })
  email: string;

  @IsNotEmpty({ message: 'Birth date is required' })
  @IsDateString({}, { message: 'Invalid date' })
  birth_date: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @MaxLength(50, { message: 'Password must be at most 50 characters' })
  password: string;
}
