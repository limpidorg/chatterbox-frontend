import React, { useState } from "react";
import { useHistory } from "react-router";
import { Connection } from "../lib/apiconnect"
import 'boxicons'
import "../common.css"


import {
    Centered,
    Container,
    FormContainer,
    FormField,
    FormGroup,
    Illustration,
} from "./styled/Home.styled";




const Home = () => {

    const [discord, setDiscord] = useState("");
    const [invalidDiscordTag, setInvalidDiscordTag] = useState(false);
    const [hasJoinedDiscord, setHasJoinedDiscord] = useState(true);
    const [loading, setLoading] = useState(null);
    const reactHistory = useHistory()

    const isDiscordTagInvalid = (value) => {
        if (value === "" || value.match(/^.+#[0-9]{4}$/) !== null) {
            return false;
        } else {
            return true;
        }
    };

    const handleChange = (ev) => {
        const newValue = ev.target.value;
        setDiscord(newValue);
        // Parse tag
        setInvalidDiscordTag(isDiscordTagInvalid(newValue));
    };

    const handleSubmission = () => {
        setLoading("Verifying your discord tag...");
        if(isDiscordTagInvalid(discord) === true) {
            window.$alert.present("Invalid discord tag", "Please enter a valid discord tag.", [
                {
                    title: "OK",
                    type: "normal",
                    handler: () => {
                        setLoading(null);
                    }
                }
            ], {
                defaultAction: 0
            });
            return
        }
        Connection.emit('discord-verification', {
            discordId: discord
        }).then((res) => {
            setHasJoinedDiscord(res.hasJoinedDiscord);
            setLoading("Starting a new session...")
            Connection.newSession(discord).then((sessionInfo) => {
                setLoading(`Connecting to session ${sessionInfo.sessionId}`)
                reactHistory.push("/waiting-room")
            }).catch(()=>[
                window.$alert.present("Error", "An error occured while starting a new session.", [
                    {
                        title: "OK",
                        type: "normal",
                        handler: () => {
                            setLoading(null);
                        }
                    }
                ])
            ])
        }).catch(()=>[
            window.$alert.present("Something went wrong", "Your discord tag does not seem to be valid. Please try again.")
        ]).then(()=>{
            setLoading(null);
        })
    };


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
                        YES, venting is cool here! Talk about anyone or anything{" "}
                        <span>confidently</span>!<br />
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
                                        onChange={handleChange}
                                        style={
                                            invalidDiscordTag
                                                ? { border: "2px solid red" }
                                                : {}
                                        }
                                        onKeyDown={(ev) => {
                                            if (ev.key === "Enter") {
                                                handleSubmission();
                                            }
                                        }}
                                    />
                                </FormGroup>

                                <button
                                    type="button"
                                    onClick={handleSubmission}
                                    style={{
                                        cursor: "pointer",
                                    }}
                                >
                                    <i className="fas fa-angle-double-right" />
                                </button>
                                {!hasJoinedDiscord && (
                                    <a
                                        href="/"
                                        style={{
                                            color: "red",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        You must join our discord to make it work!
                                    </a>
                                )}
                            </FormContainer>
                            <br />
                            <a href="/waiting-room">Continue without discord</a>
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
};

export default Home;
