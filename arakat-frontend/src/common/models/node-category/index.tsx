import { INodeMeta } from '../node-meta';

export interface INodeCategory {
    categoryId: string;
    name: string;
    nodes?: INodeMeta[];
    categories?: INodeCategory[];
}
