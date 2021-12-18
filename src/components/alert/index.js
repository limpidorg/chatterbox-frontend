import React from "react";
import "./index.css"

export class Alert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alerts: {
                0: {
                    message: "Test"
                }
            },
        };
        window.$alert = this
    }

    render() {
        const { alerts } = this.state
        return (
            <div>
                {
                    Object.entries(alerts).map((entry) => {
                        const identifier = entry[0]
                        const alert = entry[1]
                        return (
                            <div key={identifier} style={{
                                position: "fixed",
                                width: "100%",
                                height: "100%",
                                top: 0,
                                left: 0,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                zIndex: 100000000 + (alert.stackLevel ? alert.stackLevel : 0),
                                background: "transparent",
                                backgroundColor: "rgba(0,0,0,0.3)"
                            }}>
                                {alert.message}
                            </div>
                        )
                    })
                }
            </div >
        );
    }

}