import { Paper, Typography } from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";
import DraggableChipsComponent, {IDraggableChip} from "../draggable-chips";

interface IWorksheetComponentProps {
    chips: IDraggableChip[];
}

const MeasurementPaneComponent: React.SFC<IWorksheetComponentProps> = ({chips}: IWorksheetComponentProps) => (
    <Paper
        square={true}
    >
        <Typography
            variant="title"
        >
            <FormattedMessage
                id="worksheet.measurement.title"
            />
        </Typography>
        <DraggableChipsComponent
            chips={chips}
        />
    </Paper>
);

export default MeasurementPaneComponent;
