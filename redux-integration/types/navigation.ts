import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {TodoItemType} from '../types/genericTypes';

export type RootStackParamList = {
  HomeTodo: undefined;
  NewTodo: undefined;
  UpdateTodo: {
    todoItem: TodoItemType;
  };
};

export type TodoScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

export type TodoScreenRouteProp = RouteProp<RootStackParamList>; // const route = useRoute<TodoScreenRouteProp>();
