import React, {Component} from "react";
import { connect } from "react-redux";
import {Dispatch} from "redux";
import { ISnackbarMessage } from "../../common/models/snackbar/message";
import { SnackbarType } from "../../common/models/snackbar/type";
import SnackbarComponent, { SnackbarState } from "../../components/snackbar/index";
import { IApplicationState } from "../../store";
import { disposeSnackbar } from "../../store/snackbar/actions";

interface IDispatchProps {
  closeSnackbar: (id: string) => void;
}

interface ISnackbarProps {
    snackBarMessages: ISnackbarMessage[];
}

interface ISnackbarStates {
    snackbarMessage: ISnackbarMessage;
    state: SnackbarState;
}

type AllProps = ISnackbarProps & IDispatchProps;

/**
 * snackbar message's container. this container is binded to redux store.
 */
class Snackbar extends Component<AllProps, ISnackbarStates> {

    /**
     * constructor of snackbar
     * @param props types of ISnackbarProps and IDispatchProps
     */
    constructor(props: AllProps) {
      super(props);

      const snackbarMessage: ISnackbarMessage = {
        id: "0",
        messageId: "",
        type: SnackbarType.info,
      };

      this.state = {
        snackbarMessage,
        state: SnackbarState.closed,
      };
    }

    public componentWillReceiveProps(nextProps: AllProps): void {
      this.processQueue(nextProps.snackBarMessages);
    }

  /**
   * renders output
   */
    public render(): JSX.Element {
        const {snackbarMessage, state} = this.state;
        return (
                  <>
                    {
                        snackbarMessage &&
                        <SnackbarComponent
                            id={snackbarMessage.id}
                            onClose={this.handleClose}
                            onIconCloseClicked={this.handleIconCloseClicked}
                            onExited={this.handleExited}
                            message={snackbarMessage.messageId}
                            state={state}
                            type={snackbarMessage.type}
                        />
                      }
                    </>
                );
    }

    /**
     * gets next snackbar message from message queue
     */
    public processQueue = (snackBarMessages: ISnackbarMessage[]) => {
        if (snackBarMessages.length > 0) {
          // reassign snackbar messages, otherwise redux-store do not be updateds
          const messages: ISnackbarMessage[] = [...snackBarMessages];
          const snackbarMessage: ISnackbarMessage = messages.shift();
          this.setState({
            snackbarMessage,
            state: SnackbarState.open,
          });
        }
      }

      /**
       * event fired when snackbar exits. this function also triggers processQueue for next
       * snackbar in queue
       */
    public handleExited = () => {
        this.processQueue(this.props.snackBarMessages);
      }

    /**
     * event fired on snackbar close. this function also dispatchs disposeSnackbar action
     * to remove shown snackbar from redux's store
     */
    private handleClose = (event: any, reason: any) => {
      if (reason === "clickaway") {
        return;
      }
      const {closeSnackbar} = this.props;
      const {snackbarMessage} = this.state;
      closeSnackbar(snackbarMessage.id);

      this.setState({ state: SnackbarState.closed });
    }

    private handleIconCloseClicked = (event: any) => {
      this.handleClose(event, "userTriggered");
    }
}

const mapDispatchToProps: (dispatch: Dispatch) => IDispatchProps = (dispatch: Dispatch): IDispatchProps => {
  return {
     closeSnackbar: (id: string) => {
       dispatch(disposeSnackbar(id));
     },
  };
};

const mapStateToProps: (state: IApplicationState) => ISnackbarProps =
(state: IApplicationState): ISnackbarProps => ({snackBarMessages: state.snackbar.messages});

export default connect<ISnackbarProps, IDispatchProps>(mapStateToProps, mapDispatchToProps)(Snackbar);
