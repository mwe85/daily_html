/**
 *  fetch api supports 
 *  */


class PageData{
    constructor(jsonObj){

    }

    
    get index(){
        //lazily resolve to default
        if(this.index == ""){
            this.index = "index.html";
            return this.index;
        }
    }

    get dir(){
        return "";
    }

    get order(){
        return NaN;
    }
}

class FetchRequestor{

}

class LegacyRequestor{

}

class Requestor{
    constructor(){

    }

    lazyResolve(){
        //Requestor as an class ought to have invariants, these
        //invariants are like established for the first time
        //not in the constructor but here. 

        //the invariants are:
        //if the browser doesnt support FetchApi, then default
        //to XMLHttpRequest.

        //detection


        //resolving detection

    }


}


document.addEventListener("DOMContentLoaded", (event) => {

});
