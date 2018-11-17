import { AxiosPromise } from "axios";
import Api from "../../../config/api";
import Request from "../../request";

/**
 * fetch node specs
 */
export const fetchNodeSpecs: () => AxiosPromise<any[]> = () => {
    return (
        new Request<any[]>(Api.Backend, "arakat-java-service/get-raw-nodes").get()
    );
};

/**
 * fetch edge permissions
 */
export const fetchEdgePermissions: () => AxiosPromise<any[]> = () => {
    return (
        new Request<any[]>(Api.Backend, "arakat-java-service/get-edge-permissions").get()
    );
};

/**
 * 
 * @param graph 
 */
export const saveGraph: (graph: any) => AxiosPromise<any> = (graph: any) => {
    return (
        new Request<any>(Api.Backend, "arakat-java-service/run-graph").post<any>(graph)
    );
};

