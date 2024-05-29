import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id_user: number;

  @Column('text')
  nickname: string;

  @Column('text')
  password: string;

  @Column({
    type: 'text',
    unique: true,
  })
  email: string;

  @Column('text')
  name: string;

  @Column('text')
  last_name: string;

  @Column({ type: 'date' })
  birth_date: Date;

  @Column({ type: 'date', default: () => 'CURRENT_TIMESTAMP', nullable: true })
  create_date: Date;

  @Column({ default: true, nullable: true })
  is_active: boolean;
}
