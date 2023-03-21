import { useRef, FC } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '@utils/localStorage';
import { removeDisplayNone } from '@utils/DOM';
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
    
    const generateTodo = () => {
        const textArea = textareaRef.current;

        if (textArea && textArea.value !== '') {
            const todoList = getFromLocalStorage();
            const todo = {
                text: textArea.value,
                completed: false
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
                    removeDisplayNone(index);
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
                    <div
                        className = {Styles['section__close']}
                        onClick = { closeModal }
                    > X </div>
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