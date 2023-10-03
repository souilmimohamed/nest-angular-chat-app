import { IsNotEmpty, IsString } from 'class-validator';
import { LoginUserDto } from './login-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto extends LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;
}
