import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { SecretController } from './secret/secret.controller';
import { LoggerMiddleware } from '../../common/middleware/logger.middleware';
import { AuthMiddleware } from '../../common/middleware/auth.middleware';

@Module({
  controllers: [SecretController],
})
export class IntermediateModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, AuthMiddleware).forRoutes('secret');
  }
}
