import * as React from 'react';
import { Box, Link, Typography, TextField} from "@material-ui/core";
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Card from "@mui/material/Card";
import axios from "axios";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
export default function Post() {
    const base_url = process.env.REACT_APP_API_URL || 'http://localhost:8000';
    const [title, setTitle] = React.useState("")  
    const [content, setContent] = React.useState("")  
    const [visi, setVisi] = React.useState('');
    const handleVisiChange = (event) => {
        setVisi(event.target.value);
    };
    // function handlePost() {
    //     axios
    //       .post(`${base_url}/author/${author_id}/posts`, {
            // title: title,
    //         content: value,
    //         visibility: visi,
    //       })
    //       .then((res) => {
    //         handleClick(true);
    //         console.log(res.data);
    //       })
    //       .catch((res) => {
    //         handleClick(false);
    //       }); } 
  
    return (
    <Box
    sx={{
        alignItems: "center",
        justifyContent: "center",
        width: 750, 
        m:'auto', 
        p:{xs:2},
        flexGrow: 1
    }}>
        <Card
            sx={{
            m:2,
            p:{xs:2},
            align: "center",
            padding: "30px",
            borderRadius: 7,
            }}>

            <Grid item xs={12}>
                <TextField
                    required
                    id="title"
                    label="Title"
                    fullWidth
                    variant="standard"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </Grid>
            <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextField
                    id="outlined-multiline-static"
                    label="Put in your text"
                    multiline
                    fullWidth
                    rows={4}
                    defaultValue=""
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
            </Grid>

            <Grid item xs={12} sx={{minWidth: 120}}>
            <Stack direction="row" spacing={5} sx={{width: 750, m:'auto', p:{xs:2}, }}>
                <Box sx={{ minWidth: 120,}}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Visibility</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={visi}
                        label="Visibility"
                        onChange={handleVisiChange}
                        >
                        <MenuItem value={"PUBLIC"}>Public</MenuItem>
                        <MenuItem value={"FRIENDS"}>Friend</MenuItem>
                        <MenuItem value={"PRIVATE"}>Private</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Button
                    type="submit"
                    variant="contained"
                    sx={{
                        width: 100,
                        m:'auto',
                        borderRadius: 15,
                        backgroundColor: "#00428b",
                    }}
                    // onClick={handlePost}
                >
                    Submit
                </Button>
            </Stack>    
            </Grid>
            </Grid>
        </Card>
    </Box>
  );
}