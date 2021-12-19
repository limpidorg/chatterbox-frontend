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
            console.log("ResumeSession")
            if (sessionInfo.activeChat) {
                this.setState({
                    loading: `Connecting to chat # ${sessionInfo.activeChat}`
                })
                Connection.joinChat(sessionInfo.activeChat).then(() => {

                })
            } else {
                this.setState({
                    loading: "Matching you with another user..."
                })
                Connection.on('new-chat-found', (res) => {
                    const { chatId } = res
                    this.setState({
                        loading: `Connecting to chat # ${chatId}`
                    })
                    Connection.joinChat(chatId).then(() => {

                    })
                })
                Connection.emit("new-chat-request").then(() => {
                    this.setState({
                        loading: "Request sent successfully. Waiting for a match..."
                    })
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
