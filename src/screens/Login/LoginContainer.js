import { useRef, useContext } from "react";
import { useLocation } from "react-router-dom";
import { loginCall } from "../../Services/Axios";
import { Fade, Button, CssBaseline, Link, Grid, Box, makeStyles, Container, CircularProgress } from '@material-ui/core';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from '../../styles/theme';
import { Footer } from '../../components/Footer/Footer';
import { loginContainerStyle } from './LoginContainerStyle';
import { Input } from '../../components/commonComponents/Controls/Input';
import { LogoNavbar } from "../../components/Navbar/LogoNavbar";
import { Title } from '../../components/commonComponents/Title';
import { AuthContext } from '../../context/AuthContext';

const useStyles = makeStyles((theme) => loginContainerStyle(theme));


export const Login = () => {

    const classes = useStyles();
    const location = useLocation();
    const username = useRef();
    const password = useRef();
    const { isFetching, dispatch } = useContext(AuthContext);
    const { idle } = location.state || false;

    const handleClick = (e) => {
        e.preventDefault();
        loginCall({
            username: username.current.value,
            password: password.current.value
        }, dispatch)
    };

    return <>
        <ThemeProvider theme={theme} >
            <Fade in={true} timeout={800} >
                <Container component="main" maxWidth="xs" className={classes.root}>
                    <CssBaseline />
                    <div className={classes.paper}>
                        <LogoNavbar linkTo={"/login"} />
                        <Title
                            titleClassName={classes.title}
                            component={'h1'}
                            variant={'h6'}
                            color={'inherit'}
                            value={'INSTRUMENTOS PR3'}
                        />
                        <form className={classes.form} onSubmit={handleClick}>
                            <Input
                                variant={"outlined"}
                                margin={"normal"}
                                required={true}
                                fullWidth={true}
                                id="username"
                                label={"Dirección de correo electrónico"}
                                name={"username"}
                                autoComplete={"username"}
                                autoFocus={true}
                                type={"email"}
                                inputRef={username}
                                value={'gferrucci@pr3.com.ar'}
                            />
                            <Input
                                variant={"outlined"}
                                margin={"normal"}
                                required={true}
                                fullWidth={true}
                                id="password"
                                label={"Contraseña"}
                                name={"password"}
                                autoComplete={"current-password"}
                                type={"password"}
                                inputRef={password}
                                value={'6969'}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={isFetching}
                            >
                                {isFetching ? (
                                    <CircularProgress size={24} color={"secondary"} />
                                ) : (
                                    'Iniciar sesión'
                                )}
                            </Button>
                            {idle ?
                                (<Title variant={'overline'} color={'error'} value={'Deslogueo por inactividad. Vuelva a iniciar sesión'} />)
                                : (null)}
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Olvido la contraseña?
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                    <Box mt={2}>
                        <Footer />
                    </Box>
                </Container>
            </Fade >
        </ThemeProvider >
    </>
}