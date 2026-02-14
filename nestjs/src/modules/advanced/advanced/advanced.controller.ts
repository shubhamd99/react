import { Controller, Get } from '@nestjs/common';
import { User } from '../../../common/decorators/user.decorator';
import { ConfigurableService } from '../configurable/configurable.service';
// import { RolesGuard } from '../../../common/guards/roles.guard';

@Controller('advanced')
export class AdvancedController {
  constructor(private readonly configurableService: ConfigurableService) {}

  @Get('user')
  getCustomDecoratorUser(@User() user: unknown) {
    // In a real app with AuthGuard, user would be populated.
    // Here it might be undefined unless we use a guard/middleware to set it.
    return { user: user ?? 'No user attached' };
  }

  @Get('config')
  getConfig() {
    return { folder: this.configurableService.getFolder() };
  }
}
