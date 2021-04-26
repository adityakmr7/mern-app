import { Grid } from '@material-ui/core';
import React from 'react';
import AppCard from '../component/AppCard';

function Dashboard(props) {
    return (
        <div>
            <Grid container>
            <Grid item>
                <AppCard/>
            </Grid>
            </Grid>
        </div>
    );
}

export default Dashboard;