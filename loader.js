const gURL = "https://mwe85.github.io/daily_html/pages.json";

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
    request(url){
        const promise = new Promise((ok, err) =>{
            alert("fetch request..")
            fetch(url).then(
                (response) =>{
                    alert("fetch reponse")
                    //handle responses with HTTP status codes not 200 as an error
                    if(response.status !== 200){
                        alert("fetch reponse status error: " + response.status)
                        return err({status: response.status});
                    }
                    
                    response.json().then((data)=>{
                        alert("fetch response ok")
                        ok(data);
                    });

                    
                },
    
                (error) =>{
                    alert("fetch err")
                    return err({error: error});
                }
            );
        });

        alert(`returning promsie from fetch ${promise}`)
        return promise;
    }
}

class LegacyRequestor{

    request(url){
        alert("legacy")
        let req = new XMLHttpRequest();
        
        return new Promise((ok, error)=>{
            req.onload = function(){
                //note: onload is invoked with supplying 
                //an object via this. 
                alert("legacy response ok");
                const data = JSON.parse(this.responseText);
                ok(data);
                return data;
            };

            req.onerror = (err) => {
                alert("legacy response err");
                error(err)
            };
        });
    }
}

class Requestor{
    constructor(){
        alert("hi 2")
        this.requestor = this.lazyResolve(); //its cheaper to do it here than in request
    }

    lazyResolve(){
        //Requestor as an class ought to have invariants, these
        //invariants are like established for the first time
        //not in the constructor but here. 

        //the invariants are:
        //if the browser doesnt support FetchApi, then default
        //to XMLHttpRequest.

        //detection
        alert("hi 3")
        if(window.fetch === void 0){
            //resolve to legacy
            alert("legacy")
            return new LegacyRequestor();
        }else{
            alert("fetch")
            return new FetchRequestor();
        }
   }

    request(url){
        alert("hi")
        this.requestor.request(url);
    }


}

class ErrorElement{
    update(){

    }   
} 

//singleton function
let gRequestorInstance = null;

function fetcher(url){
    
    if(gRequestorInstance == null){
        
        gRequestorInstance = new Requestor();
        
    }

    const req = gRequestorInstance.request(url); 
    alert(`req: ${req}, requestor type: ${gRequestorInstance}`);
    return req;
}


document.addEventListener("DOMContentLoaded", (event) => {
    alert("hi a")

    /*
        const request = fetcher("https://mwe85.github.io/daily_html/pages.json");
        weird bug, it wont return the promise.
    */
    const request = (new FetchRequestor()).request(gURL);
    
    alert(`type of request: ${request}`)

    if(request){
        request.then((response) =>{
            alert("handling response")
            if(response.hasOwnProperty("pages")){
                const pages = response.pages;
                if(pages.constructor === Array){
                    alert(`pages len: ${pages.length}`);
                }else{
                    //not an array object
                    alert(`pages isnt an array:${pages}`);
                }
            }
        }).catch((error)=>{
            alert(`error ${error}`);
        });
    }else{
        alert("promise is null")
    }

    alert("done")
});
