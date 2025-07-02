import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: process.env.UMS_POC_DB_TYPE ?? 'postgres',
        host: process.env.UMS_POC_DB_HOST,
        port: process.env.UMS_POC_DB_PORT,
        username: process.env.UMS_POC_DB_USERNAME,
        password: process.env.UMS_POC_DB_PASSWORD,
        database: process.env.UMS_POC_DB_NAME,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {}
