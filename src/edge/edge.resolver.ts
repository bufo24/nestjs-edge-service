import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EdgeService } from './edge.service';
import { Edge } from './entities/edge.entity';
import { CreateEdgeInput } from './dto/create-edge.input';
import { UpdateEdgeInput } from './dto/update-edge.input';

@Resolver(() => Edge)
export class EdgeResolver {
  constructor(private readonly edgeService: EdgeService) {}

  @Mutation(() => Edge)
  async createEdge(
    @Args('createEdgeInput', { name: 'createEdge' })
    createEdgeInput: CreateEdgeInput,
  ) {
    return await this.edgeService.create(createEdgeInput);
  }

  @Query(() => [Edge], { name: 'getEdges' })
  async getAll() {
    return await this.edgeService.getAll();
  }

  @Query(() => Edge, { name: 'getEdge' })
  async getById(@Args('id', { type: () => String }) id: string) {
    const edge = await this.edgeService.getById(id);
    if (!edge) {
      throw new Error(`No Edge found with id ${id}`);
    }
    return edge;
  }

  @Mutation(() => Edge, { name: 'updateEdge' })
  async updateEdge(@Args('updateEdgeInput') updateEdgeInput: UpdateEdgeInput) {
    return await this.edgeService.update(updateEdgeInput);
  }
}
