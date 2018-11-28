import { NodeType } from "../enums/nodeType";
import { ITreeDataModel } from "../chartDecision/chartDecisionTreeModel";

/**
 * Remote Database information 
 */
export interface IDatabaseModel extends ITreeDataModel {
    type: NodeType;
}