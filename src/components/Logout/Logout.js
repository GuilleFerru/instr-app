import React, { useContext } from 'react';
import { useIdleTimer } from 'react-idle-timer'
import { useHistory } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText, ListItemAvatar, Avatar } from "@material-ui/core/";
import { AuthContext } from '../../context/AuthContext';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

export const Logout = () => {

    const history = useHistory();
    const { user, dispatch, socket } = useContext(AuthContext);

    const handleLogout = (idle = false) => {
        socket && socket.disconnect();
        document.fullscreenElement && document.exitFullscreen();
        dispatch({ type: 'LOGOUT_SUCCESS' });
        history.push('/', { from: 'logout', idle });
    }

    const onIdle = () => {
        handleLogout(true);
    }
    // 1 hora
    useIdleTimer({ onIdle, timeout: 60000 * 60 * 1});

    return <>
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <AccountCircleIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`${user.name} ${user.lastname}`} secondary={user.username} />
        </ListItem>
        <ListItem button onClick={() => handleLogout(false)}>
            <ListItemIcon>
                <Avatar>
                    <ExitToAppIcon />
                </Avatar>
            </ListItemIcon>
            <ListItemText primary="Salir" />
        </ListItem>
    </>
}


