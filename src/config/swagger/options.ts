import { DocumentBuilder } from '@nestjs/swagger';
import * as project from 'package.json';

export const documentBuilderOptions = new DocumentBuilder()
  .addServer(process.env.UMS_POC_API_BASE_URL)
  .addBearerAuth()
  .setTitle(project.name)
  .setDescription(`API documents (${process.env.UMS_POC_NODE_ENV})`)
  .setVersion(project.version)
  .build();
