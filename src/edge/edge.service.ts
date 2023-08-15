import { Inject, Injectable } from '@nestjs/common';
import { CreateEdgeInput } from './dto/create-edge.input';
import { UpdateEdgeInput } from './dto/update-edge.input';
import { PrismaService } from '../prisma/prisma.service';
import { Edge, Prisma } from '@prisma/client';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class EdgeService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject('EDGE_SERVICE') private rabbitClient: ClientProxy,
  ) {}

  async create(createEdgeInput: CreateEdgeInput): Promise<Edge> {
    const edge = await this.prismaService.edge.create({
      data: createEdgeInput,
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
    try {
      return await this.prismaService.edge.update({
        where: { id: updateEdgeInput.id },
        data: updateEdgeInput,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new Error(`No Edge found with id ${updateEdgeInput.id}`);
        }
      }
      throw e;
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prismaService.edge.delete({ where: { id } });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2025') {
          throw new Error(`No Edge found with id ${id}`);
        }
      }
      throw e;
    }
  }
}
