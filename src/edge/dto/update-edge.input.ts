import { CreateEdgeInput } from './create-edge.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateEdgeInput extends PartialType(CreateEdgeInput) {
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  node1_alias?: string;

  @Field(() => String, { nullable: true })
  node2_alias?: string;
}
