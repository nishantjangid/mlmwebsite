import React, { useState, useEffect } from 'react'
import "../StyleFolder/stackManage.css";
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button'; // Assuming you are using Material-UI for buttons

import { TextField } from '@mui/material';


function SendRequest() {

    const [amount, setAmount] = useState(0);
    const [balance, setBalance] = useState(0);
    const [wallet, setWallet] = useState("");
    const [message, setMessage] = useState("Message");
    const [upperInputDisabled, setUpperInputDisabled] = useState(false);
    const [otpInput, setOtpInput] = useState("");
    const [showOtpInput, setShowOtpInput] = useState(false);

    // State for controlling the dialog
    const [openDialog, setOpenDialog] = useState(false);
    const [otp, setOtp] = useState("");
    // const [emailverify, setEmailverify] = useState(true);
    const [emailverify, setEmailverify] = useState(false);

    // State for input field value and error message
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");

    const handleReset = () => {
        setAmount(0);
        setWallet("");

        fetchData()
    };





    const getUserNameByUserId = async (userId) => {
       
    };

    const fetchData = async () => {
      
    };

    useEffect(() => {
        fetchData();
    }, []);
    const handleWithdraw = async (e) => {
        e.preventDefault();
        {
            !emailverify &&
                setOpenDialog(true)
        }
      
    }

    const handleCloseDialog = () => {
        setOpenDialog(false);

        // Reset email and email error state values
        setEmail("");
        setEmailError("");

        // Reset OTP input and enable the upper input field
        setOtp("");
        setShowOtpInput(false);
        setUpperInputDisabled(false);
    };

    const handleGetOtp = () => {


        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!email || !emailPattern.test(email)) {
            setEmailError("Please enter a valid email address.");
            return;
        }

        setUpperInputDisabled(true);

        // Show the OTP input field
        setShowOtpInput(true);
        handleSendOtp();
    };

    const handleSendOtp = async () => {
        // setStep(2); // Move to OTP entry step
  
    };

    const handleVerifyOtp = async (event) => {
        event.preventDefault();
        // setStep(3)
      
    };

    return (
        <>
            <div className="content-wrapper" style={{ minHeight: 679 }}>
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-14">
                                <h1 className="m-0 text-dark">Withdraw Amount (Available Balance : {balance})</h1>
                            </div>{/* /.col */}

                        </div>{/* /.row */}
                    </div>{/* /.container-fluid */}
                </div>
                {/* Main content */}
                <section className="content">
                    <div className="container-fluid" style={{ marginTop: '-35px' }}>
                        <div className="row">
                            {/* Primary table start */}
                            <div className="col-12 mt-5">
                                <div className="card">
                                    <div className="card-body">
                                        <form role="form" type="submit">
                                            <p style={{ color: "white" }}>{message}</p>
                                            <div style={{ clear: 'both' }} />
                                            <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                                <label htmlFor="validationCustomUsername"> Amount</label>
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Place Correct Amount Here To Withdraw"
                                                        name="userid"
                                                        value={amount}
                                                        onChange={(e) => setAmount(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                                <label htmlFor="validationCustomUsername"> Crypto Wallet Address</label>
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter Correct Wallet Address Here"
                                                        name="userid"
                                                        value={wallet}
                                                        onChange={(e) => setWallet(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                         

                                            <div style={{ clear: 'both' }} />
                                            <br />
                                            <div className="col-md-12 mb-12">
                                                <center>
                                                    <button style={{ backgroundColor: 'rgb(195 161 119)' }} className="btn btn-primary" onClick={handleWithdraw} >Withdraw</button>

                                                    <button className="btn btn-info" style={{ marginLeft: '20px', background: 'black', color: '#d8af72', border: '1px solid #d8af72' }} type="button" onClick={handleReset}>Reset <span><RotateLeftIcon /></span> </button>

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
                                                                        disabled
                                                                        fullWidth
                                                                        onChange={(e) => {
                                                                            setEmailError(""); // Clear the error message
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
                                                                                onChange={(e) => setOtp(e.target.value)}
                                                                                InputProps={{ sx: { height: '60px', padding: '15px' } }}
                                                                            />
                                                                        </DialogContent>
                                                                        <DialogActions>
                                                                            <Button onClick={handleVerifyOtp} color="primary">
                                                                                Verify Email
                                                                            </Button>
                                                                            <Button onClick={handleCloseDialog} color="primary">
                                                                                Cancel
                                                                            </Button>
                                                                        </DialogActions>
                                                                    </>
                                                                ) : (
                                                                    <DialogActions>
                                                                        <Button onClick={handleGetOtp} color="primary">
                                                                            Get OTP
                                                                        </Button>
                                                                        <Button onClick={handleCloseDialog} color="primary">
                                                                            Cancel
                                                                        </Button>
                                                                    </DialogActions>
                                                                )}
                                                            </Dialog>
                                                        </section>
                                                    </div>

                                                </center>
                                            </div>
                                            <br />
                                        </form>
                                    </div>
                                </div>
                            </div>
                            {/* Primary table end */}
                        </div>
                    </div>
                </section >
            </div >
        </>
    )
}

export default SendRequest;