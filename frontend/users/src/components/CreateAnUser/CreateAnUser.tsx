import Input from '../Input/Input';
import RightLateralBar from '../RightLateralBar/RightLateralBar';
import style from './CreateAnUser.module.css';
import personProfile from '../../assets/person-circle.svg';
import { ReactNode, useCallback, useEffect, useReducer, useState } from 'react';
import Button from '../Button/Button';
import UserController from '../../../controllers/UserController';
import CreateUser from '../../../models/CreateUser';
import { ICreateUser } from '../../../ts/interfaces/API/IAPI';
import ChooseInput from '../ChooseInput/ChooseInput';

export interface CreateAnUserProps {
    showRightLateralBar: () => void;
    setRefreshUsers: (value: boolean) => void;
    setShowRightLateralBar: (value: boolean) => void;
}

const userInitialData: ICreateUser = {
    login: '',
    name: '',
    password: '',
    reset_password: 'false',
    email: '',
    surname: '',
    telephone: '',
}

const userDespatch = (state: ICreateUser, action: { type: 'update', userData: ICreateUser }): ICreateUser => {
    switch (action.type) {
        case 'update':
            return { ...state, ...action.userData };
        default: {
            return state;
        }
    }
}

const CreateAnUser = ({ showRightLateralBar, setRefreshUsers, setShowRightLateralBar }: CreateAnUserProps) => {
    const [name, setName] = useState<string>('');
    const [surname, setSurname] = useState<string>('');
    const [telephone, setTelephone] = useState<string>('');
    const [login, setLogin] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [resetPassword, setResetPassword] = useState<string>('true');
    const [email, setEmail] = useState<string>('');

    const [errors, setErrors] = useState<ReactNode>('');

    const [userObj, updateUser] = useReducer(userDespatch, userInitialData);
    const [user, setUser] = useState<CreateUser>();

    // Válidando os inputs de criação de usuário
    useEffect(() => {
        const u = new CreateUser(userObj);
        setUser(u);
    }, [userObj]);

    useEffect(() => {
        updateUser({type: 'update', userData: {login, name, password, reset_password: resetPassword, email, surname, telephone}});
    }, [name, surname, telephone, login, password, resetPassword, email]);

    useEffect(() => {
        if (user?.validations()) {
            setErrors(user.validations());
        } else {
            setErrors('');
        }
    }, [user]);

    // Checando se o nome de login está disponível
    const checkLogin = useCallback(async () => {
        if (await user?.checkHasLogin()) {
            setErrors(<span>Nome de login não disponível para uso</span>);
        }

    }, [user, login]);

    // Criando o usuário
    const handleButtonClickCreateUser = useCallback(async () => {
        await checkLogin();
        if (user?.validations()) {
            setErrors(user.validations());
        } else {
            const result = await UserController.create(user);
            if (result?.status === 'CREATED') {
                setRefreshUsers(true);
                setShowRightLateralBar(false);
            }
        }
    }, [user]);

    return (
        <RightLateralBar setShowState={showRightLateralBar}>
            <div>
                <div className={style.userDataArea}>
                    <div className={style.imageArea}>
                        <img src={personProfile} alt="person-logo.png" width={120}/>
                    </div>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className={style.inputsArea}>
                            <Input id="input-name" type='text' onChange={setName} value={name} title='Nome'/>
                            <Input id="input-surname" type='text' onChange={setSurname} value={surname} title='Sobrenome'/>
                            <Input id="input-telephone" type='text' onChange={setTelephone} value={telephone} title='Telefone'/>
                            <Input id="input-login" type='text' onChange={setLogin} value={login} title='Login'/>
                            <Input id="input-password" type='password' onChange={setPassword} value={password} title='Senha'/>
                            <ChooseInput onChange={setResetPassword} value={resetPassword} title='Redefinir senha após primeiro acesso'/>
                            <Input id="input-email" type='email' onChange={setEmail} value={email} title='E-mail'/>
                            {errors}
                        </div>
                        <div className={style.buttonsArea}>
                            <Button backgroundColor='#FBD16D' type='submit' onClick={handleButtonClickCreateUser} text='Adicionar' />
                            <Button backgroundColor='#9F9F9F' type='button' onClick={() => setShowRightLateralBar(false)} text='Cancelar' />
                        </div>
                    </form>
                </div>
            </div>
        </RightLateralBar>
    );
};

export default CreateAnUser;
