import {Theme} from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import DraftsIcon from "@material-ui/icons/Drafts";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import SendIcon from "@material-ui/icons/Send";
import StarBorder from "@material-ui/icons/StarBorder";
import React, { Component } from "react";

const styles: any = (theme: Theme) => ({
  drawerPaper: {
     position: "relative",
     width: 240,
  },
  nested: {
     paddingLeft: theme.spacing.unit * 4,
  },
  root: {
     backgroundColor: theme.palette.background.paper,
     float: "left",
     maxWidth: 360 ,
     position: "relative",
  },

});

export interface INestedProps {
  name?: string;
}

export interface INestedState {
  open: boolean;
  open2: boolean;
}

export type PropsWithStyle = INestedProps & WithStyles<"drawerPaper" | "nested" | "root">;

/**
 * class NestedList
 */
class NestedList extends Component<PropsWithStyle, INestedState> {
  constructor(props: any) {
super(props);

this.state = {
    open: false,
    open2: false,
  };
  }
  public handleClick = () => {
    this.setState((state) => ({ open: !state.open }));
  }
  public handleClick2 = () => {
    this.setState((state) => ({ open2: !state.open2 }));
  }

/**
 * public
 */
  public render() {
    const { classes } = this.props;
    return (

      <div className="genel" >
<div className={classes.root}>
          <ListItem button>
            <ListItemText inset primary="Catagory 1" />
          </ListItem>
</div>
          <div className={classes.root}>
          <ListItem button onClick={this.handleClick2}>

  <ListItemText inset primary="Catagory 2" />
  {this.state.open2 ? <ExpandLess /> : <ExpandMore />}
  </ListItem>
  <Collapse in={this.state.open2} timeout="auto" unmountOnExit>

  <List component="div" disablePadding>
  <ListItem button>
   <ListItemText inset primary="SubCatogary 1" />
  </ListItem>

  <ListItem button>
    <ListItemText inset primary="SubCatogary 2" />
  </ListItem>

</List>
</Collapse>
</div>
<div className={classes.root}>
          <ListItem button onClick={this.handleClick}>

            <ListItemText inset primary="Catagory 3" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button>

                <ListItemText inset primary="SubCatogary 1" />
              </ListItem>
              <ListItem button>

                <ListItemText inset primary="SubCatogary 2" />
              </ListItem>
              <ListItem button>

                <ListItemText inset primary="SubCatogary 3" />
              </ListItem>
            </List>
          </Collapse>
          </div>
      </div>
    );
  }
}

export default withStyles(styles)(NestedList);
