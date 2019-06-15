import React from 'react';
import PastSearches from './PastSearches';

import { Grid } from '@material-ui/core/';

const Sidebar = () => {

    return (
        <Grid item xs={12} sm={6} md={3} xl={2} align="center">
            <PastSearches />
        </Grid>
    )
}

export default Sidebar;

