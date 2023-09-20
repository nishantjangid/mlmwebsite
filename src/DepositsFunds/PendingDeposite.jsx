import React, { useEffect, useState } from 'react'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import { token, baseURL } from '../token';
import { Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { compareDesc } from 'date-fns';
import "../StyleFolder/style.css"

import axios from 'axios';
import LockOpenIcon from '@mui/icons-material/LockOpen'; // Import the LockOpenIcon
import BlockIcon from '@mui/icons-material/Block';
import CircularProgress from '@mui/material/CircularProgress';

import {
    IconButton,
    Tooltip,
} from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';


function PendingDeposite() {
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [searchUserInput, setSearchUserInput] = useState('');
    const [iconRotation, setIconRotation] = useState(0);
    const [allusers, setAllusers] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10); // Set the initial rowsPerPage to 5

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // Initially, set loading to true

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 1)); // Parse the value to an integer
        setPage(0); // Reset the page to the first page when changing rowsPerPage
    };
    const handleSearch = (e) => {
        e.preventDefault();
        const filteredData = tableData?.filter((item) => {
            // console.log("date", item.data.createdAt);
            const itemDate = new Date(item?.data?.createdAt);
            console.log("date", itemDate);
            const startDateObj = startDate ? new Date(startDate) : null;
            const endDateObj = endDate ? new Date(endDate) : null;

            // Check the date range
            if (startDateObj && endDateObj) {
                // Format the item date in the same format as your input (MM/DD/YYYY)
                const formattedItemDate = `${itemDate.getMonth() + 1}/${itemDate.getDate()}/${itemDate.getFullYear()}`;
                const start = `${startDateObj.getMonth() + 1}/${startDateObj.getDate()}/${startDateObj.getFullYear()}`;
                const end = `${endDateObj.getMonth() + 1}/${endDateObj.getDate()}/${endDateObj.getFullYear()}`;
                // console.log(start);
                // console.log(formattedItemDate, start, end);
                // console.log(formattedItemDate >= start);
                if (
                    formattedItemDate < start ||
                    formattedItemDate > end
                ) {
                    return false;
                }
            }
            if (startDateObj) {
                const formattedItemDate = `${itemDate.getMonth() + 1}/${itemDate.getDate()}/${itemDate.getFullYear()}`;
                const start = `${startDateObj.getMonth() + 1}/${startDateObj.getDate()}/${startDateObj.getFullYear()}`;
                console.log(start);
                if (
                    formattedItemDate < start
                ) {
                    return false;
                }
            }
            if (endDateObj) {
                const formattedItemDate = `${itemDate.getMonth() + 1}/${itemDate.getDate()}/${itemDate.getFullYear()}`;
                const end = `${endDateObj.getMonth() + 1}/${endDateObj.getDate()}/${endDateObj.getFullYear()}`;
                if (
                    formattedItemDate > end
                ) {
                    return false;
                }
            }

            // Check the user name
            if (searchQuery && !item?.data?.username?.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
            }
            console.log(selectedStatus, item?.data?.status);
            if (selectedStatus !== "" && item?.data?.status !== selectedStatus) {
                return false;
            }
            return true;
        });

        setTableData(filteredData);
        console.log(tableData);
        console.log(filteredData);
    };

    const handleReset = () => {
        setStartDate('');
        setEndDate('');
        setSearchQuery('');
        setSelectedStatus('')
        setTableData(tableData);
        setIconRotation(iconRotation + 360); // Rotate the icon by 360 degrees
        // getallusers()
    };


    const dummyData = [
        {
            data: {
                id: 1,
                amount: 100,
                massage: "Sample Massage 1",
                mobile: "1234567890",
                images: "image1.jpg",
                user_name: "User 1",
                touserid: "User 2",
                account_type: "Type 1",
                status: "Active",
                createdAt: "2023-09-18T10:30:00Z",
            },
        },
        {
            data: {
                id: 2,
                amount: 200,
                massage: "Sample Massage 2",
                mobile: "9876543210",
                images: "image2.jpg",
                user_name: "User 2",
                touserid: "User 1",
                account_type: "Type 2",
                status: "Inactive",
                createdAt: "2023-09-17T15:45:00Z",
            },
        },
        // Add more dummy data entries as needed
    ];



    useEffect(() => {
        setTableData(dummyData);
    }, []);


    const handlerenew = async (id) => {
        // navigate(`${id}`)
        navigate(`/AllUsers/${id}`)
    }

  
    return (
        <>
            <div className="content-wrapper" style={{ minHeight: '706.4px' }}>
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark"> Pending Deposite</h1>
                            </div>{/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="https://hammertradex.com">Home</a></li>
                                    <li className="breadcrumb-item active">All Users</li>
                                </ol>
                            </div>{/* /.col */}
                        </div>{/* /.row */}
                    </div>{/* /.container-fluid */}
                </div>

                <section className="content">
                    <div className="container-fluid" style={{ marginTop: '-35px' }}>
                        <div className="row">
                            {/* Primary table start */}
                            <div className="col-12 mt-5">
                                <div className="card">
                                    <div className="card-body">
                                        <form role="form" type="submit">
                                            {/* <input type="hidden" name="_token" defaultValue="eLkpGsUBYr9izTDYhoNZCCY6pxm06c8hRkw1N41O" /> */}
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
                                            {/* <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                                <label htmlFor="validationCustomUsername"> User Name</label>
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Name, User ID , Mobile No. "
                                                        name="userid"
                                                        value={searchQuery}
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                    />
                                                </div>
                                            </div> */}
                                            {/* <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                                <label htmlFor="validationCustomUsername">Search  By status</label>
                                                <select className="custom-select selectbox" style={{ backgroundColor: 'rgb(39 39 39)', border: "none", padding: '9px 5px', height: '3rem' }} name="status" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                                                    <option value> ----Select---- </option>
                                                    <option > Pending </option>
                                                    <option >Reject</option>
                                                    <option >Approve</option>

                                                </select>
                                            </div> */}



                                            <div style={{ clear: 'both' }} />
                                            <br />
                                            <div className='row' >
                                                <div className="col-md-12 mb-12">
                                                    <center>
                                                        <button style={{ color: 'black', backgroundColor: 'rgb(195 161 119)' }} className="btn btn-primary" onClick={(e) => handleSearch(e)} >Search Now</button>
                                                        <button className="btn btn-info" style={{ marginLeft: '20px', background: 'black', color: '#d8af72', border: '1px solid #d8af72' }} type="button" onClick={handleReset}>Reset <span><RotateLeftIcon /></span> </button>

                                                    </center>
                                                </div>
                                            </div>
                                            <div className="dt-buttons btn-group flex-wrap mb-3">
                                                <button className="btn btn-secondary buttons-pdf buttons-html5" tabIndex={0} aria-controls="table_id" type="button">
                                                    <span>PDF</span>
                                                </button>
                                                <button className="btn btn-secondary buttons-excel buttons-html5" tabIndex={0} aria-controls="table_id" type="button">
                                                    <span>Excel</span>
                                                </button>
                                                <button className="btn btn-secondary buttons-csv buttons-html5" tabIndex={0} aria-controls="table_id" type="button">
                                                    <span>CSV</span>
                                                </button>
                                                <button className="btn btn-secondary buttons-print" tabIndex={0} aria-controls="table_id" type="button"><span>Print</span>
                                                </button>
                                            </div>

                                            <br />




                                        </form>
                                        <div className="single-table">
                                            <div className="table-responsive">
                                                {loading ? (<>
                                                    <div className="loader-container">
                                                        <CircularProgress sx={{ color: 'orange' }} />
                                                    </div>
                                                </>) : (<>
                                                    <table className="table text-center">
                                                        <thead className="text-capitalize">
                                                            <tr>
                                                                <th>SR.No.</th>
                                                                <th>Amount</th>
                                                                <th>Image</th>
                                                                <th>Massage</th>
                                                                <th>  Date</th>
                                                                <th>Time</th>

                                                                {/* <th>Action</th> */}
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {tableData.length === 0 ? (
                                                                <tr>
                                                                    <td colSpan="12" style={{ color: 'black', textAlign: 'center' }}>
                                                                        No results found
                                                                    </td>
                                                                </tr>
                                                            ) :
                                                                tableData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                                                    console.log("time", row?.data?.createdAt);
                                                                    const createdAt = new Date(row?.data?.createdAt);
                                                                    console.log("created", createdAt);
                                                                    const formattedDate = createdAt.toLocaleDateString();
                                                                    const formattedTime = createdAt.toLocaleTimeString();
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{index + 1}</td>
                                                                            <td style={{ cursor: "pointer" }} onClick={() => handlerenew(row?.data?.id)}>{row?.data?.amount}</td>
                                                                            <td>{row?.data?.images}</td>
                                                                            <td>{row?.data?.massage}</td>
                                                                            <td>{formattedDate}</td>
                                                                            <td>{formattedTime}</td>
                                                                            {/* <td>{row?.data?.type}</td> */}
                                                                            <td>
                                                                                {/* Convert Status field into a button */}
                                                                                {/* <button className={`btn ${row?.data?.status === 'Active' ? 'btn-success' : 'btn-danger'}`}> */}
                                                                                {/* {row?.data?.status} */}
                                                                                {/* </button> */}
                                                                            </td>
                                                                            {/* <td>{row?.metadata?.totalUsers}</td>
                                                                            <td>{row?.metadata?.sponsorId}</td>
                                                                            <td>{row?.metadata?.activeUsers}</td> */}
                                                                            {/* ... render other fields */}
                                                                            {/* <td>
                                                                                    {row?.data?.status === "blocked" ?
                                                                                        <Tooltip content="Unblock User">
                                                                                            <IconButton
                                                                                                variant="text"
                                                                                                color="blue-gray"
                                                                                                onClick={() => handleBlockUser(row?.data?.id, "false")} // Define your unblock user handler
                                                                                            >
                                                                                                <LockOpenIcon className="h-5 w-5" />
                                                                                            </IconButton>
                                                                                        </Tooltip>
                                                                                        :
                                                                                        <Tooltip content="Block User">
                                                                                            <IconButton
                                                                                                variant="text"
                                                                                                color="blue-gray"
                                                                                                onClick={() => handleBlockUser(row?.data?.id, "true")}
                                                                                            >
                                                                                                <BlockIcon className="h-5 w-5" />
                                                                                            </IconButton>
                                                                                        </Tooltip>
                                                                                    }
                                                                                </td> */}
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                </>)}

                                                <br /><br />

                                            </div>


                                        </div>
                                    </div>
                                    <center>
                                        <div>
                                            <TablePagination
                                                sx={{ alignItems: 'center', color: 'orange' }}
                                                rowsPerPageOptions={[5, 10, 25, 50]}
                                                component="div"
                                                count={tableData.length}
                                                rowsPerPage={rowsPerPage} // Use the state variable here
                                                page={page}
                                                onPageChange={handleChangePage}
                                                onRowsPerPageChange={handleChangeRowsPerPage}
                                            />

                                        </div>
                                    </center>
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

export default PendingDeposite;