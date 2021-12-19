export class Queue {
    constructor() {
        this.internal_queue = [];
        this.autoDequeue = true;
    }

    queue(callback) {
        this.internal_queue.push(callback);
        if (this.autoDequeue) {
            this.autoDequeue = false;
            this.dequeue();
        }
    }

    dequeue() {
        // console.log('dequeue', this.internal_queue);
        if (this.internal_queue.length > 0) {
            const item = this.internal_queue.shift();
            // alert("Queue");
            item();
        } else {
            this.autoDequeue = true;
        }
    }
}
