import {Grid, Theme, WithStyles, withStyles} from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";
import ButtonType from "../../common/models/button/type";
import ButtonComponent from "../button";

const style: any = (theme: Theme) => ({});

export interface IPageHeaderViewProps {
    onNewButtonClick?: () => void;
    showAddNewButton?: boolean;
    showSearch?: boolean;
}

type AllProps = IPageHeaderViewProps & WithStyles < "" >;

const PageHeaderViewComponent: React.SFC < AllProps > = ({
    classes,
    ...props,
}: AllProps) => (
    <Grid
        container={true}
        direction="row"
        justify="flex-end"
        alignItems="center"
    >
        {/* <Grid
            item={true}
            xs={10}
        >
            <SearchBoxComponentComponent />
        </Grid> */}
        <Grid
            item={true}
            // xs={2}
        >
            <Grid
                container={true}
                justify="flex-end"
            >
                <Grid
                    item={true}
                >
                    <ButtonComponent
                        onClick={props.onNewButtonClick}
                        label={
                                <FormattedMessage
                                    id="action.buttons.add.new"
                                />
                            }
                        type={ButtonType.action}
                    />
                </Grid>
            </Grid>
        </Grid>
    </Grid>
);

export default withStyles(style, {withTheme: true})(PageHeaderViewComponent);
