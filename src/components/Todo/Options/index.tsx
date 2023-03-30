import { useState } from 'react';
import Buttons from '@components/Todo/Buttons';
import Styles from '@components/Todo/Options/styles.module.css';
import PropsButtons from '@interfaces/propsButtons';

interface Props extends PropsButtons {
    setIsEdit: (state: boolean) => void;
}

const Options = (props: Props) => {

    const [isOptionsOpen, setIsOptionsOpen] = useState(false);

    const openOptions = () => {                
        setIsOptionsOpen(!isOptionsOpen);
    }

    return (
        <div className = {Styles['container']}>
            <div 
                className = {Styles['container__button']}
                style = {isOptionsOpen ? {zIndex: 15} : {zIndex: 0}}
                onClick = { () => openOptions() }
            >
                {isOptionsOpen 
                    ?<button aria-label='Cerrar opciones' className={ Styles["close"] }>X</button>
                    :<div className={ Styles["points"] }></div>
                }
            </div>

            {isOptionsOpen &&     
                <>
                    <div className={Styles['shadow']}></div>
                    <Buttons 
                        {...props} 
                        setIsOptionsOpen = {setIsOptionsOpen}
                    />
                </>
            }
        </div>
    )
}

export default Options;