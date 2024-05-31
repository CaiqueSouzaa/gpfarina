import { useCallback, useEffect, useState } from 'react';

import style from './UsersTable.module.css';
import personAddButton from '../../assets/person-add.svg';
import searchIcon from '../../assets/search-icon.svg';
import UserTableItem from '../UserTableItem/UserTableItem';
import User from '../../../models/User';
import axios from 'axios';
import { IUser } from '../../../ts/interfaces/API/IAPI';

export interface UsersTableProps {
    setShowRightLateralBar: () => void;
    refreshUsers: boolean;
    setRefreshUsers: (value: boolean) => void;
    setClickedUser: (value: string) => void;
    setShowRightLateralBarUserData: () => void;
}

const UsersTable = ({ setShowRightLateralBar, refreshUsers, setRefreshUsers, setClickedUser, setShowRightLateralBarUserData }: UsersTableProps) => {
    const [users, setUsers] = useState<User[]>([]);
    const [term, setTerm] = useState<string>('');

    const fetchUsers = useCallback(async () => {
        const { data } = await axios({
            method: 'GET',
            url: `${import.meta.env.VITE_API_URL}/users/`,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const usersList: User[] = [];
        if (data.code === 1005) {
            data.data.map((u: IUser) => {
                const user = new User(u);
                usersList.push(user);
            });
        }

        setUsers(usersList);

        return usersList;
    }, []);

    useEffect(() => {
        if (refreshUsers) {
            fetchUsers();
            setRefreshUsers(false);
        }
    }, [refreshUsers]);

    const handleSearchUserTerm = useCallback(async () => {
        if (term === '') {
            await fetchUsers();
        } else {

        }
        const { data } = await axios({
            method: 'GET',
            url: `${import.meta.env.VITE_API_URL}/users/search/?term=${term}`,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (data.code === 1007) {
            const usersList: User[] = [];
            data.data.map((u: IUser) => {
                const user = new User(u);
                usersList.push(user);
            });
            setUsers(usersList);
        }
    }, [term]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const userItem = users?.map((user) => <UserTableItem key={user.getId()} user={user} setClickedUser={setClickedUser} setShowRightLateralBarUserData={setShowRightLateralBarUserData} />);

    const childrenRenderItems = userItem.length > 0 ? userItem : <span>Usuários não encontrados</span>

    return (
        <div className={style.usersTable}>
            <div className={style.tableHead}>
                <div>
                    <div className={style.addUserButton} onClick={setShowRightLateralBar}>
                        <img src={personAddButton} alt="add-user-icon.png" />
                        <span>Adicionar usuário</span>
                    </div>
                </div>
                <form className={style.searchPerson} onSubmit={(e) => e.preventDefault()}>
                    <input type="text" value={term} onChange={(e) => setTerm(e.target.value)} />
                    <div onClick={handleSearchUserTerm}>
                        <button style={{backgroundColor: '#FFFFFF', border: 'none'}} type='submit'>
                            <img src={searchIcon} alt="add-user-icon.png" />
                        </button>
                    </div>
                </form>
            </div>
            <div className={style.children}>
                {/* Children */}
                { childrenRenderItems }
            </div>
        </div>
    );
};

export default UsersTable;
