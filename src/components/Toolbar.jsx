import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const AppToolbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Trading Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;