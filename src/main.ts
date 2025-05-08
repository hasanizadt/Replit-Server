
// @ts-ignore
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { LoggerService } from './common/logger/logger.service';

async function bootstrap() {
  console.log('Starting application...');
  const app = await NestFactory.create(AppModule);
  
  const configService = app.get(ConfigService);
  const loggerService = app.get(LoggerService);
  
  loggerService.setContext('Bootstrap');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
    forbidNonWhitelisted: true,
  }));

  app.use(cookieParser());

  app.enableCors({
    origin: configService.get('app.url', 'http://localhost:3000'),
    credentials: true,
  });

  const port = configService.get('app.port', 3000);
  const host = '0.0.0.0';

  await app.listen(port, host);
  
  loggerService.log(`Application is running on: http://localhost:${port}`);
  loggerService.log(`Application is ready!`);
}

bootstrap();
