let elmDebuggerOutput = null;
function init_debug(){
    elmDebuggerOutput = document.getElementById("debug");
    return;
}

function debug(data, append = true){
    if(!elmDebuggerOutput){
        init_debug();
    }

    if(append){
        elmDebuggerOutput.innerHTML = elmDebuggerOutput.innerHTML +"\r\n"+ data;
    }else{
        elmDebuggerOutput.innerHTML = data;
    }
}

class ListMaker{
    
}

class PageDataCollection{

    sortOrder(){

    }

    createDOMTree(){

    }
}

class PageData{
    constructor(jsonObj){
        this.index = jsonObj.main;
        this.dir = jsonObj.dir;
        this.order = jsonObj.order;
    }

    
    get index(){
        //lazily resolve to default
        if(this.index === ""){
            this.index = "index.html";
            return this.index;
        }
    }

    get dir(){
        return this.dir;
    }

    get order(){
        return this.order;
    }
}


class PrototypeBuilder{
    /**
     * 
     * @param {Object} data  
     * @param {String} container_id 
     * @param {String} item_id 
     * @param {String} container_target 
     * @param {String} item_target 
     */
    constructor(data,  container_id, item_id, container_target, item_target){
        this.template_support = ('content' in document.createElement('template'));
        

        if(this.template_support){
            debug("templates are supported", true);

            this.list_template = this.retriveListTemplate(container_id, container_target);
            debug(`list container: ${this.list_template}`);


            debug("find item template...")
            this.item_template = this.retriveItemTemplate(item_id, item_target);
        }else{
            //revert to leagacy. 
            debug("templates arent supported", true);
        }
    }

    /**
     * 
     * @param {String} id 
     * @returns {(HTMLOListElement)}
     */
    retriveListTemplate(id, innerTargetClass){
        const template_container = document.getElementById(id);
        false && alert(`template_container: ${template_container}`)
        const template_clone = template_container.content.cloneNode(true);
        debug(`template element ${template_container}`, true) //content type is DocumentFragment
        debug(`template HTML  ${template_clone.children.item(0)}`)
        debug(`clone typeof: ${template_clone}`)
        debug(`querying cloned node for ${innerTargetClass}: ${template_clone.querySelector(innerTargetClass)}`)
        if(template_container){
            debug("template container exists");
            //note  template_container.querySelector is a valid function, but wont
            //find anything.. to find something within a template contents, the
            //content object needs to be used to invoke querySelector
            const listElement = template_container.content.querySelector(innerTargetClass);
            debug(`listElement html ${listElement}, ${listElement.cloneNode(true)}`, true)
            return listElement.cloneNode(true);
        }
        return null;
    }

    /**
     * 
     * @param {String} id 
     * @param {String} innerTargetClass 
     * @returns {(HTMLLIElement|null)}
     */
    retriveItemTemplate(id, innerTargetClass){
        debug(`retriving list item template at: ${id}`);
        debug(`inner target: ${innerTargetClass}`)
        const template_list_item = document.getElementById(id);
        debug(`list item template ${template_list_item}`);
        if(template_list_item){
            const item_template = template_list_item.content.querySelector(innerTargetClass);
            debug(`item template: ${item_template}`);
            return item_template.cloneNode(true);
        }else{
            debug(`template item returned null`)
            return null;
        }
    }

    prototypeBuilder(container){

    }

    wipListItem(){

    }

    wipListContainer(){
        
    }
}