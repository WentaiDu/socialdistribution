import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import * as React from 'react';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Button from '@mui/material/Button';


export default class Like extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props);
    }


    renderIcon(){
        if (this.props.alreadyLiked){
            return(
                <Button onClick = {this.props.onClickLike}><ThumbUpAltIcon /></Button>
            )
        }
        else{
            return(
                <Button onClick = {this.props.onClickLike}><ThumbUpOffAltIcon /></Button>
            )
        }

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