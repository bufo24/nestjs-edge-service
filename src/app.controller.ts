import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { Edge } from '@prisma/client';

@Controller()
export class AppController {
  private readonly logger: Logger;

  constructor(private readonly appService: AppService) {
    this.logger = new Logger(`AppController`);
  }

  @EventPattern('edge.created')
  async handleEdgeCreated(data: Edge) {
    this.logger.log(
      `New channel between ${data.node1_alias} and ${data.node2_alias} with a capacity of ${data.capacity} has been created.`,
    );
    await this.appService.updateEdgeOnCreated(data);
  }
}
