import { EntityRepository, Repository } from 'typeorm';
import { Book } from './model/book.entity';

@EntityRepository(Book)
export class BookRepository extends Repository<Book>{

}