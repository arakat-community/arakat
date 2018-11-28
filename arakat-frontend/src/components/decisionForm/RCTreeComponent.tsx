import { Theme, WithStyles, withStyles, Grid } from "@material-ui/core";
import React, { Component } from "react";
import { defineMessages, FormattedMessage, InjectedIntlProps, injectIntl } from "react-intl";
import { IChartDecision } from "../../models/chartDecision/chartDecision";
import { ITreeDataModel } from "../../models/chartDecision/chartDecisionTreeModel";
import Tree, { TreeNode, CheckData, SelectData, InternalTreeNode } from 'rc-tree';
import 'rc-tree/assets/index.css';
import { NodeType } from "../../models/enums/nodeType";

interface IProps {
    treeData: ITreeDataModel[];
    onSelected?: (selectedNodes: any) => void;
    onDataLoad?: (treeNode: InternalTreeNode) => void;
}

interface IState {
    treeData: ITreeDataModel[];
    defaultExpandedKeys: string[];
    selectedKeys: string[];
    treeNode: InternalTreeNode;
}

const style: any = (theme: Theme) => ({
    select: {
        color: "#000",
        height: 40,
        width: 400,
        marginLeft: 12,
        marginTop: 12,
        fontWeight: 700,
    },
    button: {
        margin: theme.spacing.unit,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

type PropWithStyles = IProps
    & WithStyles<"select" | "button" | "leftIcon" | "rightIcon" | "iconSmall" | "paper">
    & InjectedIntlProps;

/**
 * validates form values and gives apporiate error message
 * @param values form values
 */
const validate: any = (values: IChartDecision) => {
    const errors: any = {};
    if (!values.baseChartDecision) {
        errors.role = <FormattedMessage
            id="form.elements.error.required"
        />;
    }
    return errors;
};

const labels: any = defineMessages({
    placeholder_appNameSelection: {
        id: "Choose an app id",
    },
    placeholder_tableSelection: {
        id: "choose a table",
    },
    placeholder_chartDecision: {
        id: "choose an chart decision item",
    },
});

/**
 * Column Series Component
 * Component creates a folder hierarchy with the given data
 */
class RcTreeComponent extends Component<PropWithStyles, IState, {}> {
    constructor(props: PropWithStyles) {
        super(props);

        this.state = {
            treeData: [],
            defaultExpandedKeys: [],
            selectedKeys: [],
            treeNode: undefined,
        };
    }

    /**
     * render ui outputs
     */
    public render(): JSX.Element {
        const { classes } = this.props;
        return (
            <Grid container>
                <Tree
                    className="myCls" showLine multiple
                    defaultSelectedKeys={this.state.selectedKeys}
                    onSelect={this.onSelect}
                    loadData={this.loadData}
                >
                    {
                        this.createTreeNodes(this.props.treeData)
                    }
                </Tree>
            </Grid>
        );
    }

    private onSelect = (selectedKeys: string[], info: SelectData) => {
        this.setState(
            {
                selectedKeys,
            },
            () => {
                this.props.onSelected(selectedKeys);
            },
        );
    }

    private loadData = (treeNode: InternalTreeNode) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.setState(
                    {
                        treeNode,
                    },
                    () => {
                        this.props.onDataLoad(treeNode);
                    },
                );
                resolve();
            }, 500);
        });
    }

    private createTreeNodes = (treeData: ITreeDataModel[]) => {
        var treeNodeList: JSX.Element[] = [];
        treeData.forEach(element => {
            const hasChildren = element.children.length > 0;
            const treeNode =
                <TreeNode
                    title={element.title}
                    key={element.key}
                    disableCheckbox={hasChildren}
                    isLeaf={element.type === NodeType.COLUMN}
                >
                    {
                        this.createTreeNodes(element.children)
                    }
                </TreeNode>;
            treeNodeList.push(treeNode);
        });
      
        return treeNodeList;
    }
}

export default withStyles(style, { withTheme: true })(injectIntl(RcTreeComponent));
