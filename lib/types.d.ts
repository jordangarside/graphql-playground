import { Observable, FetchResult } from 'apollo-link';
export declare type ApolloLinkExecuteResponse = Observable<FetchResult>;
export declare type HistoryFilter = 'HISTORY' | 'STARRED';
export declare type Environment = 'Node' | 'Browser' | 'Cli';
export declare type GraphQLClient = 'fetch' | 'relay' | 'apollo' | 'graphql-request' | 'curl';
export declare type Theme = 'dark' | 'light';
export declare type CursorShape = 'line' | 'block' | 'underline';
export interface ISettings {
    ['general.betaUpdates']: boolean;
    ['editor.cursorShape']: CursorShape;
    ['editor.fontFamily']: string;
    ['editor.fontSize']: number;
    ['editor.theme']: Theme;
    ['editor.reuseHeaders']: boolean;
    ['prettier.printWidth']: number;
    ['tracing.hideTracingResponse']: boolean;
    ['request.credentials']: 'omit' | 'include' | 'same-origin';
}
