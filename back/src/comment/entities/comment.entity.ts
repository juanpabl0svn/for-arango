import { Post } from 'src/post/entities/post.entity';
import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';



@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id_comment: number;

  @Column()
  @ManyToOne(() => Post, (post) => post.id_post)
  id_post: number;

  @Column()
  nickname: string;

  @Column({ type: 'text' })
  comment: string;

  @CreateDateColumn({ type: 'timestamp' })
  comment_date: Date;
}
