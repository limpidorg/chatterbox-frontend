import React from "react";
import { Particles } from "react-tsparticles";
import { GifContainer } from "./styled/ParticleBackground.styled";

const ParticleBackground = ({ chatbox, gifX }) => {
    return (
        <div>
            {!chatbox && (
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
            )}

            <Particles
                id="tsparticles"
                options={{
                    background: {
                        color: {
                            value: "#043564",
                        },
                    },
                    fullScreen: {
                        zIndex: 1,
                    },
                    interactivity: {
                        events: {
                            onClick: {
                                enable: true,
                                mode: "repulse",
                            },
                            onHover: {
                                mode: "grab",
                            },
                        },
                        modes: {
                            bubble: {
                                distance: 400,
                                duration: 2,
                                opacity: 8,
                                size: 40,
                            },
                            grab: {
                                distance: 200,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: "#ffffff",
                        },
                        links: {
                            color: {
                                value: "#ffffff",
                            },
                            distance: 150,
                            opacity: 0.4,
                        },
                        move: {
                            attract: {
                                rotate: {
                                    x: 600,
                                    y: 1200,
                                },
                            },
                            direction: "left",
                            enable: true,
                            outModes: {
                                bottom: "out",
                                left: "out",
                                right: "out",
                                top: "out",
                            },
                            speed: 6,
                            straight: true,
                        },
                        opacity: {
                            value: 0.5,
                            animation: {
                                speed: 1,
                                minimumValue: 0.1,
                            },
                        },
                        shape: {
                            options: {
                                star: {
                                    sides: 5,
                                },
                            },
                            type: "star",
                        },
                        size: {
                            random: {
                                enable: true,
                            },
                            value: {
                                min: 1,
                                max: 4,
                            },
                            animation: {
                                speed: 40,
                                minimumValue: 0.1,
                            },
                        },
                    },
                }}
            />
        </div>
    );
};

export default ParticleBackground;
