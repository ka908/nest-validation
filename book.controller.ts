import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UserDto } from './book.Dto';
import { UserCustomPipe } from './custom.pipe';
import { UserService } from './user.service';
import { User } from './user.entity';
import { CustomDto } from './custom.Dto';

@Controller('book')
export class BookController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    console.log(typeof id);
    return this.userService.getUserById(id);
  }
  @Get()
  async getUser(@Body() body: UserDto): Promise<User> {
    const { name } = body;
    console.log(typeof name);
    return this.userService.getUserByName(name);
  }

  @Post('/add')
  async addUserUsingClassValidator(@Body() userDto: UserDto): Promise<any> {
    const user = await this.userService.addUser(userDto);
    console.log(user);
    return { message: 'User added successfully', user };
  }
  @Post('/addByCustomPipe')
  async addUserUsingCustomPipe(
    @Body(new UserCustomPipe()) userDto: CustomDto,
  ): Promise<any> {
    const user = await this.userService.addUserByCustomPipe(userDto);
    return { message: 'User added successfully', user };
  }
}
