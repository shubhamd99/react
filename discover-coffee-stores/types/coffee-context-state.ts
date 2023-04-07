export interface IState {
    latLong: string;
    coffeeStores: CoffeeStores;
}

export enum ACTION_TYPES {
    SET_LAT_LONG,
    SET_COFFEE_STORES,
};

type ActionMap<M extends { [index: string]: any }> = {
    [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
    }
    : {
        type: Key;
        payload: M[Key];
    }
};

type ActionPayload = {
    [ACTION_TYPES.SET_LAT_LONG]: {
        latLong: string;
    };
    [ACTION_TYPES.SET_COFFEE_STORES]: {
        coffeeStores: CoffeeStores;
    }
}

export type Actions = ActionMap<ActionPayload>[keyof ActionMap<ActionPayload>];