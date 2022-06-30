import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6" color="inherit" noWrap>
          Todos
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
