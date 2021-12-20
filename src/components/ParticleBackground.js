import React from "react";
import { Particles } from "react-tsparticles";

const ParticleBackground = ({ gifX, chatbox, size }) => {
    const catGifURL =
        "https://media.giphy.com/media/P9tXiU2qcW8PcEFDfq/giphy.gif";
    const rainbowGifURL =
        "https://media.giphy.com/media/U3K7MEs1Mw6ulqi3M7/giphy.gif";

    const gifs = [];
    for (let i = 0; i < size; i++) {
        gifs.push(
            <img
                src={rainbowGifURL}
                alt="cat gif"
                style={{ padding: "0", margin: "0" }}
            />
        );
    }

    gifs.push(
        <img
            src={catGifURL}
            alt="cat gif"
            style={{ padding: "0", margin: "0" }}
        />
    );

    return (
        <>
            {!chatbox && (
                <div
                    style={{
                        position: "absolute",
                        top: "40%",
                        left: `${gifX}%`,
                        width: "40%",
                        zIndex: "10",
                        display: "flex",
                        flexDirection: "row",
                    }}
                >
                    {gifs}
                </div>
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
        </>
    );
};

export default ParticleBackground;
