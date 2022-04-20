import { createContext } from 'react';
import io from 'socket.io-client';

const baseUrl = process.env.REACT_APP_API_URL;
export const socket = io(baseUrl.replace('/api',""), {transports:['websocket']});
export const SocketContext = createContext();

console.log(socket);


export const SocketComponentContext = props => {

    return <SocketContext.Provider value={socket}>
        {props.children}
    </SocketContext.Provider>
}