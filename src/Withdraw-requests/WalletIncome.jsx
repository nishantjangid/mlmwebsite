import React, { useEffect, useState } from 'react'
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

import { TablePagination } from '@mui/material';
import { compareDesc } from 'date-fns';
import CircularProgress from '@mui/material/CircularProgress';
import { withdrawHistory } from '../ApiHelpers';
import { useToasts } from 'react-toast-notifications';


function WalletHistory() {
    const {addToast} = useToasts();
    const [loading, setLoading] = useState(true);    
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    
    const [loadings, setLoadings] = useState(true);
    const [data,setData] = useState([]);

    const getAllRequests = async () => {
        let token = localStorage.getItem('authToken');
        if(!token) return;
        try{
            setLoading(true);
            let result = await withdrawHistory();
            setData(result.result);
            setLoading(false);
        }catch(err){
            setLoading(false);
            if(err.code == "ERR_NETWORK" ){
                addToast(err.message, {appearance: "error",autoDismiss: true});
            }  
            else if(err.code == "ERR_BAD_REQUEST"){                
                addToast(err.response.data.error, {appearance: "error",autoDismiss: true});
            } 
            else if(err.response.status){
                addToast(err.response.data.error, {appearance: "error",autoDismiss: true});
            }            
        }
    }
    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 5); // Change the delay as needed
        getAllRequests();
    }, []);

    const handleReset = () => {                
        getAllRequests();
    };

    return (
        <> <div className={`fade-in ${loading ? '' : 'active'}`}>
            <div className="content-wrapper" style={{ minHeight: '512px' }}>
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark">  Wallet History  </h1>
                            </div>{/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="https://hammertradex.com">Home</a></li>
                                    <li className="breadcrumb-item active">Transaction</li>
                                </ol>
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
                                        <form role="form">
                                            <input type="hidden" name="_token" defaultValue="eLkpGsUBYr9izTDYhoNZCCY6pxm06c8hRkw1N41O" />
                                            <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                                <div className="form-group">
                                                    <label>Pick a start date:</label>
                                                    <div className="input-group date" id="datepicker" data-target-input="nearest">
                                                        <input type="date" className="form-control t" placeholder="yyyy-mm-dd" name="start_date" onChange={(e) => setStartDate(e.target.value)} value={startDate} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                                <div className="form-group">
                                                    <label>Pick a end date:</label>
                                                    <div className="input-group date" id="datepicker1" data-target-input="nearest">
                                                        <input type="date" className="form-control " placeholder="yyyy-mm-dd" name="end_date" onChange={(e) => setEndDate(e.target.value)} value={endDate} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ clear: 'both' }} />
                                            <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                                <label htmlFor="validationCustomUsername">General Search</label>
                                                <div className="input-group">
                                                    <input type="text" className="form-control" placeholder="Name,User ID"
                                                        name="username"
                                                        />
                                                </div>
                                            </div>
                                            {/* <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                                <label htmlFor="validationCustomUsername">Type</label>
                                                <div className="input-group">
                                                    <input type="text" className="form-control" placeholder="Type" defaultValue name="type_id" />
                                                </div>
                                            </div> */}
                                            <div style={{ clear: 'both' }} />
                                            <br />
                                            <div className="col-md-12 mb-12">
                                                <center>
                                                    <button style={{ color: 'black', backgroundColor: 'rgb(195 161 119)' }} className="btn btn-primary"  >Search Now</button>
                                                    <button className="btn btn-info" style={{ marginLeft: '20px', background: 'black', color: '#d8af72', border: '1px solid #d8af72' }} type="button" onClick={handleReset}>Reset <span><RotateLeftIcon /></span> </button>

                                                </center>
                                            </div>
                                            <br />
                                        </form>
                                        <div className="single-table">
                                            <div className="table-responsive">

                                                {!loadings ? (<>
                                                    <div className="loader-container">
                                                        <CircularProgress sx={{ color: 'orange' }} />
                                                    </div>


                                                </>) : (<>

                                                    <table className="table text-center">
                                                        <thead className="text-capitalize">
                                                            <tr>
                                                                <th>Sr.No.</th>
                                                                <th>User Name</th>
                                                                <th>User ID</th>
                                                                <th>Details</th>
                                                                <th>Amount</th>
                                                                <th>Date</th>
                                                                <th>Time</th>
                                                            </tr>
                                                        </thead>
                                                    </table>
                                                </>)}

                                                <br /><br />

                                            </div>
                                        </div>
                                    </div>                                   
                                </div>
                            </div>
                            {/* Primary table end */}
                        </div>
                    </div>
                </section>
            </div>
        </div>
        </>
    )
}

export default WalletHistory;