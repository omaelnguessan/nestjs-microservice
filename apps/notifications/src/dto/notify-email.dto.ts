import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class NotifyEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  text: string;
}
