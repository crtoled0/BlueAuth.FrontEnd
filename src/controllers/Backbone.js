/**
 * @author: crtoledo
 * 
 */

class Backbone {
   // let appComponent;
    constructor() {
        this.pubActions = {};
    }
}

Backbone.appComponent = null;
Backbone.getInstance = ()=> {
   return Backbone.appComponent;
};

Backbone.initComponent = (comp)=> {
     Backbone.appComponent = comp;
};

export default Backbone;