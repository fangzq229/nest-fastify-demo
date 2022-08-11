import { Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
export class BaseController {
  @Inject(WINSTON_MODULE_PROVIDER)
  public readonly logger: Logger;
}
