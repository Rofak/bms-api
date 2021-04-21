import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from '../../book/model/book.entity';

@Entity({name:'tb_categories'})
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(()=>Book,(book)=>book.category,)
  book:Book[]
}