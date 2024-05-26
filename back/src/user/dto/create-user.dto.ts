import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsDate } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  nickname: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @MinLength(6)
  lastname: string;

  @IsNotEmpty()
  @MinLength(6)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  birthday: string;

  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(50)
  password: string;

  @IsDate()
  @IsNotEmpty()
  birth_date: string;
}
