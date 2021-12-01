import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import * as React from 'react';

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import CommentIcon from '@mui/icons-material/Comment';

export default class Comment extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props);
    }


    renderIcon(){
        return(
            <Button onClick = {this.props.onClickComment}><CommentIcon /></Button>
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