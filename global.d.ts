// `babel-plugin-import-graphql` enables .graphql files to be imported  as strings
declare module '*.graphql' {
    const gql: string;
    export = gql;
}
