import { ACTION_TYPES, Actions, IState } from "@/types/coffee-context-state";
import { createContext, useReducer, Dispatch } from "react";

const initialState = {
  latLong: "",
  coffeeStores: [],
};

const StoreContext = createContext<{
  state: IState,
  dispatch: Dispatch<Actions>;
}>(({
  state: initialState,
  dispatch: () => null,
}));

const storeReducer = (state: IState, action: Actions): IState => {
  switch (action.type) {
    case ACTION_TYPES.SET_LAT_LONG: {
      return { ...state, latLong: action.payload.latLong };
    }
    case ACTION_TYPES.SET_COFFEE_STORES: {
      return { ...state, coffeeStores: action.payload.coffeeStores };
    }
    default:
      return state;
  }
};

interface Props {
  children: React.ReactNode;
}

const StoreProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreProvider, StoreContext };