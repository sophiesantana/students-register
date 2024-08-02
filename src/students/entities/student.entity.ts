import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { IsEmail, Matches } from 'class-validator';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidv4();

  @Column({ type: 'varchar'})
  name: string;

  @Column({unique: true })
  @Matches(/(?:\d{3}\.){2}\d{3}-\d{2}|\d{11}/, { message: 'CPF inválido.' })
  cpf: string;

  @Column({ type: 'varchar', unique: true })
  @IsEmail({}, { message: 'Email Invalido.' })
  email: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}