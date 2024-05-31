import style from './HeaderComponent.module.css';
import arrowDown from '../../assets/arrow-dows.svg';
import personCircle from '../../assets/person-circle.svg';
import logo from '../../assets/Logo.svg';

const HeaderComponent = () => {
    return (
        <div className={style.headerComponent}>
            <div className={style.logo}>
                <img src={logo} alt="grupo-farina-logo.png" />
            </div>
            <div className={style.userOptions}>
                <img className={style.userProfile} src={personCircle} alt="user-logo.png" />
                <div className={style.userInfo}>
                    <span className={style.username}>Name Surname</span>
                    <span className={style.userPermission}>Usuário</span>
                </div>
                <img src={arrowDown} alt="arow-down.png" />
            </div>
        </div>
    );
};

export default HeaderComponent;
