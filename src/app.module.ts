import { Module } from '@nestjs/common';
import { configLoader, moduleLoader } from './loader';
import { join } from 'path';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './core/guard/jwt.guard';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { WinstonModule } from 'nest-winston';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { SequelizeModule } from '@nestjs/sequelize';
import { CacheModule } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { BullModule } from '@nestjs/bull';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    // winston logger
    WinstonModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get('winstion');
      },
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.get('throttler');
      },
    }),
    // config module
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configLoader],
    }),
    // task module
    ScheduleModule.forRoot(),

    // mysql (sequelize orm)
    SequelizeModule.forFeature(
      moduleLoader({ path: join(__dirname, 'core/models') }),
    ),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get('db');
        Object.assign(dbConfig, {
          models: moduleLoader({ path: join(__dirname, 'core/models') }),
        });
        return dbConfig;
      },
    }),

    // cache redis
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          store: redisStore,
          ...configService.get('cache'), // cache 配置
        };
      },
    }),

    // bull mq redis
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => configService.get('mq'),
    }),
    // must inject the relevant queue name
    BullModule.registerQueue(
      { name: 'couponQueue' },
      { name: 'integralQueue' },
      { name: 'findbackQueue' },
      { name: 'userQueue' },
    ),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'views'),
    }),
  ],
  controllers: [...moduleLoader({ path: join(__dirname, 'controller') })],
  providers: [
    // request throttler
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    // global guard
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    ...moduleLoader({ path: join(__dirname, 'service') }),
    ...moduleLoader({ path: join(__dirname, 'task') }),
    ...moduleLoader({ path: join(__dirname, 'socket') }),
    ...moduleLoader({ path: join(__dirname, 'core/mq/queue') }),
    ...moduleLoader({ path: join(__dirname, 'core/mq/work') }),
  ],
})
export class AppModule {}
