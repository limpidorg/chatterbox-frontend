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
    const [hasJoinedDiscord, setHasJoinedDiscord] = true;

    const handleChange = (ev) => {
        setDiscord(ev.target.value);
    };

    const handleClick = () => {
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
                console.log(json.hasJoinedDiscord);
                setHasJoinedDiscord(hasJoinedDiscord);
                return 0;
            });
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

                    <FormContainer
                        style={{
                            marginBottom: hasJoinedDiscord ? "10px" : "0px",
                        }}
                    >
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
                            />
                        </FormGroup>

                        <button type="button" onClick={handleClick}>
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
