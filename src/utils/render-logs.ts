import { INestApplication } from '@nestjs/common';

export async function renderLogs(
  app: INestApplication<any>,
  swaggerRoutePrefix: string,
) {
  console.log(
    `(${process.env.UMS_POC_NODE_ENV}) Api is running on: ${(await app.getUrl()).toString()}`,
  );
  console.log(
    `(${process.env.UMS_POC_NODE_ENV}) Swagger is running on: ${(await app.getUrl()).toString()}/${swaggerRoutePrefix}`,
  );
}
