
import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import Backbone from '../controllers/Backbone';
import skel from '../controllers/StateSkeleton';

import LoginView from './LoginView';
import RegisterView from './RegisterView';
import RecoverPasswordView from './RecoverPasswordView';
import MessageSnack from './commons/MessageSnack';

//import {Snackbar, Slide} from '@material-ui/core';
//import MuiAlert from '@material-ui/lab/Alert';
import config from '../config';

export default class App extends React.Component {
    
    constructor(props) {
      super(props);
      this.state = skel;
      Backbone.initComponent(this);
      this.backbone = Backbone.getInstance();
    }

  
    componentDidMount() {
      this.backbone.setState({config: config});
      document.title = config.systemLoginDisplayName;
      //let {callbackUrl} = useParams();
      let params = new URLSearchParams(document.location.search);
      if(params && params.get("callbackUrl"))
          this.backbone.setState({callbackUrl: params.get("callbackUrl"), currLocation:"/login"});
      else
          this.backbone.setState({currLocation:"/login"});
    }
    
  
   
  
    render() {
      let {currLocation, messageBoxOpen, severity, message, closeMessageBox, messageBoxTitle} = this.backbone.state;      
      return (<div>
              <MessageSnack opened={messageBoxOpen} 
                            severity={severity} 
                            message={message}
                            handleClose={closeMessageBox} 
                            title={messageBoxTitle}
              />
              <Router>
                  {currLocation && <Redirect push to={currLocation} />}
                  <Route path={"/login"} component={LoginView}  />
                  <Route path={"/register"} component={RegisterView}  /> 
                  <Route path={"/recoverPassword"} component={RecoverPasswordView}  /> 
              </Router></div>)
    }
  }