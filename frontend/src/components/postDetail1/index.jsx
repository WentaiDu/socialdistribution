import React, { useEffect, useState } from "react";
import './index.css';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';

import TextField from '@mui/material/TextField';
import ShareIcon from '@mui/icons-material/Share';
import { Input, Card, Button } from '@mui/material';
import AlignItemsList from './commitList';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import axios from "axios";
import Share from './share'
const PostDetail = (props) => {
    const [like, setLike] = useState(false)
    const [isShare, setIsShare] = useState(false)
    const [open, setOpen] = useState(false)
    const [commitShow, setCommitShow] = useState(false)
    const [inp, setInp] = useState('')
    const [likeData, setLikeData] = useState([])
    const [data, setData] = useState({
        commit: [{
            val: '9999'
        }]
    })
    const linkHandle = () => {
        setLike(!like)
    }
    const shareHandle = () => {
        cancel()
        setIsShare(true)
        setOpen(true);
    }
    const handleClose = () => {
        setIsShare(false)
        setOpen(false);
    }
    const commitHandle = () => {
        setCommitShow(true)
    }
    const Agree = (val) => {
        console.log(val, "val")
        setIsShare(false)
        setOpen(false);
    }
    const inpHandle = (e) => {
        setInp(e.target.value)
    }
    const ok = () => {
        const userID = localStorage.getItem('userID');
        const state ={
            author:  userID,
            comment:inp,
            contentType:"text/markdown",
        }
        debugger
        const postId = 'http://localhost:3000'+props.location.query.author_id.url.split('com/')[1];
        const token = localStorage.getItem('jwtToken')
        axios
        .post(`${postId}comments`, state,    
        {
          headers: {
            Authorization: "token " + token,
          },
        })
        .then((res) => {
          console.log(res.data);
          cancel()
        })
        .catch(e => {
            console.log(e);
        }); 
        
    }
    const cancel = () => {
        setInp('')
        setCommitShow(false)
    }

    useEffect(() => {
        debugger
        let str = props.location.query.author_id.url.split('com/')[1]
        const postId = 'http://localhost:3000/'+str+'likes/';
        console.log(postId,'postId')
        const token = localStorage.getItem('jwtToken')
        axios.get(`${postId}likes/`,
            {
                headers: {
                    Authorization: "Token " + token,
                },
            })
            .then(res => {
                const temp = res?.data || [];
                setLikeData(temp)

            })
    }, [])
    return (
        <>
            <div className='like_content'>
                <div></div>
                <div className='detail'>
                    <Card className='detail_row'>
                        <div>
                            <ThumbUpIcon fontSize={like ? 'large' : 'small'} className={like ? 'linke_icon like_active' : 'linke_icon like'} onClick={linkHandle} />
                        </div>
                        <div>
                            <CommentIcon onClick={commitHandle} />
                        </div>
                        <div>
                            <ShareIcon onClick={shareHandle} onClick={shareHandle} />
                        </div>
                    </Card>
                    <Card>
                        <div className='like_people'>
                            {
                                likeData.map((item) => (
                                    <>
                                        <ListItemAvatar>
                                            <Avatar alt="Remy Sharp" src={item.author.profileImage} />
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {
                                                    item.author.displayName
                                                }
                                            </Typography>
                                        </ListItemAvatar>

                                    </>
                                ))
                            }
                        </div>
                    </Card>
                    <Card>
                        <AlignItemsList data={data.commit} />
                    </Card>
                    {
                        commitShow ?
                            <Card>
                                <div className='commit_inp'>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="name"
                                        label="commit"
                                        type="email"
                                        fullWidth
                                        variant="standard"
                                        onChange={inpHandle}
                                    />
                                    <div>

                                        <Button className='commit_btn' size="small" variant="contained" onClick={ok}>ok</Button>

                                        <Button className='commit_btn' size="small" variant="contained" onClick={cancel}>cancel</Button>
                                    </div>
                                </div>

                            </Card>
                            : null

                    }

                </div>
                <div></div>
            </div>
            {
                isShare ? <Share handleClose={handleClose} Agree={Agree} open={open} /> : null
            }
        </>
    )
}

export default PostDetail;