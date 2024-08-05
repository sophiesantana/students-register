import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateStudentDto } from './dto/update-student.dto';

describe('StudentsController', () => {
  let controller: StudentsController;
  let service: StudentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentsController],
      providers: [
        {
          provide: StudentsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<StudentsController>(StudentsController);
    service = module.get<StudentsService>(StudentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a student', async () => {
      const createStudentDto: CreateStudentDto = {
        name: 'Teste 1',
        cpf: '12345678910',
        email: 'teste@teste.com',
      };

      const result = { id: 'uuid', ...createStudentDto };
      jest.spyOn(service, 'create').mockResolvedValue(result as any);

      expect(await controller.create(createStudentDto)).toEqual(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of students', async () => {
      const result = [{ id: 'uuid', name: 'Teste 1' }];
      jest.spyOn(service, 'findAll').mockResolvedValue(result as any);

      expect(await controller.findAll({})).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a student by id', async () => {
      const result = { id: 'uuid', name: 'John Doe' };
      jest.spyOn(service, 'findOne').mockResolvedValue(result as any);

      expect(await controller.findOne('uuid')).toEqual(result);
    });

    it('should throw NotFoundException if student not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      try {
        await controller.findOne('uuid');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('update', () => {
    it('should update a student', async () => {
      const updateStudentDto: UpdateStudentDto = { name: 'Jane Doe' };
      const result = { id: 'uuid', name: 'Jane Doe' };
      jest.spyOn(service, 'update').mockResolvedValue(result as any);

      expect(await controller.update('uuid', updateStudentDto)).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should remove a student', async () => {
      const result = { affected: 1 };
      jest.spyOn(service, 'remove').mockResolvedValue(result as any);

      expect(await controller.remove('uuid')).toEqual(result);
    });
  });
});
