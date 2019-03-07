import drinkList from './drinks.json';
import * as moment from 'moment'; 

export const LOADED_DRINKS = 'LOADED_DRINKS';

const STORAGE_KEY = 'Drinks';

const getStorageTodayKey = () =>
    moment().format('DDMMYY')

const getBaseStorageObject = () =>
   ({ amount: 0, caffeine : 0 })

const readStorage = () => {
    const drinks = localStorage.getItem(STORAGE_KEY);
    if(drinks)
        return JSON.parse(drinks);

    return {};
}

const writeStorage = (storage) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(storage));
}

const appendToStorage = (storage, drinkDefinition) => {
    const storageKey = getStorageTodayKey();
    const storageObject = storage[storageKey] ? storage[storageKey] : getBaseStorageObject();

    storageObject.amount += drinkDefinition.amount;
    storageObject.caffeine += drinkDefinition.caffeine;

    storage[storageKey] = storageObject;
    return storageObject;
}

export const loadDrinks = () => async (dispatch) => {
    const today = readStorage()[getStorageTodayKey()];

    dispatch({
        type: LOADED_DRINKS,
        payload: today ? today : getBaseStorageObject()
    });
}

export const addDrink = (drinkKey) => async (dispatch) => {
    const drinkDefinition = drinkList.filter(x => x.key === drinkKey);
    if(drinkDefinition.length === 0)
        return;

    const storage = readStorage();
    const today = appendToStorage(storage, drinkDefinition[0]);
    writeStorage(storage);

    dispatch({
        type: LOADED_DRINKS,
        payload: today
    });
}