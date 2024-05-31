import { useCallback, useState } from "react";
import LayoutComponent from "../components/LayoutComponent/LayoutComponent";
import UsersTable from "../components/UsersTable/UsersTable";
import If from "../components/If";
import CreateAnUser from "../components/CreateAnUser/CreateAnUser";
import ShowUserData from "../components/ShowUserData/ShowUserData";

const HomePage = () => {
    const [showRightLateralBar, setShowRightLateralBar] = useState<boolean>(false);
    const [showRightLateralBarUserData, setShowRightLateralBarUserData] = useState<boolean>(false);
    const [refreshUsers, setRefreshUsers] = useState<boolean>(false);
    const [clickedUserUUID4, setClickedUserUUID4] = useState<string>('');

    const handleShowRightLateralBar = useCallback(() => {
        setShowRightLateralBar(!showRightLateralBar);
        setShowRightLateralBarUserData(false);
    }, [showRightLateralBar]);

    const handleButtonClickShowUserData = useCallback(() => {
        setShowRightLateralBarUserData(!showRightLateralBarUserData);
        setShowRightLateralBar(false);
    }, [showRightLateralBarUserData]);

    return (
        <LayoutComponent title="Usuários">
            <UsersTable setClickedUser={setClickedUserUUID4} refreshUsers={refreshUsers} setRefreshUsers={setRefreshUsers} setShowRightLateralBar={handleShowRightLateralBar} setShowRightLateralBarUserData={handleButtonClickShowUserData}/>
            <If condition={showRightLateralBar}>
                <CreateAnUser setShowRightLateralBar={setShowRightLateralBar} setRefreshUsers={setRefreshUsers} showRightLateralBar={handleShowRightLateralBar}/>
            </If>
            <If condition={showRightLateralBarUserData}>
                <ShowUserData setShowState={handleButtonClickShowUserData} userUUID4={clickedUserUUID4} />
            </If>
        </LayoutComponent>
    );
}

export default HomePage;
