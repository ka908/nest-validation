import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './book/user.entity';
import { UserService } from './book/user.service';
import { BookController } from './book/book.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'aka',
      entities: [User],
      synchronize: true, // Avoid in production; use migrations instead
    }),
    BookModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
