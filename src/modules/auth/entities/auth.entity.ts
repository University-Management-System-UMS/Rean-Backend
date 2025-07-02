import { BaseEntityDto } from 'src/common/dto/base-entity.dto';
import { UserRoleEnum } from 'src/constants/enums/user-role.enum';
import { TABLE_AUTH } from 'src/constants/table.constant';
import { Student } from 'src/modules/student/entities/student.entity';
import { Column, Entity, OneToOne, Relation } from 'typeorm';

export type IAuth = {
  email: string;

  password: string;

  refreshToken: string;

  tokenVersion: number;

  roles: Array<UserRoleEnum>;
};

@Entity(TABLE_AUTH)
export class Auth extends BaseEntityDto implements IAuth {
  @Column({ enum: UserRoleEnum, type: 'simple-array' })
  roles: Array<UserRoleEnum>;

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
