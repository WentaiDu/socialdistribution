// 1组件
import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import axios from "axios";
import PrimarySearchAppBar from './Sidebar';
import { Link } from 'react-router-dom';
import AddPost from "./Post";
import { useState } from "react";

import Button from '@mui/material/Button';

// 函数组件 无状态
function Axxx1() {
    const [arugment, setArgument] = useState(false);

	function aaaaa(){
		console.log("wo hen nb");	
    }   
    const a = 1;
	return(null
    )
}   


// 类组件 有状态

class Axxx2 extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            number: 0,
            age : "20"
        };
        this.x = {};

        this.clicked = this.clicked.bind(this);
    }

	aaaaaa1(){
        this.setState({
            number: this.state.number+1,
            age: "20"
        })
		console.log(this.props.argument1);

    }
    aaaaaa2 = () => {
		console.log("wohennb");
    }

    clicked = () =>{
        this.setState({
            number: this.state.number+1,
            age :"20"
        })
    }

	render() {
        console.log("rendering");



		return (
              <span><Button onClick = {this.clicked}>Click me</Button> 
              <li>{this.state.number}</li></span>
        )
	}
}



class Element extends React.Component{
    constructor(){
        super()
        this.state = {
            txt:"3",
        };
    }

    change = (e) => {
        console.log("clicked");
        this.setState({
            txt: e.target.value
        })
    }

    render (){
        return(
        <span>     <li>
            <TextField
            required
            name="txt"
            label="txt"
            fullWidth
            variant="standard"
            value={this.state.txt}
            onChange={this.change}
        /></li>
        <li>
        <Link to= {"/authors/"} replace style={{color:'black'}}>
            <li> click to jump </li>

            {this.state.txt}
            </Link>
        </li>
    </span>   
        )

        
    }

}

export default function Try(){
    const somejs = "1";

    // Calling 
    return(
        <span><li><Axxx2 argument1 = {somejs} /></li>
        <li><Element /></li></span>
    )   

}

// e.prevenDefault()


