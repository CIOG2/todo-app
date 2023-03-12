import { FC } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '../../utils/localStorage';
import Styles from './styles.module.css';

interface Props {
    index: number;
    text: string;
    completed: boolean;
    setTodoList: (todo: any) => void;
}

const Todo: FC<Props> = ({index, text, completed, setTodoList}) => {

    const deleteTodo = () => {
        const todoList = getFromLocalStorage();
        if (todoList && typeof(todoList) === 'object') {
            todoList.splice(index, 1);
            saveToLocalStorage(todoList);
            setTodoList(todoList);  
        }
    }

    const completedTodo = () => {
        const todoList = getFromLocalStorage();
        if (todoList && typeof(todoList) === 'object') {
            todoList[index].completed = !todoList[index].completed;
            saveToLocalStorage(todoList);
            setTodoList(todoList);
        }
    }

    return (
        <article className = {`
            ${Styles['article']}
            ${completed && Styles['todo__completed']}   
        `}>
            <div className = {Styles['container']}>
                <label className = {Styles['container__check']}>
                    <input 
                        type="checkbox"
                        checked={completed}
                        onClick={() => completedTodo()}
                    />
                    <div className = {Styles['checkmark']}></div>
                </label>
            </div>
            
            <p  className = {`
                    ${Styles['article__text']}
                    ${completed && Styles['todo__completed--text']}   
                `}
            >
                {text}
            </p>
            
            <div className = {Styles['container']}>
                <button
                    onClick={() => deleteTodo()}
                >
                    Borrar
                </button>
            </div>
        </article>
    )
}

export default Todo;