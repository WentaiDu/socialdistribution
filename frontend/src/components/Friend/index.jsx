import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';

export default function Inbox () {
    const token = localStorage.getItem('jwtToken')
    const id = localStorage.getItem('userID')
    const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    const [open, setOpen] = useState(true)

    const handleClose = () => {
        setOpen(false);
    };
    const handleListItemClick = (value) => {
        setOpen(false);
      };
      const emails = ['333333@qq.com' , '555555@qq.com']
    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Friend List</DialogTitle>
            <List sx={{ pt: 0 }}>
                {emails.map((email) => (
                    <ListItem button onClick={() => handleListItemClick(email)} key={email}>
                        <ListItemAvatar>
                            <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary={email} />
                    </ListItem>
                ))}
                <ListItem autoFocus button>
                    <ListItemAvatar>
                        <Avatar>
                            <AddIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Add account" />
                </ListItem>
            </List>
        </Dialog>
    );
}