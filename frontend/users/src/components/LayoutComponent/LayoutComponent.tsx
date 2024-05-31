import { ReactNode } from 'react';
import style from './LayoutComponent.module.css';
import LateralBar from '../LateralBar/LateralBar';
import HeaderComponent from '../HeaderComponent/HeaderComponent';

export interface LayoutComponentProps {
    children?: ReactNode[] | ReactNode,
    title: string;
};

const LayoutComponent = ({ children, title }: LayoutComponentProps) => {
    return (
        <div className={style.layoutComponent}>
            <HeaderComponent />
            <div className={style.content}>
                <LateralBar />
                <main className={style.main}>
                    <div className={style.spacePageTitle}>
                        <span className={style.pageTitle}>{ title }</span>
                    </div>
                    <div className={style.children}>
                        { children }
                    </div>
                </main>
            </div>
        </div>
    );
};

export default LayoutComponent;
