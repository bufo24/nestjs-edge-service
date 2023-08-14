import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { GraphQLSchema } from 'graphql';

export function edgePeersDirectiveTransformer(
  schema: GraphQLSchema,
  directiveName: string,
) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const hasTargetDirective = getDirective(
        schema,
        fieldConfig,
        directiveName,
      )?.[0];

      if (hasTargetDirective) {
        fieldConfig.resolve = async function (source) {
          return `${source.node1_alias}-${source.node2_alias}`;
        };
        return fieldConfig;
      }
    },
  });
}
