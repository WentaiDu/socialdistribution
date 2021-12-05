import React from "react";
import './userInfo.css'
import { Box, Link, Typography } from "@material-ui/core";
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import userBg from '../img/userBg.png'
import Posts from "../PostList";
import Author from '../Author';
import Inbox from '../Inbox';
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

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
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
                        {
                            Object.keys(props?.value)?.map(key => (

                                <li>{key}:{props?.value[key]}</li>
                            ))
                        }
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