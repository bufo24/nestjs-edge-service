import { Inject, Injectable } from '@nestjs/common';
import { CreateEdgeInput } from './dto/create-edge.input';
import { UpdateEdgeInput } from './dto/update-edge.input';
import { PrismaService } from '../prisma/prisma.service';
import { Edge } from '@prisma/client';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class EdgeService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject('EDGE_SERVICE') private rabbitClient: ClientProxy,
  ) {}

  async create(createEdgeInput: CreateEdgeInput): Promise<Edge> {
    const edge = await this.prismaService.edge.create({
      data: {
        capacity: this.getRandomCapacity(),
        ...createEdgeInput,
      },
    });
    this.rabbitClient.emit('edge.created', edge);
    return edge;
  }

  async getAll(): Promise<Array<Edge>> {
    return await this.prismaService.edge.findMany();
  }

  async getById(id: string): Promise<Edge> {
    return await this.prismaService.edge.findUnique({ where: { id } });
  }

  async update(updateEdgeInput: UpdateEdgeInput): Promise<Edge> {
    return await this.prismaService.edge.update({
      where: { id: updateEdgeInput.id },
      data: updateEdgeInput,
    });
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.prismaService.edge.delete({ where: { id } });
      return true;
    } catch (e) {
      return false;
    }
  }

  private getRandomCapacity(): number {
    return 10000;
  }
}
