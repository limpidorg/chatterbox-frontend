import React from "react";
import "./index.css"
import { Queue } from "./queue"

export class Alert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            alerts: {},
            alertStack: [],
            alertQueue: new Queue(),
            stackLevel: 0,
            developerMode: false,
            presentBlockTime: 100,
            dismissBlockTime: 0
        };
        window.$alert = this
    }


    componentDidMount() {

    }

    handlerProxy(identifier, actionIndex) {
        const { alerts } = this.state
        const currentAlert = alerts[identifier];
        if (!currentAlert) {
            return;
        }
        if (currentAlert.preventHandlerCalls === true) {
            return;
        }
        if (currentAlert.allowMultipleClicks === false) {
            currentAlert.preventHandlerCalls = true;
        }
        this.asyncCall(
            currentAlert.actions[actionIndex].handler,
            identifier,
            actionIndex
        ).then((dismiss) => {
            if (dismiss === false) {
                currentAlert.preventHandlerCalls = false;
                return;
            }
            this.dismiss(identifier, { immediately: true });
            // Important Notes:
            // The reason why we want to dismiss immediately here:
            // - The handler takes quite a bit of time to execute
            // - In the handler, it will usually present other alerts - this adds to the queue - and we are waiting for the handler to return a result before we actually dismiss the previous one.
            // - We don't want to wait for the new alert to appear before dismissing the previous one - it will be ugly and the user will see twice the shadow flashing for [this.dismissBlockTime].
        });
    }


    getActionStyleClassess(type, identifier, actionIndex) {
        const ActionStyles = {
            normal: ["normal"],
            cancel: ["normal"],
            destructive: ["destructive"],
        };
        const classess = ActionStyles[type];
        const { alerts } = this.state
        if (alerts[identifier].defaultAction === actionIndex) {
            classess.push("defaultAction");
        } else {
            classess.push("normalAction");
        }
        return classess.join(" ");
    }


    getCancelAction(actions) {
        this.doNothing()
        let decidedAction = null;
        for (let actionIndex = 0; actionIndex < actions.length; actionIndex++) {
            if (actions[actionIndex].type === "cancel") {
                decidedAction = actionIndex;
                break;
            }
        }
        return decidedAction;
    }

    async asyncCall(fx, ...args) {
        return (async () => {
            return fx(...args); // Will resolve immediately if the function is not async, or otherwise will resolve when the async function resolves.
        })().catch((e) => {
            // Using this method so that that fx is wrapped with an async function and its error is always handled within this function.
            if (this.developerMode) {
                this.present(
                    "[Developer] An internal error occured with the alertbox handler.",
                    `While executing the alert action handler: ${fx}
                    
                    ${e}
                    
                    This has been printed in the console."`
                );
            }
        });
    }

    async dismiss(_identifier = null, { immediately = false } = {}) {
        const prom = new Promise((resolve) => {
            const executeDismiss = () => {
                const { alerts, alertStack, alertQueue } = this.state

                let identifier = _identifier
                if (_identifier === null) {
                    identifier = alertStack[alertStack.length - 1]; // Defaults to the last alert
                }

                if (alerts[identifier] === undefined) {
                    alertQueue.dequeue();
                    resolve(false);
                    return;
                }

                identifier = parseInt(identifier, 10);

                const alertsCopy = { ...alerts }
                delete alertsCopy[identifier]

                const alertStackCopy = [...alertStack]
                alertStackCopy.splice(alertStackCopy.indexOf(identifier), 1);

                this.setState({
                    // alerts: alertsCopy, // not updating immediately for the sack of animation
                    alertStack: alertStackCopy
                });
                const { dismissBlockTime } = this.state
                this.setState({
                    alerts: alertsCopy,
                })
                setTimeout(() => {
                    alertQueue.dequeue();
                    resolve(true);
                }, dismissBlockTime);


                // Checks if the stackLevel can be resetted.
                if (Object.keys(alerts).length === 0) {
                    // Resets the stackLevel when there is no more active alerts
                    this.setState({
                        stackLevel: 0
                    })
                }
            };
            const { alertQueue } = this.state
            if (immediately) {
                // executeDismiss(); Not supported in React
                alertQueue.queue(executeDismiss, immediately);
            } else {
                alertQueue.queue(executeDismiss, immediately);
            }
        });
        return prom;
    }

    dismissInline(identifier) {
        // When the user chooses to dismiss the alert, we want to do so immediately.
        this.dismiss(identifier, { immediately: true })
    }



    async present(
        title,
        message,
        // type supports destructive, normal and cancel
        actions = [
            {
                title: "OK",
                handler: null,
                type: "cancel",
            },
        ],
        {
            defaultAction = null, // If defaultAction is null and a cancel action is present, then that first cancel action becomes the default. Otherwise, the alert can not be dismissed via enter.
            defaultEscapeAction = null, // If null and a cancel action is present, then that first cancel action becomes the default. Otherwise, the alert can not be dismissed via esc.
            preventKeyboard = true,
            allowMultipleClicks = false,
            immediately = false,
        } = {}
    ) {
        const prom = new Promise((resolve) => {
            const identifier = Math.floor(Math.random() * 10000000);
            const executePresent = (() => {
                const { presentBlockTime } = this.state
                const actionsCopy = [...actions]

                for (let i = 0; i < actionsCopy.length; i++) {
                    if (actionsCopy[i].type === "cancel") {
                        actionsCopy[i].handler = () => {
                            this.dismissInline(identifier);
                        };
                    }
                }

                const { stackLevel } = this.state
                const newStackLevel = stackLevel + 1;

                const { alerts } = { ...this.state };
                const alertsCopy = { ...alerts };
                alertsCopy[identifier] = {
                    identifier,
                    title,
                    message,
                    stackLevel: newStackLevel,
                    actions: actionsCopy,
                    defaultAction:
                        defaultAction != null
                            ? defaultAction
                            : this.getCancelAction(actions),
                    defaultEscapeAction: (defaultEscapeAction || this.getCancelAction(actions)),
                    preventKeyboard,
                    preventHandlerCalls: false,
                    allowMultipleClicks,
                }

                const { alertStack } = this.state
                const alertStackCopy = [...alertStack, identifier];

                // const newAlertAnimationStyles = { ...alertAnimationStyles };
                // newAlertAnimationStyles[identifier] = {
                //     opacity: 0,
                //     transform: "scale(1.2)",
                //     transition: "all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1)"
                // }

                this.setState({
                    alerts: alertsCopy,
                    stackLevel: newStackLevel,
                    alertStack: alertStackCopy,
                    // alertAnimationStyles: newAlertAnimationStyles,
                })
                // setTimeout(() => {
                //     // A seperate timeout is used so that the animation can be seen.
                //     delete newAlertAnimationStyles[identifier]
                //     // Finally, remove the style
                //     this.setState({
                //         alertAnimationStyles: newAlertAnimationStyles
                //     })
                // }, 300);

                setTimeout((() => {
                    const { alertQueue } = this.state
                    alertQueue.dequeue();
                    resolve(identifier);
                }), presentBlockTime);

            })
            const { alertQueue } = this.state
            if (immediately) {
                // executePresent(); Not supported in React
                alertQueue.queue(executePresent);
            } else {
                alertQueue.queue(executePresent);
            }
        });
        return prom;
    }

    doNothing() {
        // Do nothing
        (() => { })(this)
    }



    render() {
        const { alerts } = this.state
        return (
            <div> {
                Object.entries(alerts).map((entry) => {
                    const identifier = entry[0]
                    const alert = entry[1]
                    return (
                        <div key={identifier} style={{
                            zIndex: 100000000 + (alert.stackLevel ? alert.stackLevel : 0),
                        }} className="alert-transition alert-shadow" >
                            <div className="alert-contentbox">
                                <div className="alert-content">
                                    <div className="alert-title-message">
                                        <div className="alert-title">{alert.title}</div>
                                        <div className="alert-message">{alert.message}</div>
                                    </div>
                                    <div className="alert-actions" style={alert.actions.length === 2 ? {
                                        flexDirection: "row",
                                        justifyContent: "space-evenly",
                                        flexWrap: "wrap"
                                    } : {
                                        flexDirection: "column",
                                    }}>
                                        {alert.actions.map((action, index) => {
                                            return (
                                                <div className="alert-action" key={index} style={
                                                    (index === alert.actions.length - 1 && alert.actions.length !== 2) ? {
                                                        borderRadius: "0 0 1em 1em"
                                                    } : {}
                                                }>
                                                    <div className={`alert-action-inner ${this.getActionStyleClassess(action.type, identifier, index)}`} style={(alert.actions.length === 2) ? { borderLeft: '0.1px solid rgba(0,0,0,0.1)' } : {}} onClick={() => {
                                                        this.handlerProxy(identifier, index)
                                                    }} role="none" onKeyDown={() => { }}>
                                                        {action.title}
                                                    </div>

                                                </div>
                                            )
                                        })}

                                    </div>
                                </div>
                            </div>


                        </div>
                    )
                })
            } </div>
        );
    }

}