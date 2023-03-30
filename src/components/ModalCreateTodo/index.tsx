import { useRef, FC } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '@utils/localStorage';
import { removeDisplayNone, addIsEditing, removeIsEditing } from '@utils/DOM';
import Styles from '@components/ModalCreateTodo/styles.module.css';
import TodoI from '@interfaces/todo';

interface Props {
    newTodo: boolean;
    index?: number;
    setModal: (todo: boolean) => void;
    setTodoList: (todo: TodoI[]) => void;
    setIsEdit?: (state: boolean) => void;
}

const ModalCreateTodo: FC<Props> = ({newTodo, index, setModal, setTodoList, setIsEdit}) => {

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const todoEditEfectDOM = () => {
        if(index !== undefined){
            removeDisplayNone(index);
            addIsEditing(index);

            setTimeout(() => {
                removeIsEditing(index);
            }, 1500);
        }
    }

    const randomColor = () => {
        const color = Math.floor(Math.random() * 16777215).toString(16);
        return `#${color}`;
    }

    const generateTodo = () => {
        const textArea = textareaRef.current;

        if (textArea && textArea.value !== '') {
            const todoList = getFromLocalStorage();
            const todo = {
                text: textArea.value,
                completed: false,
                color: newTodo ? randomColor() : todoList[index!].color,    
            };
            
            if(newTodo) {
                if (todoList && typeof(todoList) === 'object') {
                    todoList.push(todo);
                    saveToLocalStorage(todoList);
                }
                else
                    saveToLocalStorage([todo]);
            } else {
                if (todoList && typeof(todoList) === 'object' && index !== undefined) {
                    todoList[index] = todo;
                    saveToLocalStorage(todoList);
                    setTimeout(() => {
                        todoEditEfectDOM();
                    }, 10);
                    if (setIsEdit)
                        setIsEdit(false);
                    }
                }
            
            setTodoList(todoList);  
            setModal(false);
        }
    }


    const closeModal = () => {
        if(index !== undefined && setIsEdit){
            setIsEdit(false)
            removeDisplayNone(index);
        }

        setModal(false);
    }


    const getTextTodo = () => {
        const todoList = getFromLocalStorage();
        if (todoList && typeof(todoList) === 'object' && index !== undefined) {
            const todo = todoList[index];
            if (todo && typeof(todo) === 'object')
                return todo.text;
        }
        return '';
    }

    return (
        <section className = {Styles['section']}> 
            <form className = {Styles['section__form']}>
                { !newTodo &&
                    <button
                        className = {Styles['section__button--close']}
                        onClick = { closeModal }
                        aria-label="Close modal"
                    > X </button>
                }
                <label
                    className = {Styles['section__form--label']}
                >
                    {newTodo ? 'Crea un nuevo Todo' : 'Editar Todo'}
                </label>
                
                <textarea
                    className = {Styles['section__form--textarea']}
                    ref = {textareaRef}
                    defaultValue = {newTodo ? '' : getTextTodo()}
                ></textarea>

                <button
                    className = {Styles['section__form--button']}
                    type = 'button'
                    onClick = { generateTodo }
                >
                    {newTodo ? 'Crear Todo' : 'Editar Todo'}
                </button>
            </form>
        </section>
    );
}

export default ModalCreateTodo;