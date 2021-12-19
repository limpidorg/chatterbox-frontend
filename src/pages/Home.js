import React from "react";
import { withRouter } from "react-router";
import { Connection } from "../lib/apiconnect";
import "../common.css";

import {
    Centered,
    Container,
    FormContainer,
    FormField,
    FormGroup,
    Illustration,
} from "./styled/Home.styled";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            discord: "",
            invalidDiscordTag: false,
            hasJoinedDiscord: true,
            loading: null,
        };
        Connection.updateHistory(props.history);
        Connection.attemptToResumeSession();
    }

    handleChange(ev) {
        const newValue = ev.target.value;
        this.setState(
            {
                discord: newValue,
            },
            () => {
                this.setState({
                    invalidDiscordTag: this.isDiscordTagInvalid(),
                });
            }
        );
    }

    handleSubmission() {
        this.setState({
            loading: "Verifying your discord tag...",
            hasJoinedDiscord: true,
        });

        const { discord } = this.state;

        if (this.isDiscordTagInvalid() === true) {
            window.$alert.present(
                "Invalid discord tag",
                "Please enter a valid discord tag.",
                [
                    {
                        title: "OK",
                        type: "normal",
                        handler: () => {
                            this.setState({
                                loading: null,
                            });
                        },
                    },
                ],
                {
                    defaultAction: 0,
                }
            );
            return;
        }

        Connection.emit("discord-verification", {
            discordId: discord,
        })
            .then(() => {
                this.setState({
                    loading: "Starting a new session...",
                });

                Connection.newSession(discord)
                    .then((sessionInfo) => {
                        this.setState({
                            loading: `Connecting to session ${sessionInfo.sessionId}`,
                        });
                        const { history } = this.props;
                        history.push("/waiting-room");
                    })
                    .catch(() => [
                        window.$alert.present(
                            "Error",
                            "An error occured while starting a new session.",
                            [
                                {
                                    title: "OK",
                                    type: "normal",
                                    handler: () => {
                                        this.setState({
                                            loading: null,
                                        });
                                    },
                                },
                            ]
                        ),
                    ]);
            })
            .catch(() => {
                this.setState({
                    hasJoinedDiscord: false,
                });

                window.$alert.present(
                    "Our bot couldn't find you.",
                    "Please ensure you have at least one common server with out bot.",
                    [
                        {
                            title: "OK",
                            type: "normal",
                            handler: () => {
                                this.setState({
                                    loading: null,
                                });
                            },
                        },
                        {
                            title: "Invite the bot",
                            type: "normal",
                            handler: () => {
                                window.open(
                                    "https://discord.com/api/oauth2/authorize?client_id=921681984034598923&permissions=0&scope=bot"
                                );
                                this.setState({
                                    loading: null,
                                });
                            },
                        },
                        {
                            title: "Continue without discord",
                            type: "destructive",
                            handler: () => {
                                this.continueWithoutDiscord();
                            },
                        },
                    ]
                );
            })
            .then(() => {
                this.setState({
                    loading: null,
                });
            });
    }

    isDiscordTagInvalid() {
        const { discord } = this.state;
        if (discord === "" || discord.match(/^.+#[0-9]{4}$/) !== null) {
            return false;
        } else {
            return true;
        }
    }

    continueWithoutDiscord() {
        const { history } = this.props;
        this.setState({
            loading: "Starting a new session...",
        });
        Connection.newSession().then((sessionInfo) => {
            this.setState(
                {
                    loading: `Connecting to session ${sessionInfo.sessionId}`,
                },
                () => {
                    history.push("/waiting-room");
                }
            );
        });
    }

    render() {
        const {
            discord,
            invalidDiscordTag,
            hasJoinedDiscord,
            loading,
        } = this.state;
        return (
            <Container>
                <Centered>
                    <div>
                        <h1>
                            Chatterbox,
                            <br />
                            Chat <span>anonymously</span>
                        </h1>

                        <p>
                            YES, venting is cool here! Talk about anyone or
                            anything <span>confidently</span>!<br />
                            Avoid your family or friends with us :)
                        </p>

                        {loading !== null ? (
                            <div>
                                <div>{loading}</div>
                            </div>
                        ) : (
                            <div>
                                <FormContainer>
                                    <FormGroup>
                                        <span>
                                            <i className="fab fa-discord" />
                                        </span>
                                        <FormField
                                            className="form-field"
                                            type="text"
                                            maxLength={40}
                                            placeholder="Enter your discord tag"
                                            value={discord}
                                            onChange={(event) => {
                                                this.handleChange(event);
                                            }}
                                            style={
                                                invalidDiscordTag
                                                    ? {
                                                          border:
                                                              "2px solid red",
                                                      }
                                                    : {}
                                            }
                                            onKeyDown={(ev) => {
                                                if (ev.key === "Enter") {
                                                    this.handleSubmission();
                                                }
                                            }}
                                        />
                                    </FormGroup>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            this.handleSubmission();
                                        }}
                                        style={{
                                            cursor: "pointer",
                                        }}
                                    >
                                        <i className="fas fa-angle-double-right" />
                                    </button>
                                </FormContainer>
                                {!hasJoinedDiscord && (
                                    <div
                                        href="/"
                                        style={{
                                            color: "red",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        You must join our discord to make it
                                        work!
                                    </div>
                                )}
                                <br />
                                <div
                                    onClick={() => {
                                        this.continueWithoutDiscord();
                                    }}
                                    role="none"
                                    className="navigation"
                                >
                                    Continue without discord
                                </div>
                            </div>
                        )}
                    </div>

                    <div>
                        <Illustration
                            src={`${process.env.PUBLIC_URL}/images/home-illustration.svg`}
                        />
                    </div>
                </Centered>
            </Container>
        );
    }
}

export default withRouter(Home);
