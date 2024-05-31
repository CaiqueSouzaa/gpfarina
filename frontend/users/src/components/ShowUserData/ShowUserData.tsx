import { useCallback, useEffect, useState } from "react";
import RightLateralBar from "../RightLateralBar/RightLateralBar";
import AnUser from '../../../models/AnUser';
import UserController from "../../../controllers/UserController";
import personProfile from '../../assets/person-circle.svg';
import styles from './ShowUserData.module.css';
import NoEditableInput from "../NoEditableInput/NoEditableInput";
import If from "../If";
import ResetUserPassword from "../ResetUserPassword/ResetUserPassword";

export interface ShowUserDataProps {
    setShowState: () => void;
    userUUID4: string;
}

const ShowUserData = ({ setShowState, userUUID4 }: ShowUserDataProps) => {
    const [user, setUser] = useState<AnUser>();
    const [showResetPassword, setShowResetPassword] = useState<boolean>(false);

    const handleButtonResetPasswordClick = () => {
        setShowResetPassword(!showResetPassword);
    }

    useEffect(() => {
        if (showResetPassword) {
            setShowState();
        }
    }, [userUUID4]);

    const getUser = useCallback(async () => {
        const data = await UserController.getUser(userUUID4);
        if (data) {
            setUser(data);
        }
    }, [userUUID4]);

    useEffect(() => {
        getUser();
    }, [getUser]);

    return (
        <RightLateralBar setShowState={setShowState}>
            <div className={styles.showUserData} style={{display: showResetPassword ? "none" : "flex"}}>
                    <div className={styles.imageArea}>
                        <img src={personProfile} alt="person-logo.png" width={120}/>
                    </div>
                    <div className={styles.userData}>
                        <div className={styles.userDataName}>
                            <span className={styles.userName}>{user?.getName()} {user?.getSurname()}</span>
                            <span className={styles.userLogin}>@{user?.getLogin()}</span>
                        </div>
                        <div className={styles.inputs}>
                            <div className={styles.inputEmail}>
                                <NoEditableInput title="E-mail" value={user?.getEmail()}/>
                            </div>
                            <div className={styles.inputTelephone}>
                                <NoEditableInput title="N° telefone" value={user?.getTelephone()}/>
                            </div>
                            <div className={styles.inputAreaPassword}>
                                <div className={styles.inputPassword}>
                                    <span className={styles.password}>Senha</span>
                                    <div>
                                        <div className={styles.textResetPassword} onClick={handleButtonResetPasswordClick}>
                                            <span>Redefinir senha de usuário</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
            <If condition={showResetPassword}>
                <ResetUserPassword userUUID4={user?.getUUID4()!} setShowState={handleButtonResetPasswordClick} />
            </If>
        </RightLateralBar>
    );
};

export default ShowUserData;
