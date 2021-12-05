import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props) {
    const [val,setVal] = React.useState('')
    const inpHandle = (e) =>{
        setVal(e.target.value)
    }
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"please input user id?"}
        </DialogTitle>
        <DialogContent>
        <TextField
            autoFocus
            margin="dense"
            id="name"
            label="user id"
            type="email"
            fullWidth
            variant="standard"
            onChange={inpHandle}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Disagree</Button>
          <Button onClick={()=>props.Agree(val)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
