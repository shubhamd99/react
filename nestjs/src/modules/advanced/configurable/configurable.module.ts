import { Module } from '@nestjs/common';
import { ConfigurableService } from './configurable.service';
import { ConfigurableModuleClass } from './configurable.definition';

@Module({
  providers: [ConfigurableService],
  exports: [ConfigurableService],
})
export class ConfigurableModule extends ConfigurableModuleClass {}
