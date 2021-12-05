
import SearchIcon from '@mui/icons-material/Search';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import EditLocationOutlinedIcon from '@mui/icons-material/EditLocationOutlined';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import { styled, alpha } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import './userInfo.css'
import React, { useState } from "react";
import AddPost from ".././Post";
import SeeReq from ".././adminReq/signUpReq";
import { getUserInfo } from "../baseElement/toolFuntions";
import Snackbar from "@mui/material/Snackbar";


const userId = localStorage.getItem('userID');


function Header () {
    const [index, setIndex] = useState(5)
    const [dia, setDia] = useState(false)
    const [req, setReq] = useState(false)

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

    const active = (id) => {
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
        var temp = await getUserInfo().catch(err=>{
            console.log("bugbugbug")
          });
          var user = temp.data;
  
          console.log(user);
          if (true){
            setReq(true);
          }
          else{
            setAuthAlert(true);
        }
    }

    
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setAuthAlert(false);
      };

    return (


        <div className="userInfo_header" style={row}>

            <div className="weibo">
                <li className="mui-table-view-cell">
                    <div className="searchBox">
                        <div style={{ paddingTop: '6px' }}>Cmput404 Project</div>

                    </div>
                </li>
            </div>
            <div>
                <ul className="center_menu">
                    <li onClick={() => active(1)} className={index === 1 ? 'bottomActive' : ''}>
                        <Link to="/main"><HomeOutlinedIcon fontSize={'large'}/></Link>
                    </li>
     
                    <li onClick={() => active(3)} className={index === 3 ? 'bottomActive' : ''}>
                    <Link to= {"/main/"}><LocalFireDepartmentIcon fontSize={'large'} /></Link>
                    </li>
                    <li onClick={() => active(4)} className={index === 4 ? 'bottomActive' : ''}>
                    <Link to= {"/Author/"+ userId +"/Inbox"}><MailOutlineIcon fontSize={'large'}></MailOutlineIcon></Link>
                    </li>
                    <li onClick={() => active(5)} className={index === 5 ? 'bottomActive' : ''}>
                    <Link to= {"/Author/"+ userId}><AccountCircleOutlinedIcon fontSize={'large'}></AccountCircleOutlinedIcon></Link>
                    </li>
                </ul>
            </div>
            <div>
                <ul className="right_menu">
                    <li className="mui-table-view-cell">
                    <Button onClick = {addPostDialog}><EditLocationOutlinedIcon fontSize={'large'} /></Button>
                    </li>

                    <li className="mui-table-view-cell">

                    <Button onClick = {showRequestDialog}><SettingsApplicationsOutlinedIcon fontSize={'large'} /></Button>

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
        </div>

    );
}

export default Header;
