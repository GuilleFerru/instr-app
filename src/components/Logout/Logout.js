import React, {useContext } from 'react';
import { useHistory } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText, ListItemAvatar, Avatar } from "@material-ui/core/";
import { AuthContext } from '../../context/AuthContext';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


export const Logout = () => {

    const history = useHistory();
    const { user, dispatch } = useContext(AuthContext);

    const handleLogout = () => {
        window.localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT_SUCCESS' });
        history.push('/');
    }

    return <>
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    <AccountCircleIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={`${user.name} ${user.lastname}`} secondary={user.username} />
        </ListItem>
        <ListItem button onClick={handleLogout}>
            <ListItemIcon>
                <Avatar>
                    <ExitToAppIcon />
                </Avatar>
            </ListItemIcon>
            <ListItemText primary="Salir" />
        </ListItem>
    </>
}
