const debug = true;

const assert = (condition, msg) => { debug && !condition && alert(msg)};


window.addEventListener("DOMContentLoaded", ()=>{
    let collection = document.getElementsByClassName("ol-demo");

    //container is an HTMLCollection
    if(collection && collection instanceof HTMLCollection){
        //assuming it isn't empty, there are
        //two ways to navigate an HTMLCollection
        let first_ol_demo = void 0, second_ol_demo = void 0;
        
        if(collection.length){
            //the first way is through iterating through the whole collection
            for(let k = 0; k < collection.length; k++){
                //through accessing the item method by index for a specific item in the
                //collection
                const element = collection.item(k);

                const elm_id = element.id === void 0? "undefined" : element.id;
                false && alert(`name of element: ('${elm_id}' === '') = ${'' === elm_id}`);

                if(elm_id === "" && first_ol_demo === void 0){
                    false && debug && alert('unnamed and first element in the collection');
                    first_ol_demo = element;
                }
            }

            //to find the second ol collection, which has an id attribute, another approproach can be
            //taken returns the first item with the name/id attribute in the collection

            let second_ol_demo = collection.namedItem("second-demo");
            assert(second_ol_demo !== void 0, "second element isnt found");

            //check for sanity against for a named item that doesnt exist in the collection.
            assert(collection.namedItem("second-demotypo") == null, "namedItem exists but shouldnt")
            
            if(first_ol_demo && second_ol_demo){
                
                //copy the children the first ol into the second

                //the element has a property called 'children' that is an HTMLCollection
                //of its DOM sub tree.
                let len = first_ol_demo.children.length;
                assert(false, `copying ${len} elements`);
                for(let i = 0; i < len; i++){
                    //true as a param for cloneNode indicates that we went to also clone
                    //the node's subtree
                    let cloned_node = first_ol_demo.children[i].cloneNode(true);

                    //using the classList property, their accessor methods can modify the
                    //class name attribute of DOM elements as tokenized lists

                    //let classlen = cloned_node.classList.length;

                    assert(cloned_node.classList.length >= 1, "class list is less than 1")

                    let cl = cloned_node.classList;
                    cl.toggle("felm");
                    cl.toggle("selm");
                    second_ol_demo.appendChild(cloned_node);

                    /*cloned_node.addEventListen("click", (e)=>{
                        alert(`ol>li#${i}`);
                    });*/
                }
            }



        }else{
            debug && alert(`HTMLCollection len = ${collection.length}`)
        }
    }else{
        debug && alert(`not a HTMLCollection`);
    }
})