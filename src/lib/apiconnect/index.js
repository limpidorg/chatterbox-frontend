/* eslint-disable no-console */
import io from "socket.io-client";

const DEVELOPER_MODE_NO_REDIRECT = false;

function storeSessionId(id) {
    localStorage.setItem("sessionId", id);
}

function retrieveSessionId() {
    return localStorage.getItem("sessionId");
}

class APIConnection {
    constructor({ APIEndpoint = "https://chatterboxapis.yyjlincoln.app" } = {}) {
        this.APIEndpoint = APIEndpoint;
        this.socket = io(this.APIEndpoint);
        this.connected = false;
        this.postConnectionHooks = [];
        this.postConnectionOnce = [];
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
                // console.log('Hook', this.postConnectionHooks[i], i);
                this.postConnectionHooks[i]();
            }
            for (i = 0; i < this.postConnectionOnce.length; i++) {
                this.postConnectionOnce[i]();
            }
            this.postConnectionOnce.splice(0, i);
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
            this.history.replace(path);
        } else {
            window.location.href = path;
        }
    }

    async attemptToResumeSession() {
        this.resumeSession()
            .then(() => {
                this.navigate(`/waiting-room`);
            })
            .catch(() => {
                console.log("Session not found");
            });
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
            chatId,
        });
    }

    async leaveChat(chatId) {
        return this.emit("leave-chat", {
            chatId,
        });
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

    async newSession(discordId, name) {
        const sessionResponse = await this.emit("new-session", {
            discordId: discordId || null,
            name: name || null,
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
                this.postConnectionOnce.push(() => {
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

    async sendMessage(chatId, message) {
        return this.emit("send-message", {
            chatId,
            message,
        });
    }
}

export { APIConnection };

const Connection = new APIConnection();
export { Connection };
