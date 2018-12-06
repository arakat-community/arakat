import { IBaseChartConfig } from "../baseChartConfig";
import { ProjectionType } from "../enums/projectionType";

/**
 * Chart Configurations Object
 */
export interface IMapConfig<T> extends IBaseChartConfig<T> {
    projectionType: ProjectionType;             // projection to create
}