
export const BUTTON_PRESSED = 'BUTTON_PRESSED';

export const buttonWasPressed = (button) => (dispatch) => {
    dispatch({
        type: BUTTON_PRESSED,
        button
    });
}
