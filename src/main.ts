import { NestFactory } from '@nestjs/core';
import { VersioningType } from '@nestjs/common';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { configLoader } from './loader';
const Conf: any = configLoader();
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { fastifyRequestContextPlugin } from '@fastify/request-context';
import helmet from '@fastify/helmet';
import fastifyCsrf from 'fastify-csrf';
import cookie from '@fastify/cookie';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ bodyLimit: 10 * 1024 * 1024 }),
    { rawBody: true, logger: false },
  );

  // logger
  const nestWinston = app.get(WINSTON_MODULE_NEST_PROVIDER);

  // Logger Bind Winston
  // const nestWinston = app.get('NestWinston');
  // app.useLogger(nestWinston);

  // helmet （web）
  await app.register(helmet, {
    contentSecurityPolicy: false,
  });

  // csrf
  await app.register(cookie, { secret: Conf.cookie?.secret });
  await app.register(fastifyCsrf, { sessionPlugin: 'fastify-cookie' });

  // http context
  app.register(fastifyRequestContextPlugin, {
    defaultStoreValues: {
      user: { id: '' },
    },
  });

  // Router Prefix
  app.setGlobalPrefix('api');

  // Api Version (Router)
  app.enableVersioning({
    type: VersioningType.URI,
  });

  if (Conf.swagger) {
    const config = new DocumentBuilder()
      .setTitle(Conf.swagger.title)
      .setDescription(Conf.swagger.description)
      .setVersion(Conf.swagger.version)
      .addApiKey(
        {
          type: 'apiKey',
          name: 'token',
          in: 'header',
          description: 'Token is used for authentication',
        },
        'token',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(Conf.swagger.url, app, document, {
      customSiteTitle: Conf.swagger.title,
      customCss: '.swagger-ui .topbar { display: none }',
      swaggerOptions: {
        defaultModelsExpandDepth: -1,
      },
    });
  }
  await app.listen(Conf.prot);
  nestWinston.logger.info('NODE_ENV: ' + process.env.NODE_ENV);
  nestWinston.logger.info('🚀🚀🚀🚀🚀🚀 START SUCCESS 🏆🏆🏆🏆🏆🏆');
  Conf.swagger &&
    nestWinston.logger.info(
      `🖕API DOC URL🖕:http://127.0.0.1:${Conf.prot}${Conf.swagger.url}`,
    );
}
bootstrap();
