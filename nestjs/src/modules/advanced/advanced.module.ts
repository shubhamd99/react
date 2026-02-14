import { Module } from '@nestjs/common';
import { AdvancedController } from './advanced/advanced.controller';
import { ConfigurableModule } from './configurable/configurable.module';

@Module({
  imports: [ConfigurableModule.register({ folder: 'advanced-examples' })],
  controllers: [AdvancedController],
})
export class AdvancedModule {}
