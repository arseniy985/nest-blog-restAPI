import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle("Blog REST API")
    .setDescription("My first project on a nestjs framework. It includes CRUD of users and posts. I use jwt authorization and prisma orm")
    .setVersion("1.0.0")
    .addTag("API")
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/docs', app, document)

  await app.listen(3000);
}
bootstrap();
