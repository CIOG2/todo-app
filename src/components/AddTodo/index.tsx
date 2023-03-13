import { FC } from 'react';
import Styles from './styles.module.css';

interface Props {
    modal: boolean;
    setModal: (todo: boolean) => void;
}

const AddTodo: FC<Props> = ({ modal, setModal }) => {
    
    const changeModalState = () => setModal(!modal);

    return (
        <button
            className = {`
                ${Styles['button']} 
                ${modal ? Styles['close__modal'] : Styles['open__modal']}
            `}
            onClick = { changeModalState }
        >
            +
        </button>    
    );
}

export default AddTodo;