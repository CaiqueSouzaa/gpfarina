import { ReactNode, useCallback, useState } from 'react';
import Input from '../Input/Input';
import RightLateralBar from '../RightLateralBar/RightLateralBar';
import styles from './ResetUserPassword.module.css';
import eyeOpened from '../../assets/eye-open.svg';
import eyeClosed from '../../assets/eye-closed.svg';
import Button from '../Button/Button';
import UserController from '../../../controllers/UserController';

export interface ResetUserPasswordProps {
    setShowState: () => void;
    userUUID4: string;
}

const ResetUserPassword = ({ setShowState, userUUID4 }: ResetUserPasswordProps) => {
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errors, setErrors] = useState<ReactNode>();

    const handleEyeIconClick = useCallback(() => {
        setShowPassword(!showPassword)
    }, [showPassword]);

    const handleClickButtonResetPassword = useCallback(async () => {
        const result = await UserController.userUpdatePassword(userUUID4, password);
        if (!result) {
            setErrors(<span>A senha deve possuir 5 ou mais caracteres</span>);
        } else {
            setErrors(<></>);
            setShowState();
        }
    }, [userUUID4, password]);

    return (
        <RightLateralBar setShowState={setShowState}>
            <div className={styles.resetUserPassword}>
                <Input title='Nova senha' onChange={setPassword} type={showPassword ? 'text' : 'password'} value={password} icon={{src: showPassword ? eyeClosed : eyeOpened, onClick: handleEyeIconClick}}/>
                { errors }
                <div className={styles.buttonArea}>
                    <Button text='Atualizar senha' backgroundColor='#FBD16D' onClick={handleClickButtonResetPassword} type='button' />
                </div>
            </div>
        </RightLateralBar>
    );
};

export default ResetUserPassword;
