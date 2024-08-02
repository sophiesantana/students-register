import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const student = plainToInstance(Student, createStudentDto);

    const errors = await validate(student);
    if (errors) {
      const messages = errors.map(
        (error) => `${error.property}: ${Object.values(error.constraints).join(', ')}`,
      );
      throw new BadRequestException(messages);
    }

    return this.studentsRepository.save(createStudentDto);
  }

  async findByParams(params: Partial<Student>): Promise<Student[]> {
    return this.studentsRepository.find({ where: params });
  }

  findAll(): Promise<Student[]> {
    return this.studentsRepository.find();
  }

  findOne(id: string): Promise<Student> {
    return this.studentsRepository.findOneBy({ id });
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
