import 'reflect-metadata';

import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import path from 'node:path';

(async () => {
  const schema = await buildSchema({
    resolvers: [__dirname + '/resolvers/**/*.resolver.ts'],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
  });

  const server = new ApolloServer({ schema });

  const { url } = await server.listen();

  console.log(`Server running on ${url}`);
})();
