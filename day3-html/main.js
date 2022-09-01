const debug = true;

const assert = (condition, msg) => { debug && !condition && alert(msg)};
const echo = (a, b) => assert(!a, b);

class LiElmFactory{
    constructor(){

    }
}

class ListElm{
    constructor(){

    }

    updateURL(){

    }

    updateLabel(){

    }
}

const flatten = (htmlCollection) => {
    debug && alert(`flatten: ${htmlCollection? htmlCollection.length : 'undefined'} ${htmlCollection}`);
    return (htmlCollection && htmlCollection.length > 0) ? htmlCollection.item(0) : void 0;
};

document.addEventListener("DOMContentLoaded", ()=>{
    

    //find the target element to duplicate. note: getElementById returns Element
    //whereas getElementsByTagName returns a HTMLCollection. the assumption
    //is that ids are unique and singular, thus no collection is possible.
    let elmTemplateContainer = document.getElementById("project-template");
    if(elmTemplateContainer){
        
        const listElement = flatten(elmTemplateContainer.getElementsByTagName("LI"));
        alert(`list elm ${listElement}`) //> HTMLCollection
        

        assert(listElement === void 0 && listElement === null, "list element")

        const linkElement = (listElement === void 0) ? listElement.getElementsByTagName("A") : void 0;
        alert(`${linkElement}`)

        if(linkElement){
            alert("")
            let listItemFactory = new LiElmFactory();
        }else{  

        }

    }
});
