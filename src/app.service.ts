import { Injectable } from '@nestjs/common';
import { EdgeService } from './edge/edge.service';
import { Edge } from '@prisma/client';

@Injectable()
export class AppService {
  constructor(private readonly edgeService: EdgeService) {}

  async updateEdgeOnCreated(edge: Edge): Promise<void> {
    await this.edgeService.update({
      id: edge.id,
      node1_alias: `${edge.node1_alias}-updated`,
      node2_alias: `${edge.node2_alias}-updated`,
    });
  }
}
