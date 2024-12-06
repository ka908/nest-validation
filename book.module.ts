import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [BookController],
  providers: [UserService],
})
export class BookModule {}
