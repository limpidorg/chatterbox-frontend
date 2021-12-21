import React from "react";
import { GifContainer } from "./styled/NyanCat.styled";

const NyanCat = ({ gifX }) => {
    return (
        <GifContainer
            style={{
                left: `${gifX}%`,
            }}
        >
            <img
                src="https://vincentgarreau.com/particles.js/assets/img/kbLd9vb_new.gif"
                alt="cat gif"
            />
        </GifContainer>
    );
};

export default NyanCat;
