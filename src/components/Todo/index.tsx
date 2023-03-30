import { FC, useState } from 'react';
import Options from './Options';
import ModalCreateTodo from '@components/ModalCreateTodo';
import Styles from '@components/Todo/styles.module.css';
import PropsButtons from '@interfaces/propsButtons';

const Todo: FC<PropsButtons> = ( Props ) => {

    const { text, completed, index, setModal, setTodoList, color} = Props;
    const [ isEdit, setIsEdit ] = useState(false);

    return (
        <article 
            className = {`
                ${Styles['article']}
                ${completed && Styles['todo__completed']}   
            `}
            id = {`article-todo-${index}`}    
        >            
            <p  className = {`
                    ${Styles['article__text']}
                    ${completed && Styles['todo__completed--text']}   
                `}
                style={!completed ? {color: color} : {color: 'black'}}
            >
                {text}
            </p>
            
            <div className = {Styles['container']} id = {`item-${index}`}>
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

            <div 
                className={Styles['shadow__box--color']}
                style={!completed ? {backgroundColor: color} : {backgroundColor: 'gray'}}
            >
            </div>
        </article>
    )
}

export default Todo;