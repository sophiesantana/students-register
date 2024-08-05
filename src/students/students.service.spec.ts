import { Test, TestingModule } from '@nestjs/testing';
import { StudentsService } from './students.service';
import { Repository } from 'typeorm';
import { Student } from './entities/student.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

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
  });
});
