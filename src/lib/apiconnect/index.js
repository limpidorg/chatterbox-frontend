import io from "socket.io-client";

const DEVELOPER_MODE_NO_REDIRECT = false;

function storeSessionId(id) {
    localStorage.setItem("sessionId", id);
}

function retrieveSessionId() {
    return localStorage.getItem("sessionId");
}

class APIConnection {
    constructor({ APIEndpoint = "http://localhost:5051" } = {}) {
        this.APIEndpoint = APIEndpoint;
        this.socket = io(this.APIEndpoint);
        this.connected = false;
        this.postConnectionHooks = [];
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
            console.log("Connected to the server");
            this.connected = true;
            let i = 0;
            for (i = 0; i < this.postConnectionHooks.length; i++) {
                this.postConnectionHooks[i]();
            }
        });
        this.socket.on("disconnect", () => {
            this.connected = false;
            console.log("Disconnected from server");
        });
        this.hooks = {};
        this.sessionId = null;
        this.history = null;
    }

    async updateHistory(history) {
        this.history = history;
    }

    async navigate(path) {
        if (DEVELOPER_MODE_NO_REDIRECT) {
            // Dev
            return;
        }
        if (this.history) {
            this.history.replace(path)
        } else {
            window.location.href = path;
        }
    }

    async attemptToResumeSession() {
        this.resumeSession().then(() => {
            // window.$alert.present("Do you want to return to your previous session?", "Pressing no will destroy the previous session and all your previously-entered personal information to keep your identity secure.", [
            //     {
            //         title: "No",
            //         type: "destructive",
            //         handler: () => {
            //             this.destroySession(sessionInfo.sessionId);
            //         }
            //     }, {
            //         title: "Yes",
            //         type: "normal",
            //         handler: () => {
            //             this.navigate(`/waiting-room`)
            //         }
            //     }
            // ])
            this.navigate(`/waiting-room`)
        }).catch(() => {
            console.log("Session not found")
        })
    }

    async attemptToResumeChat() {
        this.resumeSession()
            .then(() => {
                // Resume Chat
            })
            .catch(() => {
                window.$alert.present(
                    "The session is no longer active",
                    "Please start a new session.",
                    [
                        {
                            title: "OK",
                            type: "normal",
                            handler: () => {
                                this.navigate(`/`);
                            },
                        },
                    ]
                );
            });
    }

    async destroySession(sessionId) {
        this.emit("destroy-session", {
            sessionId,
        });
    }

    async joinChat(chatId) {
        return this.emit("join-chat", {
            chatId
        })
    }

    async leaveChat(chatId) {
        return this.emit("leave-chat", {
            chatId
        })
    }


    async resumeSession() {
        const sessionResponse = await this.emit("resume-session", {
            sessionId: retrieveSessionId(),
        });
        this.sessionInfo = sessionResponse.sessionInfo;
        this.sessionId = sessionResponse.sessionId;
        storeSessionId(sessionResponse.sessionId);
        return sessionResponse.sessionInfo;
    }

    async newSession(discordId) {
        const sessionResponse = await this.emit("new-session", {
            discordId: discordId || null,
        });
        this.sessionInfo = sessionResponse.sessionInfo;
        storeSessionId(this.sessionInfo.sessionId);
        return sessionResponse.sessionInfo;
    }

    async emit(event, data = {}) {
        this.sessionId = retrieveSessionId();
        return new Promise((resolve, reject) => {
            let sendData = data;
            if (data.sessionId === undefined) {
                sendData = {
                    ...data,
                    sessionId: this.sessionId,
                };
            }

            const emitToSocket = () => {
                this.socket.emit(event, sendData, (response) => {
                    if (response) {
                        if (response.code < 0) {
                            reject(response);
                        } else {
                            // The server acknowledges the message and it was sent successfully
                            resolve(response);
                        }
                    } else {
                        resolve();
                    }
                });
            };

            if (!this.connected) {
                this.postConnectionHooks.push(() => {
                    // window.$alert.present("You are not connected to the server.", "Please try again later.")
                    // reject()
                    emitToSocket();
                });
            } else {
                emitToSocket();
            }
        });
    }

    on(event, callback) {
        this.socket.on(event, (data) => {
            callback(data); // Process data here
        });
    }

    onNewMessage(handler) {
        if (this.hooks.onNewMessage) {
            this.hooks.onNewMessage.push(handler);
        } else {
            this.hooks.onNewMessage = [handler];
        }
    }

    async sendMessage(message) {
        const identifier = Math.random().toString(36).substring(2, 15);
        return this.emit("message", {
            message,
            identifier,
        });
    }
}

export { APIConnection };

const Connection = new APIConnection();
export { Connection };
