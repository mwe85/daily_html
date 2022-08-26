
class ReorderableListBuilder{
    //this builder is less of a class and more of a function-object
    constructor(element){
        //takes as the invariant the type of DOM tree required to
        //build the component. From that DOM tree, it 
        this.__element = element;
    }

    build(){

        //iterate through all the children and attach 
        //an event handler
        const element = this.__element;

        const collection = []; //doesnt mean the object isnt mutable,
        //just that the object being referenced can't change.

        for(let i = 0; i < element.children.length; i++){
            //if the child is an li element, a list element,
            //accumulate it into collection 

            const child = element.children[i];

            //HTML tag names are uppercased, whereas XML the
            //case is preserved as it appears in the document
            if(child.tagName === "LI"){
                collection.push(child);
            }

        }


        return new ReorderableList(
            this.list_element,
            collection
        );
    }
}

class ReorderableList{
    constructor(parentContainer, collection = []){
        this.list_elm = parentContainer;
        this.items = collection;

        //the function being provided as an event listner has
        //to be created within this constructor and not in the builder
        //because the builder doesnt have in its scope a reference
        //to this object

        const shared_callback = (entryNumber, element) =>{
            //traps/captures this instance

        };
        

        for(let i = 0; i < this.items.length; i++){    
            this.items[i].addEventListener("click", (e)=>{
                //regardless of order, the identifying number doesnt change.
                this.handler(i, this.items[i]);
            });
        }
    }

    handler(n, elm){
        if(n == 0){
            //its already the top element, move to bottom

            let bottom = this.items[this.items.length - 1];
            bottom.replaceWith(elm);
        }

        
    }

    push(element){
        this.items.push(element);
    }

    remove(element){
        //search the list for the element
        //and remove it from the list,
        //and return it.
    }

    get collection(){
        return this.items;
    }

    get length(){
        return this.items.length;
    }


}
