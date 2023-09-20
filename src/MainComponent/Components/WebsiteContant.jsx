import React, { useEffect, useState } from 'react'

function WebsiteContant() {
    const [countdown, setCountdown] = useState({
        days: 30,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const interval = setInterval(() => {
            if (countdown.seconds > 0) {
                setCountdown({
                    ...countdown,
                    seconds: countdown.seconds - 1,
                });
            } else if (countdown.minutes > 0) {
                setCountdown({
                    ...countdown,
                    minutes: countdown.minutes - 1,
                    seconds: 59,
                });
            } else if (countdown.hours > 0) {
                setCountdown({
                    ...countdown,
                    hours: countdown.hours - 1,
                    minutes: 59,
                    seconds: 59,
                });
            } else if (countdown.days > 0) {
                setCountdown({
                    ...countdown,
                    days: countdown.days - 1,
                    hours: 23,
                    minutes: 59,
                    seconds: 59,
                });
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [countdown]);

    return (
        <>
            <section id="home" className="hero_section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div>
                                <h1 className="section_heading">First step to invest in crypto</h1>
                                <p className="para">Welcome to Ok Dream 25, the world’s first 100% decentralise platform for everyone to invest &amp; earn profit with multi-trading assets.</p>
                                <div className="hero_table">

                                </div>
                                <div className="time_counter_div">
                                    <h3>Phase 1 ends in:</h3>
                                    <div>
                                        <div id="countdown">
                                            <ul className="countdown">
                                                <li><span className="time_num" id="days"> {countdown.days}</span>days</li>
                                                <li><span className="time_num" id="hours">  {countdown.hours}</span>Hours</li>
                                                <li><span className="time_num" id="minutes"> {countdown.minutes}</span>Minutes</li>
                                                <li><span className="time_num" id="seconds">{countdown.seconds}</span>Seconds</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="time_counter_div">
                                    <h3>Join the Ok Dream 25 Community</h3>
                                    <div>
                                        <div>
                                            <ul className="header_socail_icons">
                                                <li><a href="#"><i className="fa fa-twitter" /></a></li>
                                                <li><a href="https://t.me/OkDream_in" target="_blank"><i className="fa fa-telegram" /></a></li>
                                                <li><a href="#"><i className="fa fa-instagram" /></a></li>
                                                <li><a href="#"><i className="fa fa-linkedin" /></a></li>
                                                <li><a href="#"><i className="fa fa-facebook" /></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="home-banner-left">
                                <img className="img-fluid" src="https://hammertradex.com/public/video_gif.gif" alt />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default WebsiteContant;