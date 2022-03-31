import { useRef } from "react";
import { Footer } from '../../components/Footer/Footer';
import { loginContainerStyle } from './LoginContainerStyle';
import { Input } from '../../components/commonComponents/Controls/Input';
import { LogoNavbar } from "../../components/Navbar/LogoNavbar";
import { Title } from '../../components/commonComponents/Title';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import theme from '../../styles/theme';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => loginContainerStyle(theme));


export const Login = () => {
    const classes = useStyles();

    const email = useRef();
    const password = useRef();

    const handleClick = (e) => {
        e.preventDefault();
        console.log(email.current.value, password.current.value);
    };

    return (
        <ThemeProvider theme={theme} >
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
                            id="email"
                            label={"Dirección de correo electrónico"}
                            name={"email"}
                            autoComplete={"email"}
                            autoFocus={true}
                            type={"email"}
                            inputRef={email}

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
                        >
                            Ingresar
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
        </ThemeProvider>
    );
}