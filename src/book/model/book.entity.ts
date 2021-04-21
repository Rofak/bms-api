import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from '../../category/model/category.entity';

@Entity({name:'tb_books'})
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 25 })
  title: string;

  @Column({ length: 25 })
  author: string;

  @Column('text')
  description: string;

  @Column()
  thumbnail:string;
  @ManyToOne(()=>Category,(category)=>category.book,{eager:true})
  category:Category;
}
