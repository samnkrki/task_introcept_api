import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './pipes/validate.pipe';
import { AnyExceptionFilter } from './exceptionFilters/exceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidateInputPipe())
  app.useGlobalFilters(new AnyExceptionFilter());
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
