import { GraphQLScalarType, Kind } from 'graphql';

export const Datetime = new GraphQLScalarType({
    name: 'Datetime',
    parseValue(value) {
        // value from the client
        return new Date(value);
    },
    serialize(value: Date) {
        // value sent to the client
        return value.toISOString();
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            // ast value is always in string format
            return new Date(ast.value);
        }
        return null;
    },
});
