export const mainListActions = (roomId) => {

    console.log(roomId)

    const handleLeaveRoom = () => {
        console.log(roomId);
    }


    return {
        handleLeaveRoom
    }
}
