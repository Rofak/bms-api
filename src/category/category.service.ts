import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { Category } from './model/category.entity';
import { Create_category_dto } from './model/dto/create_category_dto';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {
  }

  async createCategory(categoryDto: Create_category_dto): Promise<Category> {
    const category = new Category();
    category.title = categoryDto.title;
    return await this.categoryRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    return await this.categoryRepository.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }

  async update(id: number, categoryDot: Create_category_dto): Promise<void> {
    const category = new Category();
    category.title = categoryDot.title;
    await this.categoryRepository.update(id, category);
  }
}
