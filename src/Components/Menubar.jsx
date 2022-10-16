import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function PositionedMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogot = ()=>{
    localStorage.clear();
    window.location.href='/'
  }

  const onProfile = ()=>{
    window.location.href="/user/profile"
  }
  return (
    <div style={{position:"relative",left:"0px"}}>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        style={{
          color: "black",
          backgroundColor: "#F05454",
          padding: "14px 20px",
          fontSize: "15px",
          minWidth: "150px",
          maxHeight: "50px",
          marginTop: "20px",
        }}
      >
        Profile
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={()=>{handleClose
        onProfile()}}>Profile</MenuItem>
        <MenuItem onClick={()=>{handleClose
        onLogot()}}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
