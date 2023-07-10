import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    return this.userRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }

  async verifyUser(email: string, password: string) {
    const user = await this.userRepository.findOne({ email });
    const passwordIsValid = await bcrypt.compare(password, user.password);
    console.warn('check :' + passwordIsValid);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid');
    }
    return user;
  }
}
