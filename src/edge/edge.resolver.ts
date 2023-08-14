import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { EdgeService } from './edge.service';
import { Edge } from './entities/edge.entity';
import { CreateEdgeInput } from './dto/create-edge.input';
import { UpdateEdgeInput } from './dto/update-edge.input';

@Resolver(() => Edge)
export class EdgeResolver {
  constructor(private readonly edgeService: EdgeService) {}

  @Mutation(() => Edge)
  createEdge(@Args('createEdgeInput') createEdgeInput: CreateEdgeInput) {
    return this.edgeService.create(createEdgeInput);
  }

  @Query(() => [Edge], { name: 'edges' })
  getAll() {
    return this.edgeService.getAll();
  }

  @Query(() => Edge, { name: 'edge' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.edgeService.getById(id);
  }

  @Mutation(() => Edge)
  updateEdge(@Args('updateEdgeInput') updateEdgeInput: UpdateEdgeInput) {
    return this.edgeService.update(updateEdgeInput);
  }
}
