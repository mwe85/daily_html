const gURL = "https://mwe85.github.io/daily_html/pages.json";


class FetchRequestor{
    request(url){
        const promise = new Promise((ok, err) =>{
            false && alert("fetch request..")
            fetch(url).then(
                (response) =>{
                    false && alert("fetch reponse")
                    //handle responses with HTTP status codes not 200 as an error
                    if(response.status !== 200){
                        alert("fetch reponse status error: " + response.status)
                        return err({status: response.status});
                    }
                    
                    response.json().then((data)=>{
                        false && alert("fetch response ok")
                        ok(data);
                    });

                    
                },
    
                (error) =>{
                    alert("fetch err")
                    return err({error: error});
                }
            );
        });

        false && alert(`returning promsie from fetch ${promise}`)
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
        false && alert("hi 2")
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
        false && alert("hi")
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


