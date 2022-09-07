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
    constructor(data,  container_id, item_id){
        this.template_support = ('content' in document.createElement('template'));
        

        if(this.template_support){
            debug("templates are supported", true);
            const listTemplate = this.retriveListTemplate(container_id);
            const itemTemplate = this.retriveItemTemplate(item_id);
        }else{
            //revert to leagacy. 
            debug("templates arent supported", true);
        }
    }

    retriveListTemplate(id){
        const template_container = document.getElementById(id);
        false && alert(`template_container: ${template_container}`)
        const clone = template_container.content.cloneNode(true);
        debug(`template html ${clone.innerHTML}`, true) //content type is DocumentFragment
        if(template_container){
            alert("pb")
            const listElement = template_container.querySelector(".list-container");
            debug(`listElement html ${listElement}`, true)
        }
        
    }

    retriveItemTemplate(id){
        const template_list_item = document.getElementById(id);
        if(template_list_item){

        }else{
            debug()
        }
    }
}