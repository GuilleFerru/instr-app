import React, { useEffect } from 'react';
import { CssBaseline, Container, Button } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
//import { AuthContext } from '../../../context/AuthContext';
import { searchDailyWorkFormStyle } from './SearchDailyWorkFormStyle';
import { MyDialog, MyDialogActions } from '../../../components/commonComponents/Dialog/MyDialog';
//import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => searchDailyWorkFormStyle(theme));

export const SearchDailyWorkForm = (
    {
        rowData,
        tableData,
        isDialogOpen,
        setIsDialogOpen
    }) => {

    const classes = useStyles();
    // const history = useHistory();
    // const { socket } = useContext(AuthContext);


    useEffect(() => {

    }, [rowData]);


    const handleDialogClose = _e => {
        setIsDialogOpen(false);
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        // const oldData = rowData
        // const newData = {

        //     //,
        // }
        setIsDialogOpen(false);
       
    }

    return <MyDialog
        title="Buscar Tareas por"
        isOpen={isDialogOpen}
        fullWidth={true}
    >
        <Container component="main" maxWidth="lg" className={classes.root}>
            <CssBaseline />
            <div className={classes.paper}>
                <form className={classes.form} onSubmit={handleSubmit} >

                    <MyDialogActions>
                        <Button onClick={handleSubmit} color="primary">
                            Buscar
                        </Button>
                        <Button onClick={handleDialogClose} color="primary">
                            Cerrar
                        </Button>
                    </MyDialogActions>
                </form>
            </div>
        </Container>
    </MyDialog>


}