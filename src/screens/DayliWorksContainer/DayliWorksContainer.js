import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { dailyWorksContainerStyle } from "./dailyWorksContainerStyle";
import { Container, Grid, Paper } from "@material-ui/core";


const useStyles = makeStyles((theme) => dailyWorksContainerStyle(theme));

export const DailyWorksContainer = () => {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return <div>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={12}>
                    <Paper className={fixedHeightPaper}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ut quam at mi commodo tempus ut eget libero. Aenean venenatis ullamcorper augue. Suspendisse eu nulla sit amet mauris congue vulputate. Morbi ut lectus velit. Proin metus magna, bibendum eget sapien vel, ultrices consectetur massa. Etiam et interdum metus. Nulla ultrices velit vitae orci aliquet blandit.
                        Sed velit ante, sodales sit amet facilisis eu, egestas et purus. Praesent sed porttitor orci. Duis feugiat mattis sapien, sed egestas enim posuere eu. Aliquam lacus libero, sodales vel libero cursus, ornare condimentum risus. Mauris sagittis metus et efficitur placerat. Ut viverra ligula ut lacus pellentesque, sed ultrices metus pharetra. Curabitur bibendum dui ut nibh vehicula, ut venenatis mi tristique. Nulla ac orci metus. Praesent elementum at leo a faucibus.
                        Duis quis tincidunt arcu. Ut iaculis porta bibendum. Pellentesque a malesuada lacus, vitae vulputate massa. Nulla facilisi. Proin et massa nec nulla pharetra ultrices nec ac velit. Nullam placerat quis ipsum in molestie. Phasellus eu libero pretium, faucibus tellus eget, pulvinar risus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;
                        Sed nisl felis, auctor in malesuada quis, placerat ut orci. Mauris neque nisi, pulvinar vitae enim tincidunt, fringilla scelerisque nisl. Aenean enim enim, egestas sed purus a, pulvinar varius nisl. Nullam ac mi rhoncus, tempus risus vitae, venenatis eros. Donec quis viverra turpis. In ornare arcu nec velit lobortis molestie. Mauris non pellentesque libero, et eleifend dui. Sed malesuada ligula non risus sollicitudin vestibulum. Ut neque quam, sollicitudin sed tincidunt et, fringilla eu felis. Interdum et malesuada fames ac ante ipsum primis in faucibus.
                        Vivamus enim urna, dapibus eu laoreet et, volutpat dictum velit. Aenean congue massa quis magna eleifend mollis. Aenean eget tortor velit. Curabitur rhoncus tincidunt velit in pretium. Nulla lacus orci, cursus ut eros nec, volutpat dignissim eros. Nulla non lobortis nulla. Sed ante odio, hendrerit sed sagittis quis, dapibus eu nunc. Donec porta varius urna ut vehicula. Cras neque ipsum, imperdiet in consectetur tincidunt, dapibus a ex. In ac hendrerit est. Aliquam efficitur ullamcorper tristique. Ut eu elit iaculis, tincidunt lorem ac, commodo neque. Suspendisse finibus odio quis massa condimentum faucibus. Vivamus tempus porttitor sem, vitae auctor dolor bibendum nec. Proin non ultricies nulla. Phasellus at ante interdum, scelerisque ex eu, tristique purus.
                    </Paper>
                </Grid>

                {/* Recent Deposits */}
                {/* <Grid item xs={12} md={4} lg={3}>
          <Paper className={fixedHeightPaper}></Paper>
        </Grid> */}
                {/* Recent Orders */}
                {/* <Grid item xs={12}>
          <Paper className={classes.paper}></Paper>
        </Grid> */}
            </Grid>
        </Container>
        
    </div >
}