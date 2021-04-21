import { Injectable } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { Create_book_dto } from './model/dto/create_book_dto';
import { Book } from './model/book.entity';
import { Connection, UpdateResult } from 'typeorm';
import { CategoryRepository } from '../category/category.repository';

@Injectable()
export class BookService {
  constructor(private bookRepository: BookRepository, private connection: Connection, private categoryRepository: CategoryRepository) {
  }

  async insert(createBookDto: Create_book_dto): Promise<Book> {
    const book = new Book();
    const category = await this.categoryRepository.findOne(createBookDto.categoryId).then((res) => {
      return res;
    });
    book.author = createBookDto.author;
    book.description = createBookDto.description;
    book.title = createBookDto.title;
    book.thumbnail = createBookDto.thumbnail;
    book.category = category;
    return this.bookRepository.save(book);
  }

  findAll(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  findOne(id: number): Promise<Book> {
    return this.bookRepository.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.bookRepository.delete(id);
  }

  async update(id: number, bookDto: Create_book_dto): Promise<void> {
    const book = new Book();
    book.title = bookDto.title;
    book.author = bookDto.author;
    book.description = bookDto.description;
    book.thumbnail = bookDto.thumbnail;
    await this.bookRepository.update(id, book);
  }

}
