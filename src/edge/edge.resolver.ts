import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EdgeService } from './edge.service';
import { Edge } from './entities/edge.entity';
import { CreateEdgeInput } from './dto/create-edge.input';
import { UpdateEdgeInput } from './dto/update-edge.input';

@Resolver(() => Edge)
export class EdgeResolver {
  constructor(private readonly edgeService: EdgeService) {}

  @Mutation(() => Edge)
  createEdge(
    @Args('createEdgeInput', { name: 'createEdge' })
    createEdgeInput: CreateEdgeInput,
  ) {
    return this.edgeService.create(createEdgeInput);
  }

  @Query(() => [Edge], { name: 'getEdges' })
  getAll() {
    return this.edgeService.getAll();
  }

  @Query(() => Edge, { name: 'getEdge' })
  getById(@Args('id', { type: () => String }) id: string) {
    return this.edgeService.getById(id);
  }

  @Mutation(() => Edge, { name: 'updateEdge' })
  updateEdge(@Args('updateEdgeInput') updateEdgeInput: UpdateEdgeInput) {
    return this.edgeService.update(updateEdgeInput);
  }
}
