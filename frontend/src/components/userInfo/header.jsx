import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import AlertDialog from './logout'
import EditLocationOutlinedIcon from '@mui/icons-material/EditLocationOutlined';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';
import { Link, useHistory } from 'react-router-dom';
import './userInfo.css'
import React, { useState } from "react";
import AddPost from ".././Post";
import SeeReq from ".././adminReq/signUpReq";
import { getUserInfo } from "../baseElement/toolFuntions";
import Snackbar from "@mui/material/Snackbar";
import Avatar from '@mui/material/Avatar';
import DialogFriendlist from "../Friend/index";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import GroupIcon from '@mui/icons-material/Group';
const userId = localStorage.getItem('userID');


function Header() {
    const [index, setIndex] = useState(1)
    const [dia, setDia] = useState(false)
    const [req, setReq] = useState(false)
    const [logoutOpen, setLogoutOpen] = useState(false)

    const [friendListOpen, setFriendListOpen] = useState(false)

    const [authAlert, setAuthAlert] = useState(false)

    const row = {
        display: "flex",
        justifyContent: 'space-around',
        width: '100%'
    }
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
    const history = useHistory();
    const active = (id) => {
        if (id === 1) {
            history.push('/Main')
        }
        setIndex(id);
    }

    const addPostDialog = () => {
        console.log("rendering")
        setDia(true);
    }

    const cancelPostDialog = () => {
        console.log("canceling")
        setDia(false);

    }
    const cancelReq = () => {
        console.log("canceling")
        setReq(false);

    }

    const showRequestDialog = async () => {
        var temp = await getUserInfo().catch(err => {
            console.log("bugbugbug")
        });
        var user = temp.data;

        console.log(user);
        if (true) {
            setReq(true);
        }
        else {
            setAuthAlert(true);
        }
    }




    const showFriendList = (event, reason) => {
        if (reason === 'clickaway') {
            return;
          }
      
        setFriendListOpen(true);
          

    }
    
    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setAuthAlert(false);
      };
  
  
    const LogoutClose = (event, reason) => {
        setLogoutOpen(false);
    };
    const logoutHandle = ()=>{
        setLogoutOpen(true)
    }
    const handleAgree = ()=>{
        setLogoutOpen(false);
        localStorage.setItem("jwtToken", "null");
        localStorage.setItem("userID", "null");
        history.push('/')
    }

      const cancelFriendList = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setFriendListOpen(false);
      };

    return (


        <div className="userInfo_header" style={row}>

            <div className="weibo">
                <li className="mui-table-view-cell">
                    <div className="searchBox">
                        <div style={{ color: '#20B2AA' }}>Cmput404 Project</div>

                    </div>
                </li>
            </div>
            <div>
                <ul className="center_menu">
                    <li onClick={() => active(1)} className={index === 1 ? 'bottomActive' : ''}>
                        <Link to="/main"><HomeOutlinedIcon  fontSize={'large'} /></Link>
                    </li>

                    <li onClick={() => active(2)} className={index === 2 ? 'bottomActive' : ''}>

                    <Link to= {"/authors/"}><LocalFireDepartmentIcon fontSize={'large'} /></Link>
                    </li>
                    <li onClick={() => active(3)} className={index === 3 ? 'bottomActive' : ''}>
                    <Link to= {"/author/"+userId+"/inbox/"}><MailOutlineIcon fontSize={'large'}></MailOutlineIcon></Link>
                    </li>
                    <li onClick={() => active(4)} className={index === 4 ? 'bottomActive' : ''}>
                        <Link to={{ pathname: '/UserInfo', state: {  author_id: userId }  }}><AccountCircleOutlinedIcon fontSize={'large'}></AccountCircleOutlinedIcon></Link>
                    </li>
                </ul>
            </div>
            <div className='header_right'>
                <ul className="right_menu">
                    <li className="mui-table-view-cell">
                        <Button onClick={addPostDialog}><EditLocationOutlinedIcon fontSize={'large'} /></Button>
                    </li>

                    <li className="mui-table-view-cell">


                    <Button onClick = {showRequestDialog}><HowToRegIcon fontSize={'large'} /></Button>

                    </li>
                    <li className="mui-table-view-cell">

                    <Button onClick = {showFriendList}><GroupIcon fontSize={'large'} /></Button>

                    </li>
                    <li className="mui-table-view-cell" style={{marginLeft:'20px'}}>
                        <Avatar alt="loginoput" onClick={logoutHandle}/><AlertDialog open={logoutOpen} handleAgree={handleAgree} handleClose={LogoutClose}/>
                    </li>
                </ul>
            </div>


            <Snackbar
                open={authAlert}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Only stuff can see it"
            />

            <AddPost open = {dia} onClickEnd = {cancelPostDialog}/>
            <SeeReq open = {req} onClickEnd = {cancelReq}/>
            <DialogFriendlist open = {friendListOpen}  onClickEnd = {cancelFriendList}/>

        </div>

    );
}

export default Header;