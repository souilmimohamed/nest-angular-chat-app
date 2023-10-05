import { Meta } from './IpaginationMeta.model';
export declare class IpaginationResponse<T> {
    items: T[];
    meta: Meta;
    constructor(data: T[], meta: Meta);
}
