import * as React from 'react';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { IoMenu } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { authContext } from '../context/AuthProvider';


export default function BasicMenu() {
   const {logout} = useContext(authContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logOut = () => {
    logout();
  }

  return (
    <div>
      <Button
      size='small'
      sx={{
        padding: "5px 1px",
    fontSize: "1.7rem",
    minWidth: "auto",
      }}
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
       <IoMenu/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
      >
        <MenuItem component={Link} to="/login" onClick={handleClose}>Sign In</MenuItem>
        {/* <MenuItem component={Link} to="/register" onClick={handleClose}>Sign Up</MenuItem> */}
        <MenuItem component={Link} to="/login" onClick={logOut}>Sign Out</MenuItem>
      </Menu>
    </div>
  );
}
