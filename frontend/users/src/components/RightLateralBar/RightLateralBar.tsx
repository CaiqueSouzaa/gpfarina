import { ReactNode } from 'react';
import style from './RightLateralBar.module.css';
import arrowBack from '../../assets/arrow-back.svg';

export interface RightLateralBarProps {
    children: ReactNode[] | ReactNode;
    setShowState: () => void;
}

const RightLateralBar = ({ children, setShowState }: RightLateralBarProps) => {
    return (
        <div className={style.rightLateralBar}>
            <div>
                <div className={style.backButton} onClick={setShowState}>
                    <img src={arrowBack} alt="back-logo.png" />
                    <span>Fechar</span>
                </div>
            </div>
            <div className={style.content}>
                { children }
            </div>
        </div>
    );
};

export default RightLateralBar;
