import React, { useState, useEffect, useContext } from 'react'
import Button from '@mui/material/Button'; // Assuming you are using Material-UI for buttons
import { TextField } from '@mui/material';

import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useToasts } from 'react-toast-notifications';
import { fundTransfer, sendOtp, verifyOtp } from '../ApiHelpers';
import { AuthContext } from '../Context/AuthContext';


function FundsTransfer() {
    const {addToast} = useToasts();
    const {userDetail,getUserDetails} = useContext(AuthContext);
    const [balance, setBalance] = useState(0);
    const [wallet, setWallet] = useState("");   //username
    const [message, setMessage] = useState("");
    const [upperInputDisabled, setUpperInputDisabled] = useState(false);
    // const [otpInput, setOtpInput] = useState("");
    const [amount, setAmount] = useState("");
    const [showOtpInput, setShowOtpInput] = useState(false);

    // State for controlling the dialog
    const [openDialog, setOpenDialog] = useState(false);
    const [otp, setOtp] = useState("");
    // const [emailverify, setEmailverify] = useState(true);
    const [emailverify, setEmailverify] = useState(false);

    // State for input field value and error message
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [data, setData] = useState([]);
    const [sending,setSending] = useState(false);


    const getUserNameByUserId = async (userId) => {
       
    };

    const fetchData = async () => {
        setMessage("");
     
    };

    useEffect(() => {
        fetchData();
        fetchcurrentamount();
    }, []);
    const handleFundTransfer = async (e) => {
        setMessage("");
        e.preventDefault();
        if(!wallet) {
            addToast("Please provide a userId", {appearance: "error",autoDismiss: true});
            return;
        }
        if(!amount || Number(amount)<=0) {
            addToast("Please provide enter a valid amount", {appearance: "error",autoDismiss: true});
            return;
        }
        // {
        //     !emailverify &&
        //         setOpenDialog(true)
        // }
        if (!emailverify) {
            setOpenDialog(true);
            return;
        }
     
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);
        // Reset email and email error state values
        // setEmail("");
        setEmailError("");
        // Reset OTP input and enable the upper input field
        setOtp("");
        setShowOtpInput(false);
        setUpperInputDisabled(false);
    };

    const handleGetOtp = async () => {
        setMessage("");
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!email || !emailPattern.test(email)) {
            setEmailError("Please enter a valid email address.");
            return;
        }

        try{
            setSending(true)
            let result = await sendOtp({email});                        
            let data = result;
            setSending(false);
            setEmailError(data.message);              
            // addToast(data.message, {appearance: "error",autoDismiss: true});
            setUpperInputDisabled(true);

            // Show the OTP input field
            setShowOtpInput(true);
            handleSendOtp(); 
        }catch(err){      
            setSending(false)        
            if(err.code == "ERR_NETWORK" || err.code == "ERR_BAD_REQUEST"){
                addToast(err.message, {appearance: "error",autoDismiss: true});
            }                
            else if(err.code == "ERR_BAD_REQUEST"){
                addToast(err.response.data.error, {appearance: "error",autoDismiss: true});                
            }  
            else if(err.response.status){
                addToast(err.response.data.error, {appearance: "error",autoDismiss: true});
            }
        }

    };

    const handleSendOtp = async () => {
        // setStep(2); // Move to OTP entry step
        setMessage("");
      
    };

    const handleVerifyOtp = async (event) => {
        event.preventDefault();
        // setStep(3)
        setEmailError("");
        try{
            setSending(true);
            let result = await verifyOtp({email,otp});                        
            let data = result;
            setSending(false);                      
            tranferFund();
        }catch(err){     
            console.log(err);         
            if(err.code == "ERR_NETWORK"){
                setEmailError(err.message);
            }   
            else if(err.code == "ERR_BAD_REQUEST"){
                setEmailError(err.response.data.error);
            }
            else if(err.response.status){
                setEmailError(err.response.data.error);
            }
        }        
        
    };

    const tranferFund = async () => {
        if(!wallet) {
            addToast("Please provide a userId", {appearance: "error",autoDismiss: true});
            return;
        }
        if(!amount || Number(amount)<=0) {
            addToast("Please provide enter a valid amount", {appearance: "error",autoDismiss: true});
            return;
        }
        handleCloseDialog();
        try{
            let result = await fundTransfer({userId:wallet,amount});                        
            let data = result;    
            addToast(data.message,{appearance: "success",autoDismiss: true});
            getUserDetails();
            setWallet('');
            setAmount('');
        }catch(err){              
            if(err.code == "ERR_NETWORK" || err.code == "ERR_BAD_REQUEST"){
                addToast(err.message, {appearance: "error",autoDismiss: true});
            }   
            else if(err.response.status){
                addToast(err.response.data.error, {appearance: "error",autoDismiss: true});
            }
        }  
    }

    const fetchcurrentamount = async () => {
        setMessage("");
      
    }

    return (
        <>
            <div className="content-wrapper" style={{ minHeight: 1016 }}>

                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="welcome_heading">Fund Transfer</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="https://hammertradex.com">Home</a></li>
                                    <li className="breadcrumb-item active">Fund Transfer</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="content">
                    <div className="container-fluid" style={{ marginTop: '-35px' }}>
                        <div className="row">
                            <div className="col-12">
                                <div className="card mt-5  dashboard_boxes_main_dark">
                                    <div className="card-body" style={{ backgroundColor: '#000000' }}>
                                        <hr />
                                        <br />
                                        <form role="form"  id="mypassform" method="post" encType="application/json">
                                            <input type="hidden" name="_token" defaultValue="1nP1Eivu6Q7kjHazoDkNoRSz830zT2SDmcSnZmAy" />
                                            <div className="form-row">
                                                <div className="col-md-12 mb-3">
                                                    <label htmlFor="validationCustomUsername" className="text-white">Available Balance</label>
                                                    <div className="input-group">
                                                        <input type="text" className="form-control input_box" value={userDetail?.mainWallet} id="validationCustomUsername" placeholder="Available Balance" aria-describedby="inputGroupPrepend" required disabled />
                                                    </div>
                                                </div>
                                                <div style={{ clear: 'both' }} />
                                                <p id="msg" style={{ fontSize: 14, fontWeight: 'bold' }} />
                                                <div className="col-md-12 mb-3">
                                                    {/* <label htmlFor="validationCustomUsername" className="text-white">Wallet Address/Username</label> */}
                                                    <label htmlFor="validationCustomUsername" className="text-white">UserID</label>
                                                    <div className="position-relative has-icon-right">
                                                        <input style={{ background: 'white' }} type="text" id="username" className="form-control input-shadow input_box" placeholder="Enter UserID" name="username" required="reqired" autoComplete="none" onChange={(e) => {
                                                            setMessage("");
                                                            setWallet(e.target.value);
                                                        }} value={wallet} />
                                                        <div className="form-control-position">
                                                            <i className="icon-user" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{ clear: 'both' }} />
                                                <p id="msg1" style={{ fontSize: 14, fontWeight: 'bold' }} />
                                                <div className="col-md-12 mb-3">
                                                    <label htmlFor="validationCustom02" className="text-white">Amount $</label>
                                                    <input style={{ padding: '23px', background: 'white' }} type="number" className="form-control input_box" name="amount" id="validationCustom02" value={amount} placeholder="Amount" required onChange={(e) => {
                                                        setMessage("");
                                                        setAmount(e.target.value);
                                                    }} />
                                                </div>
                                                <div className="col-md-12 mb-3" style={{ display: 'none' }}>
                                                    <label htmlFor="validationCustomUsername">Enter OTP <span id="otpmessage" style={{ color: 'green', fontWeight: 700, fontSize: 13, letterSpacing: '.5px' }} /> </label>
                                                    <div className="input-group">
                                                        <input type="text" maxLength={6} style={{ float: 'left', width: '70%' }} className="form-control" id="validationCustomUsername" name="otp" placeholder="please enter OTP" aria-describedby="inputGroupPrepend" />
                                                        <button className="btn btn-danger" id="otp" type="button" onclick="otpsend()" style={{ float: 'left', width: '30%' }}>send otp</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <br />
                                            <p style={{ color: "red" }}>{message}</p>
                                            <center>
                                                <button className="btn btn-primary text-center" style={{ marginLeft: '20px', background: 'black', color: '#d8af72', border: '1px solid #d8af72' }} id="submit" type="submit" onClick={handleFundTransfer}>Process Request</button>
                                                <div className='blur-div'>
                                                    <section className="content" style={{ paddingTop: 20 }}>
                                                        <Dialog sx={{ background: 'transprent', backdropFilter: 'blur(5px)' }} style={{
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}
                                                            open={openDialog} onClose={handleCloseDialog}
                                                        >
                                                            <DialogTitle>Verify Email</DialogTitle>
                                                            <DialogContent>
                                                                <DialogContentText>
                                                                    Please enter your email address to verify the withdrawal.
                                                                </DialogContentText>
                                                                <p style={{ color: "red" }}>{emailError}</p>
                                                                {/* <input
                                                                        type="text"
                                                                        className="form-control"
                                                                        placeholder="Enter Email Address"
                                                                        value={email}
                                                                        disabled={upperInputDisabled}
                                                                        onChange={(e) => {
                                                                            setEmail(e.target.value);
                                                                            setEmailError(""); // Clear the error message
                                                                        }}
                                                                    /> */}
                                                                <TextField
                                                                    autoFocus
                                                                    type="text"
                                                                    margin='dense'
                                                                    label="Enter Email Address"
                                                                    value={email}   
                                                                    disabled={upperInputDisabled}                                                                 
                                                                    fullWidth
                                                                    onChange={(e) => {
                                                                        setEmailError(""); // Clear the error message
                                                                        setEmail(e.target.value);
                                                                    }}
                                                                    InputProps={{ sx: { height: '60px', padding: '15px' } }}
                                                                />
                                                            </DialogContent>

                                                            {showOtpInput ? (
                                                                <>
                                                                    {/* <input
                                                                                type="text"
                                                                                className="form-control"
                                                                                placeholder="Enter OTP"
                                                                                value={otp}
                                                                                onChange={(e) => setOtp(e.target.value)}
                                                                            /> */}
                                                                    <DialogContent style={{ marginTop: '-20px' }}>
                                                                        <TextField
                                                                            autoFocus
                                                                            fullWidth
                                                                            label="Enter OTP"
                                                                            margin="dense"
                                                                            type="text"
                                                                            placeholder="Enter OTP"
                                                                            value={otp}
                                                                            onChange={(e) => {
                                                                                setEmailError('');
                                                                                setOtp(e.target.value)
                                                                            }}
                                                                            InputProps={{ sx: { height: '60px', padding: '15px' } }}
                                                                        />
                                                                    </DialogContent>
                                                                    <DialogActions>
                                                                        {sending ? <Button color='primary'>Verifying</Button> :<Button onClick={handleVerifyOtp} color="primary">
                                                                            Verify Email
                                                                        </Button>}
                                                                        <Button onClick={handleCloseDialog} color="primary">
                                                                            Cancel
                                                                        </Button>
                                                                    </DialogActions>
                                                                </>
                                                            ) : (
                                                                <DialogActions>
                                                                    {sending ? <Button color='primary'>Sending...</Button> :<Button onClick={handleGetOtp} color="primary">
                                                                        Get OTP
                                                                    </Button>}
                                                                    <Button onClick={handleCloseDialog} color="primary">
                                                                        Cancel
                                                                    </Button>
                                                                </DialogActions>
                                                            )}
                                                        </Dialog>
                                                    </section>
                                                </div>
                                            </center>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

        </>
    )
}

export default FundsTransfer;