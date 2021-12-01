import "./App.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Inbox from "./components/Inbox";
import Post from "./components/Post";
import Authors from "./components/Authors";
import Author from "./components/Author";
import Posts from "./components/PostList";
import Followers from "./components/Followers";
import PostDetail from "./components/PostDetail";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
import {withRouter} from 'react-router-dom'
import { Link } from 'react-router-dom';
import Connection from "./components/connection";

import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";


import CommentList from "./components/postActionComponents/Comment";
import Sidebar from "./components/Sidebar";



import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
// import {AppAp} from "./components/Sidebar";

const URL = window.location.href;


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));



function App() {

  // function redir (){
  //   URL.charAt(URL.length-1) !== "/"
  //   ? window.location.href= window.location.href + "/"
  //   : console.log("have /") ;
  // }

  // redir()
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen1 = (event) => {
    // history.push("/signup");
    window.location.href="/Author/:author_id/Inbox"
    // setAnchorEl(event.currentTarget);
    
  };

  const handleProfileMenuOpen2 = (event) => {
    // history.push("/signup");
    window.location.href="http://localhost:3000/Author"
    // setAnchorEl(event.currentTarget);
    
  };

  const handleProfileMenuOpen3 = (event) => {
    // history.push("/signup");
    window.location.href="http://localhost:3000/Author"
    // setAnchorEl(event.currentTarget);
    
  };


  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
    
  };

  const handleMenuClose = () => {
    window.location.href="http://localhost:3000/Signup"
    //history.push("/Signup");
    // href="/signup"
    // this.props.history.push('/signup');
    // history.replace("/signup");
    // setAnchorEl(null);
    // handleMobileMenuClose();
  };
  const handleMenuClosee = () => {
    window.location.href="http://localhost:3000/Signup"
    //history.push("/Signup");
    // href="/signup"
    // this.props.history.push('/signup');
    // history.replace("/signup");
    // setAnchorEl(null);
    // handleMobileMenuClose();
  };



  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >

      
      <MenuItem>Profile</MenuItem>
    
      <MenuItem>Profile</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen1}>
        <Button size="large" aria-label="show 4 new mails" color="inherit" >
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </Button>
        <p>Messages</p>
    
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen2}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"

        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen3}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  return (
    <>
        <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            CMPUT404Project
          </Typography>

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={999} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge badgeContent={999} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>


            
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen3}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
    

    <Router>
        <Switch>
          <Route path="/Author/:author_id/posts/:post_id/comments" exact component={CommentList}/>
          <Route path="/" exact component={Login} />
          <Route path="/Connection" exact component={Connection} />
          <Route path="/Signup" exact component={Signup} />
          <Route path="/Post" exact component={Post} />
          <Route path="/Author/:author_id/Inbox" exact component={Inbox} />
          <Route path="/Author/:author_id/posts/:post_id" component={PostDetail} />
          <Route path="/Author/:author_id/posts" component={Posts} />
          <Route path="/Author/:author_id/followers" exact component={Followers} />

          <Route path="/Author/:author_id" exact component={Author} />
          <Route path="/Authors" exact component={Authors} />

        </Switch>
      </Router></>
  );
}

export default App;
