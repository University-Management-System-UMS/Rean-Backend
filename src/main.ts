import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentVariables } from './common/types/env';
import { AllExceptionsFilter } from './common/interceptors/catch-everything';
import { SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { renderLogs } from './utils/render-logs';
import { ConfigService } from '@nestjs/config';
import { documentBuilderOptions } from './config/swagger/options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
      credentials: true,
    },
  });
  const configService = app.get(ConfigService<EnvironmentVariables>);
  const document = SwaggerModule.createDocument(app, documentBuilderOptions);
  const swaggerRoutePrefix = 'api';
  const httpAdapterHost = app.get(HttpAdapterHost);

  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.use(cookieParser());
  SwaggerModule.setup(swaggerRoutePrefix, app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  await app.listen(
    parseInt(configService.getOrThrow('UMS_POC_PORT')),
    '0.0.0.0',
  );
  await renderLogs(app, swaggerRoutePrefix);
}
bootstrap();
