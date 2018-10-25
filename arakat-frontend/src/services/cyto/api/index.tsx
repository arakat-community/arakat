import { AxiosPromise } from "axios";
import { INodeSpec } from "../../../common/models/node-specs";
import Api from "../../../config/api";
import Request from "../../request";

/**
 * fetch node specs
 */
export const fetchNodeSpecs: () => AxiosPromise<INodeSpec[]> = () => {
    return (
        new Request<INodeSpec[]>(Api.Backend, "arakat-java-service/get-raw-nodes").get()
    );
};
