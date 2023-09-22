import React, { useContext, useEffect, useState } from 'react'
import "../StyleFolder/dashboards.css"
import { token, baseURL } from '../token';
import {
    Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, InputAdornment,
    IconButton,
    Tooltip,
} from '@mui/material';

import QrCodeIcon from '@mui/icons-material/QrCode';
import CloseIcon from '@mui/icons-material/Close';
import Card from '@mui/material/Card';
import FileCopyIcon from "@mui/icons-material/FileCopy";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useToasts } from "react-toast-notifications";
import {requestDesposit} from "../ApiHelpers";

import { Try } from '@mui/icons-material';
import { AuthContext } from '../Context/AuthContext';

function DashBoard({ userData }) {
    const { addToast } = useToasts();
    const {userDetail} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [memberwithdrawDetails, setMemberWithdrawdetails] = useState([]);
    // const [withdrawDetails, setWithdrawdetails] = useState([]);
    const [incomeDetails, setIncomedetails] = useState([]);
    const [walletamount, setWalletamount] = useState("");
    const [withdrawdata, setWithdrawdata] = useState("");
    const [dashboard, setDashboard] = useState([]);
    const [amount, setAmount] = useState(""); // State to store the entered amount
    const [openDialog, setOpenDialog] = useState(false);
    const [fileInput, setFileInput] = useState(null);
    const [upiId, setUpiId] = useState("");
    const [showQrCodeImage, setShowQrCodeImage] = useState(false);

    const [isSnackbarOpen, setSnackbarOpen] = useState(false);
    const [isLinkCopied, setLinkCopied] = useState(false);
    const [openQrCodeDialog, setOpenQrCodeDialog] = useState(false);
    const [message, setMessage] = useState("");

    // Function to show the QR code image
    const handleShowQrCodeImage = () => {
        setShowQrCodeImage(true);
    };

    // Function to close the QR code image
    const handleCloseQrCodeImage = () => {
        setShowQrCodeImage(false);
    };

    // Function to show the QR code dialog
    const handleShowQrCodeDialog = () => {
        setOpenQrCodeDialog(true);
    };

    // Function to close the QR code dialog
    const handleCloseQrCodeDialog = () => {
        setOpenQrCodeDialog(false);
    };



    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        resetDialogState(); // Reset dialog state
        setOpenDialog(false);
    };

    const handlePay = async () => {
        let attachment = fileInput;
        let message = "Pay the amount";
        if(!amount){
            addToast("Please provide a amount", {appearance: "error",autoDismiss: true});
            return; 
        }
        if(!fileInput){
            addToast("Please provide a Image", {appearance: "error",autoDismiss: true});
            return; 
        }

        try{
            let result = await requestDesposit({amount,message,attachment});
            console.log(result,'result');
            addToast('Deposite successfully!', { appearance: 'success' ,autoDismiss: true});
                       
        }catch(err){  
            console.log(err,'err');
            if(err.code == "ERR_NETWORK" || err.code == "ERR_BAD_REQUEST"){
                addToast(err.message, {appearance: "error",autoDismiss: true});
            }   
            else if(err.response.status){
                addToast(err.response.data.error, {appearance: "error",autoDismiss: true});
            }
        }
        handleCloseDialog();
    };
   

    useEffect(() => {
        // Simulate a delay to showcase the loading animation
        setTimeout(() => {
            setLoading(false);
        }, 5); // Change the delay as needed
        // You can also fetch data or perform other initialization here
    }, []);

    const resetDialogState = () => {
        setAmount(""); // Reset amount
        setUpiId(""); // Reset UPI ID
        setFileInput(null); // Reset file input
        // Reset any other state variables you want here
    };
    const totalAmount = 2051000.00;



    const handleCopyLink = () => {
        const linkText = "0xEF3d90DC8203f7b437478874e3A4Da7669bB8F36"; // Replace with your link text
        const textArea = document.createElement("textarea");
        textArea.value = linkText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);

        setLinkCopied(true);
        setSnackbarOpen(true);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <>


            <div className={`fade-in ${loading ? '' : 'active'}`}>
                <section className="dashboard_main_section light_border">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                        <div className="col-lg-3 col-md-3 col-sm-3">
                            <h2 className="welcome_heading  text-center text-sm-left">Welcome to <span className="color_span">T D Trading</span> </h2>
                        </div>
                        <div style={{}} >
                            <button className="pay" style={{ fontSize: '13px', padding: '6px', width: '100px', border: '1px solid #d8af72', background: 'none', borderRadius: '5px', color: '#d8af72' }} onClick={handleOpenDialog} > Deposit USDT</button>
                        </div>
                    </div>
                </section>
                <div style={{ display: 'flex', justifyContent: 'space-between' }} className="mobile-responsive-container ">
                    <div style={{ padding: '10px', marginBottom: '12px' }}>
                        <Card sx={{ color: '#d8af72', background: 'black', padding: '10px', width: "383px", maxWidth: 445 }}>
                            <Typography gutterBottom variant="h5" component="div">
                                Earning Capping
                            </Typography>
                            <CardMedia sx={{ height: 20 }} />
                            <Typography sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px' }}>
                                Your Investment
                                <div>
                                    <h3>$100</h3>
                                </div>
                            </Typography>
                            <CardContent>
                                <Typography sx={{ color: 'rgb(240 207 102 / 87 %)' }} variant="body2" color="text.secondary">
                                    <h4 className='fs-4'>$ {incomeDetails?.totalincome ? incomeDetails?.totalincome : "0"} earned of $ 200</h4>
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={(incomeDetails?.totalincome / totalAmount) * 1000000}
                                    sx={{ borderRadius: '40px', padding: '3px', marginTop: '14px', color: '', background: 'orange' }}
                                />
                            </CardContent>
                            <CardActions></CardActions>
                        </Card>
                    </div>

                    <div style={{ padding: '10px', marginBottom: '12px' }}>
                        <Card sx={{ color: '#d8af72', background: 'black', padding: '10px', width: "383px" }}>
                            <Typography sx={{}} gutterBottom variant="h5" component="div">
                                Reward Income
                            </Typography>
                            <CardMedia sx={{ height: 20 }} />
                            <Typography sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px' }}>
                                Total Investment

                                <div>
                                    <h3>$100</h3>
                                </div>
                            </Typography>
                            <CardMedia sx={{ height: 20 }} />
                            <CardContent>
                                <Typography sx={{ color: 'rgb(240 207 102 / 87 %)' }} variant="body2" color="text.secondary">
                                    <h4 className='fs-4'>$ {incomeDetails?.totalincome ? incomeDetails?.totalincome : "0"} earned of $ 6000</h4>
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={(incomeDetails?.totalincome / totalAmount) * 1000000}
                                    sx={{ borderRadius: '40px', padding: '3px', marginTop: '14px', color: '#d8af72', background: '#d8af72' }}
                                />
                            </CardContent>

                        </Card>
                    </div>
                </div>



                <section className="content" style={{ paddingTop: 20 }}>

                    <Dialog sx={{ width: '100%', background: 'transprent', backdropFilter: 'blur(3px)' }}
                        open={openDialog}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onClose={handleCloseDialog}
                    >
                        <DialogTitle>Payment Details</DialogTitle>
                        <DialogContent>
                            {showQrCodeImage && (
                                <div>
                                    <img src="your-qr-code-image.png" alt="QR Code" />
                                    {/* Add a close button to close the image */}
                                    <IconButton
                                        edge="end"
                                        color="primary"
                                        onClick={handleCloseQrCodeImage} // Close the image when this button is clicked
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </div>
                            )}
                            <TextField
                                autoFocus
                                margin="dense"
                                id="amount"
                                label="Amount in BEP20 USDT"
                                type="number"
                                fullWidth
                                value={amount}
                                onChange={(e) => {
                                    setMessage('');
                                    setAmount(e.target.value)
                                }}
                            />
                            <div style={{ marginTop: '20px' }}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    startIcon={<QrCodeIcon />}
                                    onClick={handleShowQrCodeDialog}
                                >
                                    Scan with QR code
                                </Button>
                            </div>
                            <div style={{ marginTop: '20px' }}>
                                <p style={{ color: 'black' }}>Please upload screenshot of the payment</p>
                                <input
                                    type="file"
                                    accept="image/*, application/pdf"
                                    onChange={(e) => {
                                        setMessage('');
                                        setFileInput(e.target.files[0])
                                    }}
                                />
                                {/* <label htmlFor="fileInput">
                                    <IconButton
                                        color="primary"
                                        component="span"
                                        aria-label="upload file"
                                    >
                                        <CloudUploadIcon />
                                    </IconButton>
                                    Upload Payment Proof
                                </label> */}
                            </div>
                            <div>
                                <p>{message}</p>
                            </div>

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handlePay} color="primary">
                                Pay
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        sx={{ background: 'transparent', backdropFilter: 'blur(3px)' }}
                        open={openQrCodeDialog} // Control the visibility of the QR code dialog
                    // ... (other props)
                    >
                        <DialogTitle>QR Code Scan</DialogTitle>
                        <DialogContent>
                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                <img src="QRCode.Png" width="250px" height="250px" alt="qrcode" style={{ maxWidth: '100%', height: 'auto' }} />
                            </div>

                            <div className="refer_link">
                                <p>0xEF3d90DC8203f7b437478874e3A4Da7669bB8F36</p>

                                <IconButton onClick={handleCopyLink} sx={{ color: 'white' }}>
                                    <FileCopyIcon />
                                </IconButton>

                            </div>
                            <Snackbar
                                open={isSnackbarOpen}
                                autoHideDuration={2000} // 2 seconds
                                onClose={() => handleCloseSnackbar(false)}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'center',
                                }}
                            >
                                <MuiAlert
                                    elevation={6}
                                    variant="filled"
                                    onClose={() => handleCloseSnackbar(false)}
                                    severity="success"
                                >
                                    Copied
                                </MuiAlert>
                            </Snackbar>


                            <IconButton
                                edge="end"
                                color="primary"
                                onClick={handleCloseQrCodeDialog} // Close the QR code dialog when this button is clicked
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogContent>
                    </Dialog>
                    <div className="container-fluid">
                        {/* Info boxes */}
                        <div className="row">
                            {/* member detail */}

                            <div className="col-12 col-sm-6 col-md-4" style={{ marginTop: 5 }}>
                                <div className="detail-box">
                                    <p className="box-header" style={{}}><i className="fa fa-rupee" /> General Detail </p>
                                    {/* {memberwithdrawDetails.map((detail, index) => ( */}
                                    <div className="collection-item" style={{ padding: 4, borderBottom: '1px solid #a2a0a0' }}>
                                        <div className="row">
                                            <div className="col s8">
                                                <p className="collections-title font-weight-600">User ID : </p>
                                            </div>
                                            <div className="col s3"><span>{userDetail?.userId}</span></div>
                                        </div>
                                        {/* <div className="row">
                                            <div className="col s8">
                                                <p className="collections-title font-weight-600">Name: </p>
                                            </div>
                                            <div className="col s3"><span>{userDetail?.name}</span></div>
                                        </div> */}
                                        <div className="row">
                                            <div className="col s8">
                                                <p className="collections-title font-weight-600"> Sponsor ID: </p>
                                            </div>
                                            <div className="col s3"><span>{userDetail?.refferBy}
                                                {/* <div className="col s3"><span>{dashboard?.createdAt.split('T')[0]} */}
                                            </span>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col s8">
                                                <p className="collections-title font-weight-600">Sponsor Name: </p>
                                            </div>
                                            <div className="col s3"><span>Unlimited</span></div>
                                        </div>



                                    </div>

                                </div>


                                <div style={{ marginTop: '10px' }} className="detail-box">
                                    <p className="box-header" style={{}}><i className="fa fa-rupee" /> Referal Link </p>
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>

                                        <img style={{ maxWidth: '100%' }} width="250px" height="250px" src="QRCode.png" alt="QRCode" />



                                    </div>

                                    <section className="profile_main_section mt-10">
                                        <div
                                            style={{ justifyContent: "center" }}
                                            className="row"
                                        >
                                            <div className="col-lg-12 col-md-8 col-sm-12">
                                                <div className="dashboard_boxes_main_dark">
                                                    <div
                                                        style={{ color: "white" }}
                                                        className="profile_section_tabs_inner_main"
                                                    >
                                                        <div
                                                            style={{ color: "white" }}
                                                            className="refer_link_main"
                                                        >
                                                            <p
                                                                style={{ color: "#c3a177 !important" }}
                                                            >
                                                                Referral Link
                                                            </p>
                                                            <div className="refer_link">
                                                                <p className="flex justify-between items-center w-full">
                                                                    <p
                                                                        style={{ fontSize: '9px', overflowWrap: "anywhere" }}
                                                                    >
                                                                        https://deep.com/register?id=63be505e76bb22053eff15d7
                                                                    </p>
                                                                    <p>
                                                                        <Tooltip
                                                                            content="Copy"
                                                                            sx={{ color: "black" }}
                                                                        >
                                                                            <IconButton
                                                                                variant="text"
                                                                                color="blue-gray"
                                                                            >
                                                                                <ContentCopyIcon sx={{ color: 'white' }} className="h-5 w-5" />
                                                                            </IconButton>
                                                                        </Tooltip>
                                                                    </p>
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                </div>

                            </div>
                            <div className="col-12 col-sm-6 col-md-4" style={{ marginTop: 5 }}>
                                <div className="detail-box">
                                    <p className="box-header" style={{}}>
                                        <i className="fa fa-users" /> Member Detail
                                    </p>
                                    {/* {memberwithdrawDetails.map((detail, index) => ( */}
                                    <div className="collection-item" style={{ padding: 4, borderBottom: '1px solid #a2a0a0' }}>
                                        <div className="row">
                                            <div className="col s8">
                                                <p className="collections-title font-weight-600">Total Member: </p>
                                            </div>
                                            <div className="col s3"><span>NaN</span></div>
                                        </div>
                                        <div className="row">
                                            <div className="col s8">
                                                <p className="collections-title font-weight-600">Active Member: </p>
                                            </div>
                                            <div className="col s3"><span>NaN</span></div>
                                        </div>
                                        <div className="row">
                                            <div className="col s8">
                                                <p className="collections-title font-weight-600">In-Active Member: </p>
                                            </div>
                                            <div className="col s3"><span>{memberwithdrawDetails?.totalUsers - memberwithdrawDetails?.activeUsers}</span></div>
                                        </div>
                                    </div>

                                </div>
                                <div style={{ marginTop: '10px' }} >
                                    <div className="detail-box">
                                        <p className="box-header" style={{}}><i className="fa fa-rupee" /> Withdraw Detail </p>

                                        <div className="collection-item" style={{ padding: 4, borderBottom: '1px solid #a2a0a0' }}>

                                            <div className="row">
                                                <div className="col s8">
                                                    <p className="collections-title font-weight-600">Total Withdraw : </p>
                                                </div>
                                                <div className="col s3"><span>{walletamount}</span></div>
                                            </div>


                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-sm-6 col-md-4" style={{ marginTop: 5 }}>
                                <div className="detail-box">
                                    <p className="box-header"> <i className="fa fa-rupee" />  Income Detail </p>

                                    <div className="collection-item" style={{ padding: 4, borderBottom: '1px solid #a2a0a0' }}>
                                        <div className="row">
                                            <div className="col s8">
                                                <p className="collections-title font-weight-600">Today ROI Income:- </p>
                                            </div>
                                            <div className="col s3"><span>{incomeDetails?.levelincome}</span></div>
                                        </div>

                                        <div className="row">
                                            <div className="col s8">
                                                <p className="collections-title font-weight-600"> Total ROI Income:- </p>
                                            </div>
                                            <div className="col s3"><span>{incomeDetails?.autopool1}</span></div>
                                        </div>
                                        <div className="row">
                                            <div className="col s8">
                                                <p className="collections-title font-weight-600"> Level Income:- </p>
                                            </div>
                                            <div className="col s3"><span>{incomeDetails?.autopool2}</span></div>
                                        </div>

                                        <div className="row">
                                            <div className="col s8">
                                                <p className="collections-title font-weight-600"><strong>Total Income:-</strong></p>
                                            </div>
                                            <div className="col s3"><span>{incomeDetails?.totalincome}</span></div>
                                        </div>
                                    </div>


                                </div>
                            </div>

                        </div>
                    </div>
                </section>


            </div >

        </>
    )
}

export default DashBoard