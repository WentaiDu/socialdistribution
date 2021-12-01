import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import * as React from 'react';
import Grid from "@mui/material/Grid";

import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';

import Like from "./postActionComponents/Like";
import Share from "./postActionComponents/Share";

export default class PostAction extends React.Component{
    constructor(props){
        super(props);
        console.log(this.props);
    }




    render(){
        return (
            <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            >
            <Like />
            <Like />
            <Share />
            </Grid>
        )
    }

}