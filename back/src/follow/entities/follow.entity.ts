import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

export enum FollowState {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

@Entity('follows')
export class Follow {
  @PrimaryGeneratedColumn()
  id_follow: number;

  @Column()
  @ManyToOne(() => User, (user) => user.id_user)
  id_user: number;

  @Column()
  @ManyToOne(() => User, (user) => user.id_user)
  id_user_follower: number;

  @Column({
    type: 'enum',
    enum: FollowState,
    default: FollowState.PENDING,
  })
  state: FollowState;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  request_date: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  request_update_date: Date;
}
