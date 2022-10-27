import { ValidationPipe, INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { TransformInterceptor } from './common/types/transform.interceptor';

const initSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Guess the location')
    .setDescription('Guess the location API')
    .setVersion('1.0')
    .addTag('Guess Location')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
};

const initValidation = (app: INestApplication) =>
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

const initInterceptors = (app: INestApplication) =>
  app.useGlobalInterceptors(new TransformInterceptor());

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  initSwagger(app);
  initValidation(app);
  initInterceptors(app);

  await app.listen(5000);
}

bootstrap();
