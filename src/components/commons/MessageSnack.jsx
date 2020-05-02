import React from 'react';
import {Snackbar, Slide} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default class MessageSnack extends React.Component {

    constructor(props) {
      super(props);
      this.isOpened=true;
    }

  
    componentDidMount() {
    
    }
    
    render() { 
        let {opened, handleClose, severity, message, title} = this.props;
        return (
            <Slide direction="down" in={opened} >
            <Snackbar  open={true} 
                       onClose={handleClose} 
                       anchorOrigin={{vertical: 'top', horizontal: 'right'}} 
                       action={<IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                                  <CloseIcon fontSize="small" />
                              </IconButton>}>
                    <Alert severity={severity||"info"}>
                        {title && <AlertTitle>{title}</AlertTitle>}
                        {message}
                    </Alert>
            </Snackbar>
            </Slide>);
    }

}