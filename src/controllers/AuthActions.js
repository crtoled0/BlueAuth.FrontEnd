/**
 * @author: crtoledo
 */
import _ from 'lodash';
import restClient from '../classes/common/RestClientMng';
import Tools from '../classes/common/Tools';
import Backbone from './Backbone';
import MainActions from './MainActions';

export default class AuthActions extends MainActions {}

// --------------------------------------------------------------------------------------------------------

AuthActions.userValueLink = (props) => {
    let backbone = Backbone.getInstance();
    let {key, target} = props;
    let {user} = backbone.state;
    user = user||{};
    if(!key || !target)
        return ;

     if(!_.isArray(key)){
          user[key] = target.value;
     }
     else {
          key.forEach(k => {
               user[k] = target.value;
          });
     }
    //console.log(loggedUser);
};

// --------------------------------------------------------------------------------------------------------

AuthActions.authenticate = () => {
     let backbone = Backbone.getInstance();
     let {user, callbackUrl} = backbone.state;
     restClient.call("/Auth/login", {method:"POST", body: user})
     .then(response => {
          console.log(response);
          MainActions.raiseMessage({message:"Welcome "+response.response.firstName,severity:"success"});
          if(callbackUrl)
             document.location.href=callbackUrl + "?access_token=" + response.access_token;
          else
             backbone.setState({access_token: response.access_token});
     })
     .catch(error => {
          MainActions.raiseMessage({message:error.details[0],severity:"error"});
          console.log(error);
     });
};

// --------------------------------------------------------------------------------------------------------


AuthActions.copyClipboard = () => {
    let backbone = Backbone.getInstance();
    let tools = new Tools();
    let {access_token} = backbone.state;
    tools.copyTextToClipboard(access_token)
    .then(()=>{
        MainActions.raiseMessage({message:"Access Token Copied to Clipboard",severity:"success"});
        backbone.setState({access_token:undefined});
    })
    .catch(()=>{
        MainActions.raiseMessage({message:"Not Able to copy to clipboard. Please try again",severity:"error"});
        backbone.setState({access_token:undefined});
    });
};

// --------------------------------------------------------------------------------------------------------

const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};


const isValidationOK = (user) => {
   let {email, password, password2} = user;

   for(let key in user){
       let val = user[key];
       if((!val || val === "") && ["userid","email","password","password2"].indexOf(key) > -1){
            MainActions.raiseMessage({message: `${key} is mandatory and cannot be empty`,
                                    severity:"warning"});
            return false;
        }
   }
   if(!validateEmail(email)){
        MainActions.raiseMessage({message: `Wrong email format for "${email}" `,
                                severity:"warning"});
        return false;
    }
    if(password !== password2){
        MainActions.raiseMessage({message: `Both passwords must be the same. Please check and try again. `,
                                severity:"warning"});
        return false;
    }
    return true;
   
};

AuthActions.register = () => {
     let backbone = Backbone.getInstance();
     let {user} = backbone.state;

     if(!isValidationOK(user)){
         return false;
     }

     user = _.omit(user, "password2");
     restClient.call("/Auth/register", {method:"POST",body: user})
     .then(response => {
          if(response.ok){
               MainActions.raiseMessage({message:response.response,severity:"success"});
               backbone.setState({currLocation:'/login'});
          }
          else
               MainActions.raiseMessage({message:response.response,severity:"warning"});
          console.log(response);
     })
     .catch(error => {
          MainActions.raiseMessage({message:error.details[0],severity:"error"});
          console.log(error);
     });
};