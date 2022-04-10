import React, { useContext } from 'react';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import { makeStyles } from "@material-ui/core/styles";
import { Fade, Box, Button, Typography, Container } from "@material-ui/core";
import { useHistory } from 'react-router-dom';
import { errorPageStyle } from "./ErrorPageStyle";
import { Footer } from '../../Footer/Footer';
import theme from '../../../styles/theme';
import { AuthContext } from '../../../context/AuthContext';



const useStyles = makeStyles((theme) => errorPageStyle(theme));

export const ErrorPage = () => {
    const classes = useStyles();
    const history = useHistory();
    const { dispatch } = useContext(AuthContext);

    const handleLogout = () => {
        window.localStorage.removeItem('user');
        dispatch({ type: 'LOGIN_FAILURE' });
        history.push('/');
    }

    return (
        <ThemeProvider theme={theme}>
            <Fade in={true} timeout={800}>
                <Container className={classes.RootStyle} sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }} >
                    <Box>
                        <Typography variant="h3" paragraph>
                            Perdón, hubo un problema!
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                            No pudimos encontrar la página que buscas, pero no te preocupes, puedes volver al inicio.
                        </Typography>
                    </Box>
                    <Box
                        component="img"
                        src="/illustration_404.svg"
                        sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
                    />
                    <Box m={4}>
                        <Button size="large" variant="contained" onClick={handleLogout} color="primary">
                            Ir al Inicio
                        </Button>
                    </Box>
                    <Box mt={2}>
                        <Footer />
                    </Box>
                </Container>
            </Fade>
        </ThemeProvider>
    );


}