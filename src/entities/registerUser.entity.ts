import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Task } from 'src/entities/task.entity';
@Entity()
export class registerUser {
  @ApiProperty()
  @PrimaryColumn({ type: 'uuid', generated: 'uuid' })
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];
}
