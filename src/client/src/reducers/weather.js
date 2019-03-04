import * as _ from 'lodash'

import { LOADED_WEATHER } from '../actions/weather';
import { __makeTemplateObject } from 'tslib';

const getParameter = (weatherObj, paramName) => {
	var parameter = weatherObj.parameters.filter(function(v){ return v.name === paramName});
	if(parameter && parameter.length > 0){
		return parameter[0].values[0];
	}

	return undefined;
}

const precipitationTypeLookup = (precipitationType) =>{
    switch(precipitationType){
        case 0:
            return "ingen nederbörd";
        case 1:
            return "snö";
        case 2:
            return "snöblandat regn";
        case 3:
            return "regn";
        case 4:
            return "duggregn";
        case 5:
            return "hagel";
        case 6:
            return "fruset regn";
        default:
            return "fallande gummiankor?";
    }
}

const parseWeatherData = data => {
    const dateGrouping = _.groupBy(data.timeSeries, (x) => new Date(x.validTime).getDate());

    return _.mapValues(dateGrouping, weatherData => 
        ({
            predictions: _.map(weatherData, obj => 
                ({
                    time: new Date(obj.validTime),
                    temperature: getParameter(obj, 't'),
                    humidity: getParameter(obj, 'r'),
                    pressure: getParameter(obj, 'msl'),
                    windDirection: getParameter(obj, 'wd'),
                    windSpeed: getParameter(obj, 'ws'),
                    cloudCover: getParameter(obj, 'tcc_mean'),
                    precipitation: getParameter(obj, 'pmean'),
                    precipitationType: getParameter(obj, 'pcat'),
                    precipitationTypeText: precipitationTypeLookup(getParameter(obj, 'pcat'))
                })    
            )
        })
    );
}

export default function weather(state = {}, action) {
  switch (action.type) {    
    case LOADED_WEATHER:
        const weatherObject = parseWeatherData(action.payload);;
        return {...state, ...weatherObject};
    default:
      return state;
  }
}
