import { Inject, Injectable } from '@nestjs/common';
import { MODULE_OPTIONS_TOKEN } from './configurable.definition';
import type { ConfigurableModuleOptions } from './configurable.definition';

@Injectable()
export class ConfigurableService {
  constructor(
    @Inject(MODULE_OPTIONS_TOKEN) private options: ConfigurableModuleOptions,
  ) {}

  getFolder(): string {
    return this.options.folder;
  }
}
