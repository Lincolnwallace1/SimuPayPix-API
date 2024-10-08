import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import ExceptionMiddleware from '@common/http/middlewares/ExceptionMiddleware';

class App {
  private port = Number(process.env.API_PORT) || 8080;

  constructor() {
    this.init();
  }

  private async init() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(new ExceptionMiddleware());

    app.enableCors({
      origin: true,
    });

    const config = new DocumentBuilder()
      .setTitle('SimuPayPix - API')
      .setDescription('API para o projeto SimuPayPix')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'Authorization',
          in: 'header',
        },
        'Bearer',
      )
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('docs', app, document);

    await app.listen(this.port).then(() => {
      console.log(`Server running on ${this.port}`);
    });
  }
}

export default new App();
