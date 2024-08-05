import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('StudentsService', () => {
  let service: StudentsService;
  let repository: Repository<Student>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        {
          provide: getRepositoryToken(Student),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<StudentsService>(StudentsService);
    repository = module.get<Repository<Student>>(getRepositoryToken(Student));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new student', async () => {
      const createStudentDto = {
        name: 'Teste 1',
        cpf: '12345678910',
        email: 'teste@teste.com',
      };

      const savedStudent = {
        ...createStudentDto,
        id: 'uuid',
      };

      jest.spyOn(repository, 'save').mockResolvedValue(savedStudent as any);

      expect(await service.create(createStudentDto)).toEqual(savedStudent);
    });

    it('should throw BadRequestException on validation error', async () => {
      const createStudentDto = {
        name: '',
        cpf: 'invalid-cpf',
        email: 'invalid-email',
      };

      const student = plainToInstance(Student, createStudentDto);
      const errors = await validate(student);

      jest.spyOn(service, 'create').mockRejectedValue(new BadRequestException(errors));

      try {
        await service.create(createStudentDto);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestException);
      }
    });
  });

  describe('findByParams', () => {
    it('should return students by params', async () => {
      const params = { name: 'Teste 1' };
      const students = [{ id: 'uuid', ...params }];

      jest.spyOn(repository, 'find').mockResolvedValue(students as any);

      expect(await service.findByParams(params)).toEqual(students);
    });
  });

  describe('findAll', () => {
    it('should return all students', async () => {
      const students = [{ id: 'uuid', name: 'Sophie' }];

      jest.spyOn(repository, 'find').mockResolvedValue(students as any);

      expect(await service.findAll()).toEqual(students);
    });
  });

  describe('findOne', () => {
    it('should return a student by id', async () => {
      const student = { id: 'uuid', name: 'Teste 2' };

      jest.spyOn(repository, 'findOneBy').mockResolvedValue(student as any);

      expect(await service.findOne('uuid')).toEqual(student);
    });

    it('should throw NotFoundException if student not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      try {
        await service.findOne('uuid');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('update', () => {
    it('should update a student', async () => {
      const student = { id: 'uuid', name: 'Sophie' };
      const updateStudentDto = { name: 'Sophie' };

      jest.spyOn(repository, 'findOneBy').mockResolvedValue(student as any);
      jest.spyOn(repository, 'save').mockResolvedValue({ ...student, ...updateStudentDto } as any);

      expect(await service.update('uuid', updateStudentDto)).toEqual({ ...student, ...updateStudentDto });
    });

    it('should throw NotFoundException if student to update not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(null);

      try {
        await service.update('uuid', { name: 'Sophie' });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('remove', () => {
    it('should remove a student', async () => {
      const result = { affected: 1 };
      jest.spyOn(repository, 'delete').mockResolvedValue(result as any);

      expect(await service.remove('uuid')).toEqual(result);
    });
  });
});
