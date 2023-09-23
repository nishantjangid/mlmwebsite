import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import { login } from '../../ApiHelpers';



function Login() {
    const navigate = useNavigate();
    const { addToast } = useToasts();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let email = e.target.email.value;
        let password = e.target.password.value;
        var validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if(!validRegex.test(email) || !email){
            addToast("Please provide a valid email", {appearance: "error",autoDismiss: true});
            return;
        }
        if(!password){
            addToast("Please provide a password", {appearance: "error",autoDismiss: true});
            return; 
        }
        try{
            let result = await login({email,password});                        
                let data = result.result;
                localStorage.setItem('user',JSON.stringify(data.user));
                localStorage.setItem('authToken',data.token);
                addToast("You are logged in", {appearance: "success",autoDismiss: true}); 
                navigate("/");            
        }catch(err){  
            console.log(err);
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

    return (
        <>
            {

                <div style={{ height: "100vh" }} className={`fade-in active'}`}>
                    <div className="start-box"><div id="stars" /><div id="stars2" /><div id="stars3" /></div>
                    <div style={{ backgroundColor: 'black' }} className="dflex">
                        <div className="dLeft" style={{ borderRadius: 30 }}>
                            <div className="start-box"><div id="stars" /><div id="stars2" /><div id="stars3" /></div>

                            <div className="flex justify-center wow fadeInDown" style={{ visibility: 'visible', animationName: 'fadeInDown' }}>
                                {/* <img src="https://hammertradex.com/public/front/assets/img/htx-logo.png" style={{ width: 200 }} alt="Logo" /> */}
                                </div>
                            <div className="container">
                                <div className="form_box">
                                    <div className="loginForm">
                                        <h4 style={{ color: 'rgb(195 161 119)', marginBottom: '20px', textAlign: 'center', fontSize: "30px" }}>User Panel</h4>
                                        <form method="post" onSubmit={handleSubmit}>
                                            <div className="field-group wow fadeInUp" style={{ visibility: 'visible', animationName: 'fadeInUp' }}>
                                                <input  type="text" name="email" placeholder="Enter Email" id="identity" style={{ borderRadius: 15, paddingLeft: 15, fontWeight: 'bold' }} required/>
                                            </div>

                                            <div style={{ clear: 'both' }} />


                                            <div className="field-group wow fadeInUp" style={{ visibility: 'visible', animationName: 'fadeInUp', marginBottom: "2px" }}>
                                                <input   name="password" id="password" type="password" placeholder="Enter Password" required style={{ borderRadius: 15, paddingLeft: 15, fontWeight: 'bold' }} />
                                            </div>

                                            <p style={{ color: 'rgb(195 161 119)', cursor: 'pointer', textAlign: 'left', background: 'none', marginBottom: "9px" }}  >Forget Password</p>
                                           
                                            <div className=" wow flipInX" style={{ visibility: 'visible', animationName: 'flipInX' }}>
                                                <input style={{ marginTop: '30px !important', backgroundColor: 'rgb(195 161 119)', border: 'none' }} type="submit" name="submit" id className="btn-default btn-block form_submit_btn" />
                                            </div>

                                            <div className="signup_btn">
                                                <p>Don't have an account?</p>
                                                <span style={{ cursor: 'pointer' }} className='' onClick={() => navigate("/register")}> SignUp
                                                </span>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            }
        </>
    )
}

export default Login


