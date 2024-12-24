import React, { useState } from "react";
import { Container, Row } from "react-bootstrap";
import touch from "../assets/img/get_in_touch.png";

const LetsConnect = () => {
    const [email, setEmail] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [message, setMessage] = useState("");
    const [send, setSend] = useState("Send");
    const [statusColor, setStatusColor] = useState("white");
    const [showAnimation, setShowAnimation] = useState(false);


    const formdetails = async (event) => {
        const backend = process.env.REACT_APP_BACKENDURL
        // console.log(backend)

        event.preventDefault();
        setSend("Sending...")
        try {
            const response = await fetch(backend + "/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    first_name,
                    last_name,
                    email,
                    message,
                }),
            });

            if (response.ok) {
                setSend("Sent");
                setShowAnimation(true);
                setTimeout(() => {
                    setSend("Send");
                    setStatusColor("white");
                    setShowAnimation(false);
                    resetForm();
                }, 3000);
            } else {
                setSend("Failed !!😢");
                setStatusColor("red");
                setTimeout(() => {
                    setSend("Send");
                    setStatusColor("white");
                }, 3300);
            }
        } catch (error) {
            setSend("Failed !!😢");
            setStatusColor("red");
            setTimeout(() => {
                setSend("Send");
                setStatusColor("white");
            }, 3000);
        }
    };

    const resetForm = () => {
        setEmail("");
        setFirst_name("");
        setLast_name("");
        setMessage("");
    };

    return (
        <div className="connect" id="connect">
            <Container>
                <Row>
                    <div className="pb-5 d-flex justify-content-center">
                        <form
                            xs={12}
                            md={6}
                            className="col-lg-6 animate__animated animate__fadeIn pt-3"
                            onSubmit={formdetails}
                        >
                            <div className="col-11">
                                <h1 className="head py-5">Get In Touch</h1>
                                <div className="ps-5 text-center">
                                    <div className="fields d-flex justify-content-between w-100">
                                        <input
                                            type="text"
                                            placeholder="First name"
                                            className="field inp border p-3"
                                            value={first_name}
                                            onChange={(e) => setFirst_name(e.target.value)}
                                            required
                                        />
                                        <input
                                            type="text"
                                            placeholder="Last name"
                                            className="field inp border p-3"
                                            value={last_name}
                                            onChange={(e) => setLast_name(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        className="field border col-12 p-3"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <textarea
                                        className="field p-5 px-4 pt-4 col-12 border"
                                        placeholder="Message"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                    />
                                    <div className="status-container">
                                        <button
                                            type="submit"
                                            className="letsconnect rounded col-4 w-auto"
                                            style={{ color: statusColor }}
                                        >
                                            <span >{send}</span>
                                        </button>
                                        {showAnimation && send === "Sent" && (
                                            <div className="sent-animation" style={{ color: "white", marginTop: "10px" }}>
                                                <span>✔ Email Sent Successfully!</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </form>
                        <div className="m-auto d-none d-md-block col-md-6 col-lg-6 col-xl-4 p-0">
                            <img
                                src={touch}
                                alt="Get In Touch"
                                className="getintouch "
                            />
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default LetsConnect;
