import { GraphQLConfig, GraphQLConfigEnpointConfig } from '../graphqlConfig';
export declare function getActiveEndpoints(config: GraphQLConfig, envName: string, projectName?: string): {
    endpoint: string;
    subscriptionEndpoint?: string;
    headers?: any;
};
export declare function getEndpointFromEndpointConfig(env: GraphQLConfigEnpointConfig | string): {
    endpoint: string;
    subscriptionEndpoint: undefined;
    headers?: undefined;
} | {
    endpoint: string;
    subscriptionEndpoint: string | undefined;
    headers: {
        [name: string]: string;
    } | undefined;
};
