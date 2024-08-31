import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  @Column({ name: 'fullname', type: 'character varying', length: 255 })
  fullname: string;

  @Column({ name: 'password', type: 'character varying', length: 255 })
  password: string;

  @Column({ name: 'accountBalance', type: 'decimal', precision: 10, scale: 2 })
  accountBalance: number;

  @Column({ name: 'enabled', type: 'boolean', default: true })
  enabled: boolean;

  @Column({ name: 'createdAt', type: 'timestamp with time zone' })
  createdAt: Date;

  @Column({ name: 'updatedAt', type: 'timestamp with time zone' })
  updatedAt: Date;
}

export default User;
