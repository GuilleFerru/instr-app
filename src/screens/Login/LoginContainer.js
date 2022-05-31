import { useRef, useContext } from "react";
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
    const username = useRef();
    const password = useRef();
    const { isFetching, dispatch } = useContext(AuthContext);

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