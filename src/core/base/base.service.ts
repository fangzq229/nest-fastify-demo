import { Inject } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { requestContext } from '@fastify/request-context';
export class BaseService {
  @Inject(WINSTON_MODULE_PROVIDER)
  public logger: Logger;

  // get http context
  public getContextUser() {
    return requestContext.get('user');
  }
}
