import { AxiosPromise } from "axios";
import { INodeTree } from "../../../common/models/node-tree";
import Api from "../../../config/api";
import Request from "../../request";

/**
 * fetch node tree
 */
export const fetchNodeTree: () => AxiosPromise<INodeTree> = () => {
    return (
        new Request<INodeTree>(Api.Backend, "arakat-java-service/get-categories").get()
    );
};
