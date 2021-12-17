import React, { useState } from "react";
import { Center, Container, FormField, FormGroup } from "./styled/Home.styled";

const Home = () => {
    const [discord, setDiscord] = useState("");

    const handleChange = (ev) => {
        setDiscord(ev.target.value);
    };

    return (
        <Container>
            <Center>
                <h1>
                    Chatterbox, chat
                    <br />
                    <span>anonymously</span>
                </h1>

                <p>
                    YES, venting is cool here! Talk about anyone or anything{" "}
                    <span>confidently</span>!<br />
                    Avoid your family or friends with us :)
                </p>

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
            </Center>
        </Container>
    );
};

export default Home;
