import React, { useState } from "react";
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
    const [hasJoinedDiscord, setHasJoinedDiscord] = true;

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
        if (isDiscordTagInvalid(discord)) {
            window.$alert.present(
                "Your discord tag doesn't seem to be valid.",
                "Please double check."
            );
        } else {
            fetch("url", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ discordTag: discord }),
            })
                .then((r) => r.json())
                .then((json) => {
                    setHasJoinedDiscord(json.hasJoinedDiscord);
                    return 0;
                });
        }
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
                    </FormContainer>

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
                    <br />
                    <a href="/">Continue without discord</a>
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
