class SingleInstance{
    constructor(){
        this.w1 = new Worker();
        this.w2 = new Worker();
    }
}

class Worker{
    constructor(){
        this.channel = new MessageChannel();
        this.port1.onmessage = (msg) =>{
            this.handleMessage(msg)
        }
    }

    handleMessage(msg){

    }
}
