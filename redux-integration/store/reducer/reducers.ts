import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import todoSlice from "../slice/todoSlice";

const persistConfig = {
    key: 'todo',
    whitelist: ['todos', 'fetchingTodos'],
    storage: storage // Local Storage
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    todo: persistReducer(persistConfig, todoSlice),
};
