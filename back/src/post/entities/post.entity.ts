import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id_post: number;

  @Column()
  @ManyToOne(() => User, (user) => user.id_user)
  id_user: number;

  @Column({ type: 'text' })
  description: string;

  @Column()
  image: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
}
