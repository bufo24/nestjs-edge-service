import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateEdgeInput {
  @Field(() => String)
  node1_alias: string;

  @Field(() => String)
  node2_alias: string;
}
