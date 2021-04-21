import { EntityRepository, Repository } from 'typeorm';
import { Category } from './model/category.entity';

@EntityRepository(Category)
export  class CategoryRepository extends Repository<Category>{
  
}