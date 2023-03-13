import { useState } from 'react';
import { getFromLocalStorage } from '@utils/localStorage';
import AddTodo from '@components/AddTodo';
import ModalCreateTodo from '@components/ModalCreateTodo';
import Todo from '@components/Todo';
import Styles from './App.module.css';
import TodoI from '@interfaces/todo';

function App() {
    const [ modal , setModal ] = useState(false);
    const [ todoList , setTodoList ] = useState<TodoI[]>(getFromLocalStorage());

    return (
        <main className = {Styles['main']}>
            <AddTodo 
                modal = {modal}
                setModal = {setModal}
            />
            {modal && 
                <ModalCreateTodo
                    setModal = {setModal}
                    setTodoList = {setTodoList} 
                />
            }
            <section className = {Styles['main__section']}>
                {(todoList.length > 0) 
                    ?(todoList.map((todo: TodoI, index: number) => 
                        <Todo
                            key = {index}
                            index = {index}
                            text = {todo.text}
                            completed = {todo.completed}
                            setTodoList = {setTodoList}
                        />
                    ))
                    :<p>No hay TODOs</p>  
                }
            </section>
        </main>

    )
}

export default App