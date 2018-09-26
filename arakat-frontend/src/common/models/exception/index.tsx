import React from "react";
import { FormattedMessage } from "react-intl";

/**
 * exception class that gets messageId and shows its translated form to user
 */
class Exception {
    private message: JSX.Element;

    constructor(messageId: string) {
        this.message = <FormattedMessage id={messageId} />;
    }

    /**
     * returns message in formatted way
     */
    public getMessage(): JSX.Element {
        return this.message;
    }

}

export default Exception;
