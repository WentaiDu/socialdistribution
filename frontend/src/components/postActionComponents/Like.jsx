import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import * as React from 'react';

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';


export default class Like extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props);
    }


    renderIcon(){
        if (this.props.like)

        return(
            <ThumbUpAltIcon />
        )
    }

    render(){
        return (
            <li>
            {/* <Avatar alt={item.username} src={item.profileImage} />
            <Text primary={item.username} secondary={item.author_id} /> */}
            {this.renderIcon()}
            </li>
        )
    }

}