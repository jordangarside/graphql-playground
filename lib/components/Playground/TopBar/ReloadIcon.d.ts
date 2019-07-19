import * as React from 'react';
export interface Props {
    isReloadingSchema: boolean;
    onReloadSchema?: () => void;
}
declare const ReloadIcon: React.SFC<Props>;
export default ReloadIcon;
