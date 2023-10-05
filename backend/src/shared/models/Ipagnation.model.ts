import { Meta } from './IpaginationMeta.model';

export class IpaginationResponse<T> {
  items: T[];
  meta: Meta;
  constructor(data: T[], meta: Meta) {
    this.items = data;
    this.meta = meta;
  }
}
