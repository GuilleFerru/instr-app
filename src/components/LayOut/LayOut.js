import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Navbar } from '../Navbar/Navbar'
import { layOutStyle } from './LayOutStyle';
import { Footer } from '../Footer/Footer'

const useStyles = makeStyles((theme) => layOutStyle(theme));

export const LayOut = ({ children }) => {
    const classes = useStyles();

    return <div className={classes.root}>
        <Navbar />
        <div>
            <main className={classes.pages}>
                <section className={classes.content}>
                    {children}
                </section>
            </main>
            <Footer className={classes.pages} />
        </div>
    </div>

}


