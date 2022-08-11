import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TestTask {
  @Cron(CronExpression.EVERY_10_SECONDS, { name: 'testTask' })
  handleCron() {}
}
