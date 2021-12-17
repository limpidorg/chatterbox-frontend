import React, { useState } from "react";
import {
    Container,
    FormField,
    FormGroup,
    Illustration,
} from "./styled/Home.styled";

const Home = () => {
    const [discord, setDiscord] = useState("");

    const handleChange = (ev) => {
        setDiscord(ev.target.value);
    };

    return (
        <Container>
            <div>
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
            </div>

            <div>
                <Illustration
                    src={`${process.env.PUBLIC_URL}/images/home-illustration.svg`}
                />
            </div>
        </Container>
    );
};

export default Home;
