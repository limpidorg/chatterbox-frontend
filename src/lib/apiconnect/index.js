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
        })
        this.socket.on("disconnect", () => {
            console.log('Disconnected from server');
        })
        this.hooks = {};
        this.sessionId = null
    }

    async attemptToResumeSession() {
        this.resumeSession().then((sessionInfo) => {
            window.$alert.present("Do you want to return to your previous session?", "Pressing no will destroy the previous session and all your previously-entered personal information to keep your identity secure.", [
                {
                    title: "No",
                    type: "destructive",
                    handler: () => {
                        this.destroySession(sessionInfo.sessionId);
                    }
                }, {
                    title: "Yes",
                    type: "normal",
                    handler: () => {
                        window.location.href = "/waiting-room"
                    }
                }
            ])
        }).catch(() => {
            console.log("Session not found")
        })
    }

    async destroySession(sessionId) {
        this.emit("destroy-session", {
            sessionId
        }).then(() => {
            window.$alert.present("Session destroyed", "Your session has been destroyed.")
        }).catch(() => {
            window.$alert.present("We could not destroy your session", "An error occured.")
        })
    }

    async resumeSession() {
        const sessionResponse = await this.emit("resume-session", {
            sessionId: retrieveSessionId()
        })
        this.sessionInfo = sessionResponse.sessionInfo
        this.sessionId = sessionResponse.sessionId
        storeSessionId(sessionResponse.sessionId)
        return sessionResponse.sessionInfo
    }

    async newSession(discordId) {
        const sessionResponse = await this.emit("new-session", {
            discordId: discordId || null
        })
        this.sessionInfo = sessionResponse.sessionInfo
        storeSessionId(this.sessionInfo.sessionId)
        return sessionResponse.sessionInfo
    }

    async emit(event, data) {
        return new Promise((resolve, reject) => {
            let sendData = data
            if (data.sessionId === undefined) {
                sendData = {
                    ...data,
                    sessionId: this.sessionId
                }
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