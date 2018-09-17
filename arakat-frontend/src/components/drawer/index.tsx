import { ClickAwayListener, Drawer, Theme, withStyles, WithStyles } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import classnames from "classnames";
import React from "react";

const drawerWidth = 240;

const style: any = (theme: Theme) => ({
  content: {
     backgroundColor: theme.palette.background.default,
     flexGrow: 1,
     minWidth: 0, // So the Typography noWrap works
     padding: theme.spacing.unit * 3,
},
  drawerPaper: {
    position: "relative",
    width: drawerWidth,
  },
  root: {
    display: "flex",
    flexGrow: 1,
    height: 975,
    overflow: "hidden",
    position: "relative",
    zIndex: 1,
  },
  toolbar: theme.mixins.toolbar,
});

export interface IDrawerProps {
    onLogoClick: () => void;
    title: string;
}

type PropsWithStyle = IDrawerProps & WithStyles<"root" | "drawerPaper" | "content" | "toolbar">;

const drawer: React.SFC<IDrawerProps> = ({classes, ...props}: PropsWithStyle) => (

    <div className={classes.root}>

      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >

        <div className={classes.toolbar} />
        <ListItem button divider>
          <ListItemText primary="Create New Pipeline" onClick = {props.onLogoClick }/>
        </ListItem>
        <ListItem button>
          <ListItemText primary="Result View" />
        </ListItem>
        <Divider></Divider>
      </Drawer>

    </div>
  );

export default withStyles(style, { withTheme: true })(drawer);
