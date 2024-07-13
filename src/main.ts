/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import * as dotenv from 'dotenv';


async function bootstrap() {
  
  dotenv.config();
  const app = await NestFactory.create(AppModule);

  // swagger configuration
  const config = new DocumentBuilder()
    .setTitle('WeRent API Test Documentation')
    .setDescription('API Test for WeRent Rental clothing')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
