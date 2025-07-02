import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  DeleteDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Column,
  VersionColumn,
} from 'typeorm';

export class BaseEntityDto extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @VersionColumn({ default: 1 })
  version: number;
}
