
export const LOADED_QUOTE = 'LOADED_QUOTE';

export const loadQuote = () => async (dispatch) => {
    fetch('https://quotes.rest/qod?category=funny')
        .then(x => x.json())
        .then(x => dispatch({
            type: LOADED_QUOTE,
            payload: x
        }));
}
