import { FC, useState } from 'react';
import Options from './Options';
import ModalCreateTodo from '@components/ModalCreateTodo';
import Styles from '@components/Todo/styles.module.css';
import PropsButtons from '@interfaces/propsButtons';

const Todo: FC<PropsButtons> = ( Props ) => {

    const { index, setModal, setTodoList } = Props;
    const [ isEdit, setIsEdit ] = useState(false);
    const {text, completed} = Props;
    
    return (
        <article 
            className = {`
                ${Styles['article']}
                ${completed && Styles['todo__completed']}   
            `}
            id = {`article-todo-${Props.index}`}    
        >            
            <p  className = {`
                    ${Styles['article__text']}
                    ${completed && Styles['todo__completed--text']}   
                `}
            >
                {text}
            </p>
            
            <div className = {Styles['container']} id = {`item-${Props.index}`}>
                <Options 
                    {...Props}
                    setIsEdit={setIsEdit}
                />
            </div>

            {isEdit &&
                <ModalCreateTodo
                    newTodo={false}
                    index={index}
                    setModal={setModal}
                    setTodoList={setTodoList}
                    setIsEdit={setIsEdit}
                />
            }

        </article>
    )
}

export default Todo;