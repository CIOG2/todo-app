import { useRef, useEffect, FC } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '@utils/localStorage';
import { addDisplayNone } from '@utils/DOM';
import Styles from './styles.module.css';
import PropsButtons from '@interfaces/propsButtons';

interface Props extends PropsButtons {
    setIsEdit: (state: boolean) => void;
    setIsOptionsOpen: (state: boolean) => void;
}

const Buttons: FC<Props> = ({ index, completed, setTodoList, setIsEdit, setIsOptionsOpen}) => {

    const completeRef = useRef<HTMLButtonElement>(null);
    const editRef = useRef<HTMLButtonElement>(null);
    const deleteRef = useRef<HTMLButtonElement>(null);

    const animationOptions = () => {
        const complete = completeRef.current;
        const edit = editRef.current;
        const del = deleteRef.current;
        
        if(complete && edit && del) {
            complete.style.transform = 'translateX(-70px)';
            edit.style.transform = 'translateX(-70px)';
            del.style.transform = 'translateX(-70px)';
            
            setTimeout(() => {
                del.style.transform = 'translate(-35px, 55px)';
                complete.style.transform = 'translate(-35px, -55px)';
            }, 200);
        }
    }

    
    const deleteTodo = () => {
        const todoList = getFromLocalStorage();
        if (todoList && typeof(todoList) === 'object') {
            todoList.splice(index, 1);
            saveToLocalStorage(todoList);
            setTodoList(todoList);  
            setIsOptionsOpen(false);
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

    const editTodo = () => {
        setIsEdit(true);
        addDisplayNone(index);
        setIsOptionsOpen(false);
    }


    useEffect(() => {
        setTimeout(() => {
            animationOptions();
        }, 1);
    }, [])

    return (                
        <div 
            className={Styles['options']}

        >
            <button
                className={Styles['options__button']}
                ref={completeRef}
            >
                <div className={Styles['checkbox-wrapper-31']}>
                    <input 
                        type="checkbox"
                        checked={ completed }
                        onClick={ completedTodo }
                        onChange={()=>{}}    
                    />
                    <svg viewBox="0 0 35.6 35.6">
                        <circle className={Styles['background']} cx="17.8" cy="17.8" r="17.8"></circle>
                        <circle className={Styles['stroke']} cx="17.8" cy="17.8" r="14.37"></circle>
                        <polyline className={Styles['check']} points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
                    </svg>
                </div>    
            </button>
            <button
                className={Styles['options__button']}
                ref={editRef}
                onClick={ editTodo }
            >
                <img 
                    src="/edit.svg" 
                    alt="Editar todo" 
                    className={Styles['options__button--icon']}
                />
            </button>
            <button
                className={Styles['options__button']}
                ref={deleteRef}
            >
                <img 
                    src="/trash.svg" 
                    alt="Borrar todo" 
                    className={Styles['options__button--icon']}
                    onClick={deleteTodo}
                />
            </button>
        </div>
    )
}

export default Buttons; 