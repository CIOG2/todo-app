import { FC } from 'react';
import TodoI from '@interfaces/todo';
import Styles from '@components/CountTodos/styles.module.css';

interface Props {
    todoList: TodoI[];
}

const CountTodos: FC<Props> = ({ todoList }) => {

    const totalTodos = todoList.length;
    const todoCompleted = todoList.filter(todo => todo.completed).length;

    const mesaage = () => {
        if (totalTodos === 0)
            return `No hay nada por aqui`;
        else if (todoCompleted === totalTodos)
            return `Terminaste todos tus TODO'S`;
        else
            return `Llevas ${todoCompleted} todo's de ${totalTodos}`;
    }
    

    return (
        <section className = {Styles['section__title']}>
            <h1
                className = {Styles['section__title--count']}    
            > 
                {mesaage()}
            </h1>
        </section>
    )
};

export default CountTodos;