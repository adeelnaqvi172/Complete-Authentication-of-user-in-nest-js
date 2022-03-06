import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { registerUser } from './registerUser.entity';
@Entity()
export class Task {
  @ApiProperty()
  @PrimaryColumn({ type: 'uuid', generated: 'uuid' })
  id: string;

  @Column()
  task_name: string;

  @Column({ nullable: true })
  user_id: string;

  @ManyToOne(() => registerUser, (user) => user.tasks)
  @JoinColumn({ name: 'user_id' })
  user: registerUser;
}
