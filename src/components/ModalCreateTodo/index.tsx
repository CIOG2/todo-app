import { useRef, FC } from 'react';
import { getFromLocalStorage, saveToLocalStorage } from '../../utils/localStorage';
import Styles from './styles.module.css';

interface Props {
    modal: boolean;
    setModal: (todo: boolean) => void;
}

const ModalCreateTodo: FC<Props> = ({modal, setModal}) => {

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const generateTodo = () => {
        
        const textArea = textareaRef.current;

        if (textArea && textArea.value !== '') {
            const todoList = getFromLocalStorage('todoList');
            const newTodo = {
                text: textArea.value,
                completed: false
            }
            
            if (todoList && typeof(todoList) === 'object') {
                todoList.push(newTodo);
                saveToLocalStorage('todoList', todoList);
            }
            else
                saveToLocalStorage('todoList', [newTodo]);

                
            setModal(false);
        }
    }

    return (
        <section className = {Styles['section']}>
            <form className = {Styles['section__form']}>
                <label
                    className = {Styles['section__form--label']}
                >
                    Haz un nuevo TODO
                </label>
                
                <textarea
                    className = {Styles['section__form--textarea']}
                    ref = {textareaRef}
                ></textarea>
                
                <button
                    className = {Styles['section__form--button']}
                    type = 'button'
                    onClick={() => generateTodo()}
                >
                    Crear TODO
                </button>
            </form>
        </section>
    );
}

export default ModalCreateTodo;