import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //decorater가 없는 object를 거릅니다. 즉 걸러서 저장한다.
      forbidNonWhitelisted: true, //whiteList에 없는 object가 하나라도 있으면 그 데이터 자체를 거르고 httpException을 던집니다.
      transform: true, //원하는 타입으로 자동으로 변환해준다.
    }),
  );
  await app.listen(3000);
}
bootstrap();
