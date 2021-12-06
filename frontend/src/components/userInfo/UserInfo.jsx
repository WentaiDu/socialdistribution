//Some code comes fromhttps://mui.com/zh/getting-started/usage/
//The layout is inspired by https://weibo.com/
import { Box } from "@material-ui/core";
import Header from "./header";
import Left from './Left';
import Center from './Center';
import './userInfo.css'
import axios from "axios";
import React, { useEffect, useState } from "react";



const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const token = localStorage.getItem('jwtToken')
function UserInfo (props) {
    const [ value, setValue] = useState({});
    console.log(props,"00000")
    const  author_id = props?.location?.state?.author_id
    useEffect(()=>{
        axios.get(`${base_url}/author/${author_id}/`,
        {
          headers: {
            // "X-CSRFToken":  this.props.token,
            Authorization:"Token " + token,
    
          },
        })
          .then(res => {
            const _value = res.data;
            console.log(_value,'ffff')
            setValue( _value );
        }).catch(e => {
            console.log("get failed")
        })
    },[])
    return (
        <div className="userInfo">
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: '100%'
                }}
            >
                {/* <Header /> */}
                <div className="userInfo_content">
                    <div>
                        <Left />
                    </div>
                    <div>
                        <Center value={value}/>
                    </div>
                    <div>
                        {/* <BasicDateRangePicker /> */}
                    </div>
                </div>
            </Box>
        </div>
    );
}

export default UserInfo;
