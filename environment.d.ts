declare global {
  namespace NodeJS {
    interface ProcessEnv {
      UMS_POC_PORT: number;
      UMS_POC_NODE_ENV: 'development' | 'staging' | 'production';
      UMS_POC_API_BASE_URL: string;
      UMS_POC_DB_TYPE: 'postgres';
      UMS_POC_DB_HOST: string;
      UMS_POC_DB_PORT: number;
      UMS_POC_DB_USERNAME: string;
      UMS_POC_DB_PASSWORD: string;
      UMS_POC_DB_NAME: string;
      UMS_POC_JWT_ACCESS_TOKEN_SECRET: string;
      UMS_POC_JWT_ACCESS_TOKEN_EXPIRATION: string;
      UMS_POC_JWT_REFRESH_TOKEN_SECRET: string;
      UMS_POC_JWT_REFRESH_TOKEN_EXPIRATION: string;
      UMS_POC_AWS_REGION: string;
      UMS_POC_AWS_S3_BUCKET: string;
      UMS_POC_AWS_S3_ACCESS_KEY: string;
      UMS_POC_AWS_S3_KEY_SECRET: string;
    }
  }
}

export {};
