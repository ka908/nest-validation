import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './book.Dto';
import { CustomDto } from './custom.Dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
  async getUserByName(name: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { name } });
    if (!user) {
      throw new NotFoundException(`User with ID ${name} not found`);
    }
    return user;
  }

  async addUser(userDto: UserDto): Promise<User> {
    const user = this.userRepository.create(userDto);
    console.log(user);
    // Create a new user instance
    return this.userRepository.save(user); // Insert user into DB
  }
  async addUserByCustomPipe(userDto: CustomDto): Promise<User> {
    const user = this.userRepository.create(userDto);
    console.log(user);
    return this.userRepository.save(user); // Insert user into DB
  }
}
