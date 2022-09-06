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

class FetchRequestor{
    requestor(url){
        return new Promise((ok, err) =>{
            fetch(url).then(
                (response) =>{
                    //handle responses with HTTP status codes not 200 as an error
                    if(response.status !== 200){
                        return err({status: response.status});
                    }
                    
                    response.json().then((data)=>{
                        ok(data);
                    });
                    
                },
    
                (error) =>{
                    return err({error: error});
                }
            );
        })
    }
}

class LegacyRequestor{

    request(url){
        let req = new XMLHttpRequest();

        return new Promise((ok, error)=>{
            req.onload = function(){
                //note: onload is invoked with supplying 
                //an object via this. 

                return JSON.parse(this.responseText);
            };

            req.onerror = (err) => error(err);
        });
    }
}

class Requestor{
    constructor(){
        this.requestor = lazyResolve(); //its cheaper to do it here than in request
    }

    lazyResolve(){
        //Requestor as an class ought to have invariants, these
        //invariants are like established for the first time
        //not in the constructor but here. 

        //the invariants are:
        //if the browser doesnt support FetchApi, then default
        //to XMLHttpRequest.

        //detection
        if(window.fetch === undefined){
            //resolve to legacy
           return new LegacyRequestor()
        }else{
            return new FetchRequestor();
        }
   }

    request(url){
        this.requestor.request(url);
    }


}

//singleton function
let gRequestorInstance = null;

function fetcher(url){
    if(gRequestorInstance == null){
        gRequestorInstance = new Requestor();
    }

    return gRequestorInstance.request(url); 
}


document.addEventListener("DOMContentLoaded", (event) => {
    const data = fetcher("https://mwe85.github.io/daily_html/pages.json");

    //data should be a list
    if(false){
        //
    }
});
