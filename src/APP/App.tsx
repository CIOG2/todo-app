import { useState } from 'react';
import { getFromLocalStorage } from '@utils/localStorage';
import AddTodo from '@components/AddTodo';
import ModalCreateTodo from '@components/ModalCreateTodo';
import Todo from '@components/Todo';
import CountTodos from '@components/CountTodos';
import Styles from './App.module.css';
import TodoI from '@interfaces/todo';

function App() {
    const [ modal , setModal ] = useState(false);
    const [ todoList , setTodoList ] = useState<TodoI[]>(getFromLocalStorage());

    return (
        <main className = {Styles['main']}>
            
            <CountTodos
                todoList = {todoList}
            />
            
            <AddTodo 
                modal = {modal}
                setModal = {setModal}
            />
            {modal && 
                <ModalCreateTodo
                    newTodo = {true}
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
                            color = {todo.color}
                            completed = {todo.completed}
                            setTodoList = {setTodoList}
                            setModal = {setModal}
                        />
                    ))
                    :<img 
                        src='/flecha.png'
                        alt='flecha'
                        className = {Styles['main__section--img']}    
                    />  
                }
            </section>
        </main>

    )
}

export default App