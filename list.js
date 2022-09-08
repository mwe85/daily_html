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
        this._index = jsonObj.main;
        this._dir = jsonObj.dir;
        this._order = jsonObj.order;
        this._lazily_eval_trailing_slash = false;
    }

    
    get index(){
        //lazily resolve to default
        if(this._index === ""){
            this._index = "index.html";
            return this._index;
        }
        return this._index;
    }

    get dir(){
        if(!this._lazily_eval_trailing_slash){
            const end = this._dir.length - 1;

            if(this._dir.charAt(end) !== "/"){
                this._dir = this._dir + "/";
            }

            this._lazily_eval_trailing_slash = true;
        }
        return this._dir;
    }

    get url(){

        return this.dir + this.index
    }

    get order(){
        return this._order;
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
            debug(`list template: ${this.list_template}`);


            debug("find item template...") 
            this.item_template = this.retriveItemTemplate(item_id, item_target);
            debug(`item template: ${this.item_template}`);
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

    
    /**
     * 
     * @param {String} container 
     * @param {[Object]} page_data 
     */
    prototypeBuilder(container, page_data){
        debug(`pbbuilder ${container}, ${page_data.toString()}`)
        let containing_element = document.querySelector(container);

        if(containing_element){
            debug(`found app container element: ${containing_element}`)

            //redefine the containing element to be the list

            this.wipListContainer(containing_element, page_data);
            
        }else{
            debug('couldnt find `${container}`');
        }

        
    }

    /**
     * 
     * @param {HTMLElement} elm_container 
     * @param {PageData} pageData 
     */
    wipListItem(elm_container, pageData){
        //invariants at this point: the templated element to duplicate is found.
        debug(`this.item_template: ${ this.item_template}`)

        
        const item = this.item_template.cloneNode(true); //typeof HTMLLinkElement
        const inner_link = item.firstElementChild;

        //note its toString method defaults to printing out the url.
        debug(`inner link url ${item.firstElementChild}`); 
        debug(`inner link element ${item.firstElementChild.constructor}`); 
        
        if(pageData){
            inner_link.href = pageData.url;
            inner_link.textContent = pageData.index;
        }else{
            inner_link.href = "url"
            inner_link.textContent = "stuff";
        }

        elm_container.appendChild(item);
    }

    /**
     * 
     * @param {HTMLElement} elm_container 
     * @param {([PageData]|null)} page_data 
     * @returns {HTMLElement}
     */
    wipListContainer(elm_container, page_data = null){
        let resultingElement = this.list_template.cloneNode(true);
        debug(`ok.. ${elm_container}`)

        elm_container.appendChild(resultingElement);

        const containing_element = resultingElement;

        if(page_data.constructor === Array){
            const collectionLen = page_data.length;
            

            if(page_data.length > 0){
                //build a PageData element
                for(let i = 0; i < collectionLen; i++){
                    let pgdata = null;
                    pgdata = new PageData(page_data[i]);

                    this.wipListItem(containing_element, pgdata);
                }
            }else{
                debug("json collection of objects is empty");
                this.wipListItem(containing_element, null);
            }
        }else{
            this.wipListItem(containing_element, null);
        }

        return resultingElement;
    }
}