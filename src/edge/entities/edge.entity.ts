import { ObjectType, Field, Directive } from '@nestjs/graphql';

@ObjectType()
export class Edge {
  @Field(() => String)
  id: string;

  @Field(() => Date)
  created_at: Date;

  @Field(() => Date)
  updated_at: Date;

  @Field(() => String)
  capacity: string;

  @Field(() => String)
  node1_alias: string;

  @Field(() => String)
  node2_alias: string;

  @Directive('@edge_peers')
  @Field(() => String)
  edge_peers: string;
}
