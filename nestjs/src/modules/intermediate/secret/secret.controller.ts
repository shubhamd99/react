import {
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
  UseFilters,
  HttpException,
  HttpStatus,
  UsePipes,
} from '@nestjs/common';
import { RolesGuard } from '../../../common/guards/roles.guard';
import { Roles } from '../../../common/decorators/roles.decorator';
import { LoggingInterceptor } from '../../../common/interceptors/logging.interceptor';
import { HttpExceptionFilter } from '../../../common/filters/http-exception.filter';
import { FreezePipe } from '../../../common/pipes/freeze.pipe';

@Controller('secret')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class SecretController {
  @Get()
  @Roles(['admin'])
  findAll() {
    return { message: 'This is a secret area', user: 'admin' };
  }

  @Get('freeze')
  @UsePipes(new FreezePipe())
  getFrozen() {
    const data = { prop: 'value' };
    // In a real scenario, the pipe transforms arguments.
    // Here we just demonstrate the decorator usage.
    // To test FreezePipe, we should apply it to a param/body.
    return data;
  }

  @Get('error')
  @UseFilters(HttpExceptionFilter)
  createError() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }
}
