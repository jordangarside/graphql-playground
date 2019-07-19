export interface Props {
    endpoint: string;
    shareEnabled?: boolean;
    fixedEndpoint?: boolean;
    isReloadingSchema: boolean;
    endpointUnreachable: boolean;
    editEndpoint: (value: string) => void;
    prettifyQuery: () => void;
    openHistory: () => void;
    share: () => void;
    refetchSchema: () => void;
}
declare const _default: any;
export default _default;
export declare const Button: any;
