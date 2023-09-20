import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import QrCodeIcon from '@mui/icons-material/QrCode';
import CloseIcon from '@mui/icons-material/Close';
import FileCopyIcon from "@mui/icons-material/FileCopy";
import CardActions from '@mui/material/CardActions';
import LinearProgress from '@mui/material/LinearProgress';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { Try } from '@mui/icons-material';
import axios from 'axios';
import { baseURL } from '../token';

function RewardIncome() {

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
        // Handle payment logic here with 'amount' state
        // Close the dialog
        if (!fileInput || !amount) {
            setMessage("please fill all feilds");
            return;
        }
        try {
            console.log(amount, fileInput);
            const formData = new FormData();
            formData.append('file', fileInput);
            formData.append('amount', amount);
            console.log(formData);
            if (formData.has('file') || formData.has('amount')) {
                // There are values in the formData object
                console.log('FormData has values:', formData);
            } else {
                // FormData is empty
                console.log('FormData is empty');
            }

            const accessToken = localStorage.getItem('access_token'); // Retrieve access token from localStorage
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
            console.log(headers);

            const response = await axios.post(baseURL + '/user/addMoneyRequest', formData, {
                headers: headers,
                // 'Content-Type': 'multipart/form-data'
            });
            console.log(response?.data);
            if (response) {
                handleCloseDialog();
            }
        } catch (error) {
            console.log(error);
            setMessage(error?.data?.message);
        }
    };
    const getdashboard = async () => {
       
    }

    useEffect(() => {
        // Simulate a delay to showcase the loading animation
        setTimeout(() => {
            setLoading(false);
        }, 5); // Change the delay as needed
        getdashboard();
        // You can also fetch data or perform other initialization here
    }, []);

    const resetDialogState = () => {
        setAmount(""); // Reset amount
        setUpiId(""); // Reset UPI ID
        setFileInput(null); // Reset file input
        // Reset any other state variables you want here
    };
    const totalAmount = 2051000.00;



 

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <>


            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px', marginBottom: '12px' }}>
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
                            sx={{ borderRadius: '40px', padding: '3px', marginTop: '14px', color: '#d8af72' }}
                        />
                    </CardContent>

                </Card>
            </div>



        </>
    )
}

export default RewardIncome