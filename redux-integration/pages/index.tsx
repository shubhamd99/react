import { TodoAction } from '@/store/slice/todoSlice';
import { StoreType } from '@/types/stateTypes'
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'

export default function Home() {
  const dispatch = useDispatch();

  const todo = useSelector((state: StoreType) => state.todo);

  console.log('todos', todo);

  const addTodo = () => {
    dispatch(TodoAction.createTodo({title: 'New Todo'}))
  }

  return (
    <>
      <Head>
        <title>Ecomm Redux Saga App</title>
        <meta name="description" content="Redux Saga App" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <button onClick={addTodo}>Click Me</button>
      </main>
    </>
  )
}
