import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Style.css';
import brand from "../../Okdream25.png";

function FeaturePage() {
    const navigate = useNavigate();
    const handlesignup = () => {
        navigate('/registrationpage');
    }
    return (
        <>
            <section className="who_are_section ">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 who_we_img_col wow slideInLeft animated" style={{ visibility: 'visible' }}>
                            <img style={{ maxWidth: '50%' }} className="img-fluid" src={brand} alt />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 who_we_content_col mt-5 wow slideInRight  animated" style={{ visibility: 'visible' }}>
                            <h5 className>Who We are</h5>
                            <h1 className>The World’s <span className="color_span"> 1st ICO</span> Platform That Offers Rewards</h1>
                            <p className="para" style={{ marginBottom: 61 }}>The World’s 1st ICO Platform That Offers Rewards and The platform helps investors to make easy to purchase and sell their tokens</p>
                            <a className="btns header_btn_hover" target="_blank" onClick={handlesignup}>Sign Up <i className="fa fa-angle-right" /></a>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default FeaturePage;