/**
 * defines messagebox's type. According to type messagebox will show confirmation buttons or just an ok button
 */
export enum MessageBoxType {
    alert,
    confirmation,
}

/**
 * state of message box. When send open, message box will be shown
 */
export enum MessageBoxState {
    close,
    open,
}
