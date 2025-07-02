import { BaseEntityDto } from 'src/common/dto/base-entity.dto';
import { TABLE_AUTH } from 'src/constants/table.constant';
import { Student } from 'src/modules/student/entities/student.entity';
import { Column, Entity, OneToOne, Relation } from 'typeorm';

export type IAuth = {
  username: string;

  email: string;

  password: string;

  refreshToken: string;

  tokenVersion: number;
};

@Entity(TABLE_AUTH)
export class Auth extends BaseEntityDto implements IAuth {
  @Column({ unique: true, nullable: true })
  username: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true, default: null })
  refreshToken: string;

  @Column({ default: 0 })
  tokenVersion: number;

  @OneToOne(() => Student, (s) => s.auth)
  student: Relation<Student>;
}
