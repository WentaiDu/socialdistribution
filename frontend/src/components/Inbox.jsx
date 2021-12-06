import * as React from 'react';
import { useState, useContext, useEffect } from "react";
import InboxList from "./InboxType/InboxList";
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Link, Typography, TextField} from "@material-ui/core";
import Card from "@mui/material/Card";
import axios from "axios";

import { createTheme, ThemeProvider } from "@material-ui/core/styles";

export default function Inbox() {
    const token = localStorage.getItem('jwtToken')
    const id = localStorage.getItem('userID')
    const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    // const messages = getMockData().items
    const [messages, setMessages] = useState([]);
    useEffect(()=>{
            axios.get(
              `${base_url}/author/${id}/inbox/`,
            {
              headers: {
                Authorization: "token " + token,
              },
            })
              .then(res => {
                console.log(res.data);
                if (res.data.items){
                  let temp = res.data.items;
                  let data = JSON.parse(temp);
                  console.log(data)
                  for (let oneData of data){
                    if (oneData.id == "post"){
                      oneData.author =  JSON.parse(oneData.author);
                    }
                    if (oneData.type == "follow"){
                      oneData.actor =  JSON.parse(oneData.actor);
                      oneData.object =  JSON.parse(oneData.object);
                    }
                  }
                  console.log(data)
                  setMessages(data);
                }
                
            })
              .catch(e =>{
                console.log(e)
              })
    }, [])
    



    return (
      <ThemeProvider>
        {messages.map((message, index) => (
        <Card key = {index}
          sx={{
            align: "center",
            padding: "50px",
            borderRadius: 7,
          }}
        variant="outlined"
        >
          <Box sx={{ width: "100%" }}>
            <InboxList
              item = {message}
            />
          </Box>
        </Card>
      ))}
      </ThemeProvider>
    );
}