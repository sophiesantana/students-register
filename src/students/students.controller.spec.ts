import { Test, TestingModule } from '@nestjs/testing';
import { StudentsController } from './students.controller';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';

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
            create: jest.fn()
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
});
