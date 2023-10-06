import { Box, Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getLoggedOutUser } from "../../redux/actions/userAction";

const Profile = ({ account, setAccount }) => {

  const [open, setOpen] = useState(false)

  // const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch()

  const openMenu = (event) => {
    setOpen(event.currentTarget)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const logout = () => {
    setAccount("")
    dispatch(getLoggedOutUser())
    localStorage.removeItem('authToken');
  }

  return (
    <>
      <Box onClick={(e) => openMenu(e)}>
        <Typography style={{ marginTop: 2, cursor: "pointer" }}>{account}</Typography>
      </Box>
      <Menu
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => { handleClose(); logout() }}>Logout</MenuItem>
      </Menu >
    </>
  );
};

export default Profile;
