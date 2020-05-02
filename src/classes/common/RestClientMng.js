//import conf from '../config/conf.json';
import config from '../../config';

class RestClientMng {

    constructor(){
        this.restUrl = config.blueAuthBackHost + ":" + config.blueAuthBackPort;
    }

    call(service, par){
        return new Promise((resolve, reject) => {
            try {
                console.log("init callService");  
                par = par||{}; 
                par.output = par.output||"application/json";
                let servParm = {
                method: par.method||"GET",
               // mode: 'no-cors',
                headers: {
                    'Content-Type': par.output,
                    'origin': document.location.origin              
                },
                body: par.body?JSON.stringify(par.body):null,
                data: par.data,
                processData: false
                };

                if(par.token)
                    servParm.headers.Authorization = 'Bearer '+par.token;
                let status;
                fetch(this.restUrl+service, servParm)
                .then((response) => {
                    try{
                        let _ret = par.output==="application/json"?response.json():response.text();
                        status = response.status;                        
                        return _ret;
                    }
                    catch(err){
                        return response.text();
                    }
                })
                .then((responseData) => {    
                    console.log("We are back"); 
                    responseData.status = status;
                    if([200,201].indexOf(status) === -1)
                            return reject(responseData);     
                    resolve(responseData);
                })
                .catch(error => {
                     reject({error:true,stack:error});
                    //console.warn(error);
                });     
            } catch (error) {
                reject({error:true,stack:error});
            }              
        });
    }
}

export default new RestClientMng();