import React, { useEffect, useState, useRef } from 'react';
// import { baseURL, token } from '../../token';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DashBoard from '../DashBoard';
import { useToasts } from 'react-toast-notifications';
import { forgotPassword } from '../../ApiHelpers';

function Forget() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const newPassRef = useRef(null);
    const conPassRef = useRef(null);

    const { addToast } = useToasts();    
    const handleSubmit = async (e) => {
        e.preventDefault();
        let email = e.target.email.value;        
        var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if(!validRegex.test(email) || !email){
            addToast("Please provide a valid email", {appearance: "error",autoDismiss: true});
            return;
        }
        try{
            setLoading(true);
            let result = await forgotPassword({email});                                        
            setEmail('');
            addToast(result.message, {appearance: "success",autoDismiss: true});         
            setLoading(false);
        }catch(err){  
            setLoading(false);
            if(err.code == "ERR_NETWORK"){
                addToast(err.message, {appearance: "error",autoDismiss: true});
            }   
            else if(err.code == "ERR_BAD_REQUEST"){
                addToast(err.response.data.error, {appearance: "error",autoDismiss: true});
            }
            else if(err.response.status){
                addToast(err.response.data, {appearance: "error",autoDismiss: true});
            }
        }
    }
   

    useEffect(() => {
        // Simulate a delay to showcase the loading animation
        setTimeout(() => {
            setLoading(false);
        }, 5); // Change the delay as needed
    }, []);

    return (
        <>
            <div className={`fade-in ${loading ? '' : 'active'}`}>
                <div className="start-box"><div id="stars" /><div id="stars2" /><div id="stars3" /></div>
                <div style={{ backgroundColor: 'black' }} className="dflex">

                    <div className="dLeft" style={{ borderRadius: 30 }}>
                        <div className="start-box"><div id="stars" /><div id="stars2" /><div id="stars3" /></div>
                        <div className="form_box">
                            <div className="loginForm">
                                {/* <img src='../component/public/WhatsApp.png' alt='image'/> */}
                                <h4 style={{ color: 'white', textAlign: 'center' }}>Forget Password</h4>
                                <div className={`fade-in ${loading ? '' : 'active'}`}>
                                    <p style={{ color: 'white', textAlign: 'center' }}>{message}</p>
                                    {step === 1 && (
                                    <form method='post' onSubmit={handleSubmit}>
                                        <div className="loginAction wow flipInX" style={{ visibility: 'visible', animationName: 'flipInX' }}>
                                            {/* Step 1: Enter Email and Send OTP */}
                                            <input
                                                type="text"
                                                name="email"
                                                placeholder="Enter Email"
                                                className="form-control"
                                                required="username"        
                                                value={email}                                                                                        
                                                onChange={(e)=>setEmail(e.target.value)}
                                                style={{ borderRadius: 15, paddingLeft: 15, fontWeight: 'bold' }}
                                            />
                                            {loading ? <button style={{ padding: '10px', width: '100%', borderRadius: '5px', marginTop: '0.5em', backgroundColor: 'rgb(195 161 119)', border: 'none' }}>Processing...</button> : <button type='submit' style={{ padding: '10px', width: '100%', borderRadius: '5px', marginTop: '0.5em', backgroundColor: 'rgb(195 161 119)', border: 'none' }}>Forgot Password</button>}
                                        </div>
                                    </form>
                                    )}
                                    {step === 2 && (
                                        <div className="step2">
                                            {/* Step 2: Enter OTP */}
                                            <input
                                                type="text"
                                                name="otp"
                                                placeholder="Enter OTP"
                                                className="form-control"
                                                required="otp"
                                                
                                                style={{ borderRadius: 15, paddingLeft: 15, fontWeight: 'bold' }}
                                            />
                                            <button style={{ padding: '10px', width: '100%', borderRadius: '5px', marginTop: '0.5em', backgroundColor: 'rgb(195 161 119)', border: 'none' }} >Verify OTP</button>
                                        </div>
                                    )}
                                    {step === 3 && (
                                        <div className="step3">
                                            {/* Step 3: Change Password */}
                                            <form >
                                                <div className="input_box_div">
                                                    <label htmlFor="new_pass">New password:</label>
                                                    <input
                                                        className="input_box"
                                                        type="password"
                                                        name="new_pass"
                                                        placeholder="New password"
                                                        required
                                                    />
                                                </div>
                                                <div className="input_box_div">
                                                    <label htmlFor="con_pass">Confirm password:</label>
                                                    <input
                                                        className="input_box"
                                                        type="password"
                                                        name="con_pass"
                                                        
                                                        placeholder="Confirm password"
                                                        required
                                                    />
                                                </div>
                                                <div className="dash_second_col_third" >
                                                    <input style={{ padding: '10px', width: '100%', borderRadius: '5px', marginTop: '0.5em', backgroundColor: 'rgb(195 161 119)', border: 'none' }} type="submit" className="button_submit" defaultValue="Update" />
                                                </div>
                                            </form>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Forget;