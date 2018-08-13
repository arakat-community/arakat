import React, { Component } from "react";
import Scrollbars , {ScrollbarProps} from "react-custom-scrollbars";

/**
 * customized scrollbar
 */
class Scrollbar extends React.PureComponent<ScrollbarProps, {}> {

    constructor(props: any, ...rest: any[]) {
        super(props, ...rest);
        this.renderThumb = this.renderThumb.bind(this);
      }

      /**
       * renders scrollbar
       * @param param0 scrollbar props
       */
    public renderThumb({ style, ...props }: any): JSX.Element {
        const thumbStyle: any = {
          backgroundColor: "rgba(255, 255, 255, 0.37)",
        };
        return <div style={{ ...style, ...thumbStyle }} {...props} />;
      }

      /**
       * render
       */
    public render(): JSX.Element {
        return (
          <Scrollbars

            renderThumbVertical={this.renderThumb}
            {...this.props}
          />
        );
      }
}

export default Scrollbar;
