
import { Box } from "@material-ui/core";
import Header from "./header";
import Left from './Left';
import Center from './Center';
import './userInfo.css'
import React, { useState } from "react";

function UserInfo () {
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
                <Header />
                <div className="userInfo_content">
                    <div>
                        <Left />
                    </div>
                    <div>
                        <Center />
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
