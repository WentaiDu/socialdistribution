import * as React from 'react';

import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';

export default class Like extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props);
    }


    renderIcon(){
        return(
            <Button onClick = {this.props.onClickShare}><ShareIcon /></Button>
        )
    }

    render(){
        return (
            <li>
            {this.renderIcon()}
            </li>
        )
    }

}