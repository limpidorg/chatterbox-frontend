import io from 'socket.io-client';


function storeSessionId(id) {
    localStorage.setItem('sessionId', id);
}

function retrieveSessionId() {
    return localStorage.getItem('sessionId');
}

class APIConnection {
    constructor({ APIEndpoint = "http://localhost:5051" } = {}) {
        this.APIEndpoint = APIEndpoint;
        this.socket = io(this.APIEndpoint);
        // Set up message handler
        this.socket.on("message", (data) => {
            // Sends ACK (i.e. Delivered)
            if (this.hooks.onNewMessage !== undefined) {
                this.hooks.onNewMessage.forEach((handler) => {
                    handler(data);
                });
            }
        });
        this.socket.on("connect", () => {
            console.log('Connected to the server');
            this.emit("session").then(res => {
                this.sessionId = res.sessionId;
                storeSessionId(this.sessionId);
            })
        })
        this.socket.on("disconnect", () => {
            console.log('Disconnected from server');
        })
        this.hooks = {};
        this.sessionId = retrieveSessionId();
    }

    async emit(event, data) {
        return new Promise((resolve, reject) => {
            const sendData = {
                ...data,
                sessionId: this.sessionId
            }
            this.socket.emit(event, sendData, (response) => {
                if (response) {
                    if (response.code < 0) {
                        reject(response)
                    } else {
                        // The server acknowledges the message and it was sent successfully
                        resolve(response);
                    }
                } else {
                    resolve();
                }
            });
        });
    }

    on(event, callback) {
        this.socket.on(event, callback);
    }

    onNewMessage(handler) {
        if (this.hooks.onNewMessage) {
            this.hooks.onNewMessage.push(handler);
        } else {
            this.hooks.onNewMessage = [handler];
        }
    }

    async sendMessage(message) {
        const identifier = Math.random().toString(36).substring(2, 15)
        return this.emit("message", {
            message,
            identifier
        })
    }
}

export { APIConnection };

const Connection = new APIConnection()
export { Connection }