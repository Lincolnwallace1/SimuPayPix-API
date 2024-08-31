import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

@Entity({ name: 'user' })
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'email',
    unique: true,
    type: 'character varying',
    length: 128,
  })
  email: string;

  @Column({ name: 'fullName', type: 'character varying', length: 255 })
  fullName: string;

  @Exclude()
  @Column({ name: 'password', type: 'character varying', length: 255 })
  password: string;

  @Column({ name: 'accountBalance', type: 'decimal', precision: 10, scale: 2 })
  accountBalance: number;

  @Exclude()
  @Column({ name: 'enabled', type: 'boolean', default: true })
  enabled: boolean;

  @Exclude()
  @CreateDateColumn({ name: 'createdAt', type: 'timestamp' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp' })
  updatedAt: Date;
}

export default User;
