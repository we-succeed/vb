import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
    <Stack direction="row" spacing={2}>
    <Button onClick={handleLogout} variant="outlined" href="#outlined-buttons">
      Link
    </Button>
  </Stack>
	);
};

export default Main;