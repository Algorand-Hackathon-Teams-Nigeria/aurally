
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://aurallybackend-production.up.railway.app/graphql",
  documents: "src/app/services/**/*.ts",
  generates: {
    "src/app/services/graphl_generated.ts": {
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        reactApolloVersion: 3
      }
    }
  }
};

export default config;
