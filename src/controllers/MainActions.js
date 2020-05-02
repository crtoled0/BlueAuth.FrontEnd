/**
 * @author: crtoledo
 */
import Backbone from './Backbone';
import _ from 'lodash';

export default class MainActions {}

MainActions.raiseMessage = (props) => {
     let {message, severity, keepOpened, messageBoxTitle} = props;
     let backbone = Backbone.getInstance();
     severity = severity || "info";
     backbone.setState({messageBoxOpen:true, message:message,severity:severity, messageBoxTitle: messageBoxTitle});  
     if(!keepOpened){
          setTimeout(()=>{
               backbone.setState({messageBoxOpen:false});
          },5000);
     }   
};

MainActions.closeMessageBox = () => {
     let backbone = Backbone.getInstance();
     backbone.setState({messageBoxOpen:false, messageBoxTitle:null});
};

MainActions.closeMessage = () => {
     let backbone = Backbone.getInstance();
     backbone.setState({messageBoxOpen:false});     
};

MainActions.goTo = (path) => {
     Backbone.getInstance().setState({currLocation: path});
};

MainActions.goToRegister = () => {
       MainActions.goTo("/register");
};
MainActions.goToLogin = () => {
     MainActions.goTo("/login");
};
MainActions.goToRecoverPass = () => {
     MainActions.goTo("/recoverPassword");
};