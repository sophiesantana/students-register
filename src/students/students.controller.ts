import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto): Promise<Student> {
    return this.studentsService.create(createStudentDto);
  }

  @Get()
  findAll(@Query() params: Partial<Student>): Promise<Student[]> {
    if (Object.keys(params).length) {
      return this.studentsService.findByParams(params);
    }
    return this.studentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Student> {
    return this.studentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(+id);
  }
}
