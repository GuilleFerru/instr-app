import React, { useState, useRef } from "react";
import { IconButton, makeStyles, Tooltip } from "@material-ui/core";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";

const useStyles = makeStyles({
    fullScreenContainer: {

        backgroundColor: "inherit",
        display: "flex",
        flexWrap: "noWrap",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center ",
    }
});

const FullScreenView = () => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const fullScreenRef = useRef(null);
    const classes = useStyles();

    const handleFullScreen = () => {
        if (isFullScreen) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
        setIsFullScreen(!isFullScreen);
    };

    return (
        <div ref={fullScreenRef} className={classes.fullScreenContainer}>
            <Tooltip title={isFullScreen ? "Salir Pantalla Completa": "Ir a Pantalla Completa"} arrow>
                <IconButton onClick={handleFullScreen} color="inherit">
                    {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
                </IconButton>
            </Tooltip>
        </div>
    );
};

export default FullScreenView;