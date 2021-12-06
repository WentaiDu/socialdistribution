import React, { useEffect } from "react";
import './userInfo.css'
import { Link, Typography } from "@material-ui/core";
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import userBg from '../img/userBg.png'
import { Button } from '@mui/material';
import Posts from "../PostList";
import Author from '../Author';
import Inbox from '../Inbox';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from "axios";

const userID = localStorage.getItem('userID')
const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const token = localStorage.getItem('jwtToken')
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const Center = (props) => {
    const info = {
        fence: 9999,
        focus: 999,
        userName: 'ali'
    }
    const [value, setValue] = React.useState(0);
    const [isEdit, setIsEdit] = React.useState(true);
    const [isCurrentUser, setIsCurrentUser] = React.useState(true);
    const [form, setForm] = React.useState(props?.value);
    const [file, setFile] = React.useState({});

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    useEffect(() => {
        setForm(props?.value)
        if (userID !== props?.value.author_id) {
            setIsCurrentUser(false)
        }
    }, [props?.value])
    // edit fn
    const editHandle = () => {
        setIsEdit(false)
        console.log(form, 'eee')
    }
    const saveHandle = () => {
        const data = { ...form };
        data['profileImage'] = file
        console.log(form, 'eee')
        console.log(file, 'file')
        axios.put(`${base_url}/author/${props?.value.author_id}/`, data, {
            headers: {
                Authorization: "token " + token,
            },
        })
            .then((res => {
                console.log(res, 'res')
            })).catch((err => {
                console.log(err, 'rerr')
            }))

    }
    const setObjAttr = (val, key) => {
        const obj = { ...form };
        obj[key] = val
        setForm(obj)
    }
    const handleFile = (e) => {
        let file = e.target.files[0];
        setFile(file)
    }
    return (
        <div className="center_slider">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    justifyContent: 'start',
                    width: '100%'
                }}
            >
                <div className="userInfoCenterBg"></div>

                <div className="userInfo_Center_user">
                    <div>
                        <div className="userInfo_logo">
                            <img src={props?.value?.profileImage} alt="" />
                        </div>
                    </div>
                    <div>
                        <div className="userName">{props?.value?.username}</div>
                        <div className="fense">
                            <span className="infoKey">Fans</span><span className="infoVal">{info.fence}</span>
                            <span className="infoKey">Follow</span><span className="infoVal">{info.focus}</span>
                        </div>
                    </div>
                </div>
                <div className="userDesc">
                    <p>
                        {
                            info.userDesc ? info.userDesc : 'Description'
                        }
                    </p>
                </div>
                <div className="userInfo_tab">
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" className="tabs">
                        <Tab label="User Information" {...a11yProps(0)} />
                        <Tab label="Posts" {...a11yProps(1)} />
                        <Tab label="Inbox" {...a11yProps(2)} />
                    </Tabs>

                </div>
                <div className="userInfo_tab_Content">
                    <TabPanel value={value} index={0} className="tab_content">

                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1, width: '100%' },
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            {
                                isCurrentUser ?
                                    <div>

                                        {
                                            Object.keys(props?.value)?.map(key => (
                                                key != 'password' && key != 'profileImage' ?
                                                    <TextField
                                                        required
                                                        id={key}
                                                        label={key}
                                                        disabled={key === 'id' || key === 'author_id' ? true : isEdit}
                                                        defaultValue={props?.value[key] || '-'}
                                                        onChange={(e) => setObjAttr(e.target.value, key)}
                                                    />
                                                    :
                                                    null
                                            ))
                                        }
                                        {
                                            !isEdit ? <input type="file" name="file" onChange={e => handleFile(e)} /> : null
                                        }

                                        <Button size="small" variant="contained" style={{ margin: '10px' }} onClick={editHandle}>edit</Button>
                                        <Button size="small" variant="contained" onClick={saveHandle}>save</Button>
                                    </div>
                                    : null
                            }
                        </Box>
                    </TabPanel>
                    <TabPanel value={value} index={1} className="tab_content">
                        <Posts author_id={props?.value.author_id} />
                    </TabPanel>
                    <TabPanel value={value} index={2} className="tab_content">
                        <Inbox />
                    </TabPanel>
                </div>
            </Box>
        </div>
    )
}

export default Center;