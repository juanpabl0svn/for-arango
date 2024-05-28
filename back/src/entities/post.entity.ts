import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id_post: number;

  @ManyToOne(() => User, (user) => user.id_user)
  @JoinColumn({ name: 'id_user' })
  @Column()
  id_user: number;

  @Column()
  uri_resource: string;

  @Column()
  post_date: Date;

  @Column()
  title: string;
}
