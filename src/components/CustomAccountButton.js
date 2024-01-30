import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Logout from '@mui/icons-material/Logout';
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "../contexts/Auth";
import theme from "../style/palette";

function CustomAccountButton({src}) {

      const [anchorEl, setAnchorEl] = useState(null);
      const open = Boolean(anchorEl);
      const navigate = useNavigate();
      const {currentUser} = useContext(AuthContext);
      const {handleLogout} = useContext(AuthContext);

      const handleClick = (event) => {
          setAnchorEl(event.currentTarget);
      };

      const handleClose = () => {
          setAnchorEl(null);
      };

      const handleClickProfile = (profile) => {
          setAnchorEl(null);
          if (profile === true){
          !!currentUser ? navigate("/profile") : navigate("/login")}
          else{
              !!currentUser ? navigate("/adminPage") : navigate("/login")
          }
      };

      const handleClickLog = () => {
          setAnchorEl(null);
          !!currentUser ? handleLogout(navigate) : navigate("/login")
      };

      const propsIconButton = {
          onClick: handleClick,
          size: 'small',
          sx: { ml: 'auto' },
      }

      const propsMenu = {

          PaperProps: {
              elevation: 0,
              sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.4))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                  },
                  '&::before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                  },
              },
          },
          transformOrigin: { horizontal: 'right', vertical: 'top' },
          anchorOrigin: { horizontal: 'right', vertical: 'bottom' }
      }

      return (
          <>
              <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                  <IconButton {...propsIconButton}>
                      <Avatar src={src} sx={{ width: 40, height: 40 }}></Avatar>
                  </IconButton>
              </Box>
              <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  {...propsMenu}
              >
                  {!!currentUser &&
                  <div>
                      <MenuItem onClick={() => handleClickProfile(true)}>
                          <Avatar src={src}/> <span style={{color: theme.palette.primary.dark}}>Profile</span>
                      </MenuItem>
                      {currentUser.role ?
                          <div>
                              <MenuItem onClick={()=>handleClickProfile(false)}>
                                  <span style={{color: theme.palette.primary.dark}}>Dashboard</span>
                              </MenuItem>
                          </div> : <div></div>}
                      <Divider />
                  </div>}
                  <MenuItem onClick={handleClickLog}>
                      <ListItemIcon>
                          <Logout fontSize="small" />
                      </ListItemIcon>
                      {!!currentUser ?
                          <span style={{color: theme.palette.primary.dark}}>Logout</span> :
                          <span style={{color: theme.palette.primary.dark}}>Login</span>}
                  </MenuItem>
              </Menu>
          </>
      );
}

export default CustomAccountButton;