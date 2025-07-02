import { Body, Controller, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { RegisterStudentDto } from './dto/register-student.dto';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('/register')
  registerStudent(@Body() body: RegisterStudentDto) {
    return this.studentService.registerStudent(body);
  }
}
