
export const LOADED_WEATHER = 'LOADED_WEATHER';

export const loadWeather = () => async (dispatch) => {
    fetch('http://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/15.416/lat/60.496/data.json')
        .then(x => x.json())
        .then(x => dispatch({
            type: LOADED_WEATHER,
            payload: x
        }));
}
