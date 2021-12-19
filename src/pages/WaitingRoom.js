import React from "react";
import { withRouter } from "react-router";
import { Connection } from "../lib/apiconnect";

class WaitingRoom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: "Loading for your active chat..."
        }
        const { history } = this.props

        Connection.updateHistory(history)
        Connection.updateHistory(props.history)
        // Check for the validity of current session

        Connection.resumeSession().then((sessionInfo) => {
            if (sessionInfo.chatId) {
                this.joinChat(sessionInfo.chatId)
            } else {
                this.matchChat().then((chatId) => {
                    this.joinChat(chatId)
                }).catch((e) => {
                    Connection.destroySession(Connection.sessionId).then(() => {
                        window.$alert.present("We couldn't find a match for you.", `Try creating a new session. Message: ${e.message}`, [
                            {
                                title: "OK",
                                type: "normal",
                                handler: () => {
                                    history.replace("/")
                                }
                            }
                        ])

                    })
                })
            }
        }).catch(() => {
            history.replace("/")
            window.$alert.present("Invalid Session", "You session is no longer active. Please create a new session.")
        })
    }

    joinChat(chatId) {
        this.setState({
            loading: `Connecting to chat # ${chatId}`
        })
        Connection.joinChat(chatId).then(() => {

        })
    }

    async matchChat() {
        return new Promise((resolve, reject) => {
            this.setState({
                loading: "Matching you with another user..."
            })
            Connection.on('new-chat-found', (res) => {
                resolve(res.chatId)
            })
            Connection.emit("new-chat-request").then(() => {
                this.setState({
                    loading: "Request sent successfully. Waiting for a match..."
                })
            }).catch((e) => {
                reject(e)
            })
        })

    }

    render() {
        const { loading } = this.state
        return (
            <div>
                <div>Waiting Room</div>
                <p>
                    {loading}
                </p>
            </div>
        )
    }
}


export default withRouter(WaitingRoom)
