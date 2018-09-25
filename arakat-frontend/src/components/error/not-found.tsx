<<<<<<< HEAD
import { Button, Theme, WithStyles } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import {FormattedMessage} from "react-intl";

export interface INotFoundProps {
    onGoBack(): void;
}

const style: any = (theme: Theme) => ({
    body: {
        padding: "22rem",
        textAlign: "center",
    },
});

type PropWithStyles = INotFoundProps & WithStyles<"body">;

const NotFound: React.SFC<PropWithStyles> = ({
    classes,
    ...props,
}: PropWithStyles) => (
    <div className={classes.body}>
        {/* <Typography variant="display3" gutterBottom={true}>
            404
        </Typography>
        <Typography variant="headline" gutterBottom={true}>
            <FormattedMessage id="label.not.found" />
        </Typography>
        <Button onClick={props.onGoBack}><FormattedMessage id="label.go.back.to.dashboard" /></Button> */}
    </div>
);

export default withStyles(style, { withTheme: true })(NotFound);
=======
import { Button, Theme, WithStyles } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { FormattedMessage } from "react-intl";

export interface INotFoundProps {
  onGoBack(): void;
}

const style: any = (theme: Theme) => ({
  body: {
    padding: "22rem",
    textAlign: "center"
  }
});

type PropWithStyles = INotFoundProps & WithStyles<"body">;

const NotFound: React.SFC<PropWithStyles> = ({
  classes,
  ...props
}: PropWithStyles) => (
  <div className={classes.body}>
    <Typography variant="display3" gutterBottom>
      404
    </Typography>
    <Typography variant="headline" gutterBottom>
      <FormattedMessage id="label.not.found" />
    </Typography>
    <Button onClick={props.onGoBack}>
      <FormattedMessage id="label.go.back.to.dashboard" />
    </Button>
  </div>
);

export default withStyles(style, { withTheme: true })(NotFound);
>>>>>>> cef0d678abcd33e8e0dc2c81fb1efa9bba136482
