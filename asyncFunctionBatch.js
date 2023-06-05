class BachJobWithConcurrency{
    /**
     * 
     * @param {[]} items which is an array of the items to be passed in the @param {{}} func
     * @param {*} concurrency which is the number of items to run concurrently or to execute in parallel
     * @param {*} func - the function to execute
     */
    constructor(items, concurrency, func){
        this.items = items;
        this.concurrency = concurrency;
        this.func = func;
    }

    async run(){
        const runner = async () => {
            let running = true;
            do {
                const item = this.items.shift();
                if(item === undefined){
                    running = false;
                    break;
                }
                await this.func(item);
            } while (running)
        };

        await Promise.all(Array(this.concurrency).fill(0).map(runner));
    }
}

export default BachJobWithConcurrency;