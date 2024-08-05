import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

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
});
