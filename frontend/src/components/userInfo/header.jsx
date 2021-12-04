
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


const userId = localStorage.getItem('userID');


function Header () {
    const [index, setIndex] = useState(5)
    const [dia, setDia] = useState(false)
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

    const renderAddPost = () =>{
        if (dia){
            return (<AddPost open = {true} onClickEnd = {cancelPostDialog}/>);
        }
    }

    return (


        <div className="userInfo_header" style={row}>
                            {renderAddPost()}

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
                        <LocalFireDepartmentIcon fontSize={'large'} />
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

                </ul>
            </div>
        </div>

    );
}

export default Header;
