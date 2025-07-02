import { BaseEntityDto } from 'src/common/dto/base-entity.dto';
import { GenderEnum } from 'src/constants/enums/gender.enum';
import { StudentTitleEnum } from 'src/constants/enums/student-title.enum';
import { TABLE_STUDENT } from 'src/constants/table.constant';
import { Auth } from 'src/modules/auth/entities/auth.entity';
import { Column, Entity, JoinColumn, OneToOne, Relation } from 'typeorm';

export type IStudent = {
  firstName: string;
  middleName: string;
  lastName: string;
  dob: Date;
  title: StudentTitleEnum;
  gender: GenderEnum;
};

@Entity(TABLE_STUDENT)
export class Student extends BaseEntityDto implements IStudent {
  @Column({ nullable: true, default: '' })
  firstName: string;

  @Column({ nullable: true, default: '' })
  middleName: string;

  @Column({ nullable: true, default: '' })
  lastName: string;

  @Column({ nullable: true })
  dob: Date;

  @Column({ type: String, enum: StudentTitleEnum, nullable: true })
  title: StudentTitleEnum;

  @Column({
    type: String,
    enum: GenderEnum,
    nullable: true,
    default: GenderEnum.OTHER,
  })
  gender: GenderEnum;

  @OneToOne(() => Auth)
  @JoinColumn()
  auth: Relation<Auth>;
}
