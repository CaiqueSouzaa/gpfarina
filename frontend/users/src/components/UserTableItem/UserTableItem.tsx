import style from './UserTableItem.module.css';
import User from '../../../models/User';
import personIcon from '../../assets/person-circle.svg';
import { useCallback } from 'react';

export interface UsersTableProps {
    user: User;
    setClickedUser: (value: string) => void;
    setShowRightLateralBarUserData: () => void;
}

const UserTableItem = ({ user, setClickedUser, setShowRightLateralBarUserData }: UsersTableProps) => {
    const handleUserItemClick = useCallback(() => {
        setClickedUser(user.getUuid4());
        setShowRightLateralBarUserData();
    }, []);

    return (
        <div className={style.userTableItem} onClick={handleUserItemClick}>
            <div className={style.logoUserInfo}>
                <img src={personIcon} alt="user-logo.png" />
                <div className={style.userInfo}>
                    <span className={style.userName}>{user.getName()} {user.getSurname()}</span>
                </div>
            </div>
            <div>
                <span>@{user.getLogin()}</span>
            </div>
            <div>
                <span>{user.getEmail()}</span>
            </div>
        </div>
    );
};

export default UserTableItem;
