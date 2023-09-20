import React, { useEffect, useState } from 'react'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import BlockIcon from '@mui/icons-material/Block';
import { token, baseURL } from '../token';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

import "../StyleFolder/AllUsers.css"
// import Demo from './Demo';
import { TablePagination } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import LockOpenIcon from '@mui/icons-material/LockOpen'; // Import the LockOpenIcon
import { compareDesc } from 'date-fns';

import {
    IconButton,
    Tooltip,
} from '@material-tailwind/react';

function RenewalUser() {
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
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [loading, setLoading] = useState(true); // Initially, set loading to true
    const navigate = useNavigate();

    // const location = useLocation();

    const { id } = useParams()
    console.log(id);
    // const queryParams = new URLSearchParams(location.search);
    // // const accessToken = localStorage.getItem('access_token');

    // const name = queryParams.get('id') || '';

    const rowsPerPageOptions = [10, 25, 50];
    const handleSearch = (e) => {
        e.preventDefault();
        const filteredData = tableData.filter((item) => {
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
            if (searchQuery && !item?.data?.username.toLowerCase().includes(searchQuery.toLowerCase())) {
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
        getallusers()
    };

    const getallusers = async () => {
        try {
            // const accessToken = token;
            const accessToken = localStorage.getItem('access_token'); // Retrieve access token from localStorage
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
            console.log(headers);
            // const response = await axios.get(baseURL + `/user/myrenew/${id}`, {
            const response = await axios.get(baseURL + `/user/myrenew/${id}`, {
                headers: headers
            });
            console.log("response", response);
            const userData = response.data.data;
            console.log("renewuserdata", userData);
            setAllusers(userData);

            const userProfileData = [];
            // const extraProfile = [];
            for (const renewuser of userData) {
                console.log("renewuser", renewuser);
                console.log("renewuser", renewuser.renewal_id);
                try {
                    const secondApiResponse = await axios.get(baseURL + `/user/profile/${renewuser.renewal_id}`, {
                        headers: headers
                    });
                    console.log(`renew User ID: ${renewuser.renewal_id}`, secondApiResponse.data.data);
                    if (secondApiResponse.data.data) {
                        userProfileData.push(secondApiResponse.data); // Accumulate user profile data
                    }
                    // extraProfile.push(secondApiResponse.data.metadata);
                } catch (error) {
                    console.error("Second API error:", error);
                }
            }

            console.log("renew profile ", userProfileData);
            userProfileData.sort((a, b) => compareDesc(new Date(a.data.createdAt), new Date(b.data.createdAt)));
            setTableData(userProfileData);
            setLoading(false); // Set loading to false once data is fetched
            // setExtradata(extraProfile);
            // console.log("tabledata", tableData);
        } catch (error) {
            console.error("error:--", error);
        }
    }
    useEffect(() => {
        getallusers();
    }, [])

    const handleBlockUser = async (id, status) => {
        console.log(status, id);
        try {
            const reqbody = {
                status: status,
                userId: id
            }

            const accessToken = localStorage.getItem('access_token'); // Retrieve access token from localStorage
            const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
            console.log(headers);
            const response = await axios.post(baseURL + `/user/block`, reqbody, {
                headers: headers
            });
            const userData = response.data.data;
            console.log("userdata", userData);
            getallusers();
            // setAllusers(userData);
        } catch (error) {
            console.log(error);
        }
    }
    // Calculate the index of the first and last data items to display
    const startIndex = page * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    // Slice the data to display only the current page
    const displayedData = tableData.slice(startIndex, endIndex);

    // Create a function to handle page change
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Create a function to handle rows per page change
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to the first page when changing rows per page
    };

    return (
        <>
            <div className="content-wrapper" style={{ minHeight: '706.4px' }}>
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark">Renewal Users</h1>
                            </div>{/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="https://hammertradex.com">Home</a></li>
                                    <li className="breadcrumb-item active">Renewal Users</li>
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
                                            <div className='col-md-6 col-12 mb-3'>

                                                <div className="form-group ">
                                                    <label>Pick a start date:</label>
                                                    <div className="input-group date" id="datepicker" data-target-input="nearest">
                                                        <input type="date" className="form-control t" placeholder="yyyy-mm-dd" name="start_date" onChange={(e) => setStartDate(e.target.value)} value={startDate} />
                                                    </div>
                                                </div>

                                                <div className="col-md-6 col-12 mb-3" >
                                                    <div className="form-group ">
                                                        <label>Pick a end date:</label>
                                                        <div className="input-group date" id="datepicker1" data-target-input="nearest">
                                                            <input type="date" className="form-control " placeholder="yyyy-mm-dd" name="end_date" onChange={(e) => setEndDate(e.target.value)} value={endDate} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div style={{ clear: 'both' }} />
                                            <div className="col-md-6 col-12 mb-3" >
                                                <label htmlFor="validationCustomUsername"> User Name</label>
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Username"
                                                        name="userid"
                                                        value={searchQuery}
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-md-12" >
                                                <label htmlFor="validationCustomUsername">Select id status</label>
                                                <select className="custom-select selectbox" name="status" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                                                    <option value> ----Select---- </option>
                                                    <option >active</option>
                                                    <option >inactive</option>
                                                    <option >blocked</option>
                                                </select>
                                            </div>
                                            {/* <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                                <label htmlFor="validationCustomUsername">Type</label>
                                                <div className="input-group">
                                                    <input type="text" className="form-control" placeholder="Type" defaultValue name="type_id" />
                                                </div>
                                            </div> */}

                                            <div className='row' />
                                            <br />
                                            <div className="col-12">
                                                <center>
                                                    <button style={{ backgroundColor: 'rgb(195 161 119)' }} className="btn btn-primary" onClick={(e) => handleSearch(e)} >Search Now</button>
                                                    <button className="button-reset btn btn-info" style={{ marginLeft: '20px', backgroundColor: 'rgb(195 161 119)' }} type="button" onClick={handleReset}>Reset <span><RotateLeftIcon /></span> </button>
                                                </center>
                                            </div>
                                            <br />
                                        </form>
                                        <div className="single-table">
                                            <div className="table-responsive">
                                                {loading ? (<>
                                                    <div className="loader-container">
                                                        <CircularProgress sx={{ color: 'orange' }} />
                                                    </div>
                                                </>) : (
                                                    <>
                                                        < table className="table text-center">
                                                            <thead className="text-capitalize">
                                                                <tr>
                                                                    <th>SR.No.</th>
                                                                    <th>Name</th>
                                                                    <th>User Name</th>
                                                                    <th>Refer Code</th>
                                                                    <th>Email</th>
                                                                    <th>Mobile Number</th>
                                                                    <th>Date</th>
                                                                    <th>Time</th>
                                                                    <th>Type</th>
                                                                    <th>Status</th>
                                                                    <th>Total members</th>
                                                                    <th>Sponser ID</th>
                                                                    <th>Active users</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {tableData?.length === 0 ? (
                                                                    <tr>
                                                                        <td colSpan="12" style={{ color: 'black', textAlign: 'center' }}>
                                                                            No results found
                                                                        </td>
                                                                    </tr>
                                                                ) :
                                                                    tableData?.map((row, index) => {
                                                                        const createdAt = new Date(row?.data?.createdAt);
                                                                        const formattedDate = createdAt.toLocaleDateString();
                                                                        const formattedTime = createdAt.toLocaleTimeString();
                                                                        return (
                                                                            <tr key={index}>
                                                                                <td>{index + 1}</td>
                                                                                <td>{row?.data?.name}</td>
                                                                                <td>{row?.data?.username}</td>
                                                                                <td>{row?.data?.hashcode}</td>
                                                                                <td>{row?.data?.email}</td>
                                                                                <td>{row?.data?.phonenumber}</td>
                                                                                <td>{formattedDate}</td>
                                                                                <td>{formattedTime}</td>
                                                                                <td>{row?.data?.type}</td>
                                                                                <td>
                                                                                    {row?.data?.status}
                                                                                </td>
                                                                                <td>{row?.metadata?.totalUsers}</td>
                                                                                <td>{row?.metadata?.sponsorId}</td>
                                                                                <td>{row?.metadata?.activeUsers}</td>
                                                                                <td>
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
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    })
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </>
                                                )}

                                                <br /><br />

                                            </div>
                                        </div>

                                        <center style={{ float: 'right' }}>
                                            <div>
                                                <nav>
                                                    <ul className="pagination">
                                                        <TablePagination sx={{ color: 'orange' }}
                                                            rowsPerPageOptions={rowsPerPageOptions}
                                                            component="div"
                                                            count={tableData?.length}
                                                            rowsPerPage={rowsPerPage}
                                                            page={page}
                                                            onPageChange={handleChangePage}
                                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                                        />
                                                    </ul>
                                                </nav>
                                            </div>
                                        </center>
                                        {/* <Demo tableData={tableData} /> */}
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

export default RenewalUser