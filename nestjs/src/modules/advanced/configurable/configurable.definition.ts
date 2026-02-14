import { ConfigurableModuleBuilder } from '@nestjs/common';

export interface ConfigurableModuleOptions {
  folder: string;
}

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN } =
  new ConfigurableModuleBuilder<ConfigurableModuleOptions>().build();
