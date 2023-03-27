import { FC } from 'react';
import Styles from './styles.module.css';

interface Props {
    modal: boolean;
    setModal: (todo: boolean) => void;
}

const AddTodo: FC<Props> = ({ modal, setModal }) => {
    
    const changeModalState = () => setModal(!modal);

    return (
        <>
            <button
                className = {`
                    ${Styles['button']} 
                    ${modal ? Styles['close__modal'] : Styles['open__modal']}
                `}
                aria-label="Add todo"
                onClick = { changeModalState }
            >
                +
            </button>    

            { !modal &&
                <div className = {Styles['shadow__bottom']}></div>
            }
        </>
    );
}

export default AddTodo;