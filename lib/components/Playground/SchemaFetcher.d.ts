import { GraphQLSchema } from 'graphql';
import { ApolloLink } from 'apollo-link';
import { Map } from 'immutable';
import { LinkCreatorProps } from '../../state/sessions/fetchingSagas';
export interface TracingSchemaTuple {
    schema: GraphQLSchema;
    tracingSupported: boolean;
}
export interface SchemaFetchProps {
    endpoint: string;
    headers?: string;
}
export declare type LinkGetter = (session: LinkCreatorProps) => {
    link: ApolloLink;
};
export declare class SchemaFetcher {
    cache: Map<string, TracingSchemaTuple>;
    linkGetter: LinkGetter;
    fetching: Map<string, Promise<any>>;
    subscriptions: Map<string, (schema: GraphQLSchema) => void>;
    constructor(linkGetter: LinkGetter);
    fetch(session: SchemaFetchProps): Promise<any>;
    subscribe(session: SchemaFetchProps, cb: (schema: GraphQLSchema) => void): void;
    refetch(session: SchemaFetchProps): Promise<{
        schema: GraphQLSchema;
        tracingSupported: boolean;
    } | null>;
    hash(session: SchemaFetchProps): string;
    private fetchSchema;
}
