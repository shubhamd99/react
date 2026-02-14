import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BasicModule } from './modules/basic/basic.module';
import { IntermediateModule } from './modules/intermediate/intermediate.module';
import { AdvancedModule } from './modules/advanced/advanced.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BasicModule,
    IntermediateModule,
    AdvancedModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
