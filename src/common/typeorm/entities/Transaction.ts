import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';

@Entity({ name: 'transaction' })
class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'code', unique: true, type: 'uuid' })
  code: string;

  @Column({
    name: 'valueTransaction',
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  valueTransaction: number;

  @Column({
    name: 'status',
    type: 'character varying',
    length: 32,
  })
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED' | 'REVERSED' | 'NOT_AUTHORIZED';

  @Column({ name: 'type', type: 'character varying', length: 32 })
  type: 'PAYMENT' | 'RECEIPT';

  @Column({ name: 'schedule', type: 'timestamp', nullable: true })
  schedule: Date | null;

  @Column({ name: 'paying', type: 'int', nullable: true })
  paying: number;

  @Column({ name: 'receiving', type: 'int', nullable: true })
  receiving: number;

  @Column({
    name: 'reversalReason',
    type: 'character varying',
    length: 1024,
    nullable: true,
  })
  reversalReason: string | null;

  @Column({ name: 'sentAt', type: 'timestamp', nullable: true })
  sentAt: Date | null;

  @CreateDateColumn({ name: 'createdAt', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.userPayings)
  @JoinColumn({ name: 'paying', referencedColumnName: 'id' })
  paying_: User;

  @ManyToOne(() => User, (user) => user.userReceivings)
  @JoinColumn({ name: 'receiving', referencedColumnName: 'id' })
  receiving_: User;
}

export default Transaction;
