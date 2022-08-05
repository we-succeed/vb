import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { Box, Toolbar, Typography, Button } from "@mui/material/";
const PageHeader = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            VB-BANK
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
};
export default PageHeader;
