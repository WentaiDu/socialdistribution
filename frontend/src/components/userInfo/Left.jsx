import React from "react";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import SettingsApplicationsOutlinedIcon from '@mui/icons-material/SettingsApplicationsOutlined';
import ListItemText from '@mui/material/ListItemText';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CenterFocusWeakOutlinedIcon from '@mui/icons-material/CenterFocusWeakOutlined';
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import FenceOutlinedIcon from '@mui/icons-material/FenceOutlined';
import './userInfo.css'
import { Link } from 'react-router-dom';
const Left = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };
    return (
        <div className="left_slider">
            <List component="nav" aria-label="secondary mailbox folder">
                <ListItemButton
                    selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1)}
                ><AccountCircleOutlinedIcon fontSize={'medium'}></AccountCircleOutlinedIcon>
                    <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2)}
                >
                    <CenterFocusWeakOutlinedIcon fontSize={'medium'}></CenterFocusWeakOutlinedIcon>
                    <ListItemText primary="Follow" />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 3}
                    onClick={(event) => handleListItemClick(event, 3)}
                >
                    <FenceOutlinedIcon fontSize={'medium'}></FenceOutlinedIcon>
                    <ListItemText primary="Fans" />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 4}
                    onClick={(event) => handleListItemClick(event, 4)}
                >
                    <StarBorderPurple500OutlinedIcon fontSize={'medium'}></StarBorderPurple500OutlinedIcon>
                    <ListItemText primary="liked" />
                </ListItemButton>
                <ListItemButton
                    selected={selectedIndex === 5}
                    onClick={(event) => handleListItemClick(event, 5)}
                >
                    <AutoAwesomeOutlinedIcon></AutoAwesomeOutlinedIcon>
                    <ListItemText primary="likes" />
                </ListItemButton>

            </List>
        </div>
    )
}

export default Left;