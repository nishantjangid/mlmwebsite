
import React, { useState, useEffect } from 'react'
import "../StyleFolder/stackManage.css";
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import TablePagination from '@mui/material/TablePagination';
import CircularProgress from '@mui/material/CircularProgress';


const StackManage = () => {

    const [tableData, setTableData] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true); // Initially, set loading to true
    const [selectedStatus, setSelectedStatus] = useState("");



    const handleReset = () => {
        setStartDate("");
        setEndDate("");
        setSearchQuery("");
        // setTableData(tableData);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setCurrentPage(newPage + 1); // Material-UI uses 0-based indexing for pages
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(1); // Reset the current page when changing rows per page
    };

    const indexOfLastItem = (currentPage + 1) * rowsPerPage;
    const indexOfFirstItem = indexOfLastItem - rowsPerPage;
    const currentItems = tableData.slice(indexOfFirstItem, indexOfLastItem);
    console.log(currentItems);


    return (
        <>
            <div className="content-wrapper" style={{ minHeight: 679 }}>
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark">Transaction</h1>
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
                                            <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                                <label htmlFor="validationCustomUsername"> User Name</label>
                                                <div className="input-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Name,Username"
                                                        name="userid"
                                                        value={searchQuery}
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            {/* <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                                <label htmlFor="validationCustomUsername">Filter</label>
                                                <div className="input-group">
                                                    <input type="text" className="form-control" placeholder="Type" defaultValue name="type_id" />
                                                </div>
                                            </div> */}
                                            <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                                <label htmlFor="validationCustomUsername">Select id status</label>
                                                <select className="custom-select selectbox" style={{ backgroundColor: 'rgb(39 39 39)', border: "none", padding: '9px 5px', height: '3rem' }} name="status" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                                                    <option value> ----Select---- </option>
                                                    <option >Daily ROI</option>
                                                    <option >Level Income</option>
                                                    <option >Withdrawal</option>

                                                </select>
                                            </div>

                                            <div style={{ clear: 'both' }} />
                                            <br />
                                            <div className='row'>
                                                <div className="col-md-12 mb-12">
                                                    <center>
                                                        <button style={{ backgroundColor: 'rgb(195 161 119)' }} className="btn btn-primary"  >Search Now</button>

                                                        <button style={{ marginLeft: '20px', background: 'black', color: '#d8af72', border: '1px solid #d8af72' }} className="btn btn-primary" type="button" onClick={handleReset}>Reset <span><RotateLeftIcon /></span> </button>
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
                                                {!loading ? (<>
                                                    <div className="loader-container">
                                                        <CircularProgress sx={{ color: 'orange' }} />
                                                    </div>
                                                </>) : (<>
                                                    <table className="table text-center">
                                                        <thead className="text-capitalize">
                                                            <tr>
                                                                <th>SR. No.</th>
                                                                <th>User ID</th>
                                                                <th>User Name</th>
                                                                <th>Details</th>
                                                                <th>From Name</th>
                                                                <th>Amount</th>
                                                                <th>Date</th>
                                                                <th>Time</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {/* {currentItems?.map((item, index) => { */}
                                                            {tableData?.map((item, index) => {
                                                                const createdAt = new Date(item?.createdAt);
                                                                const formattedDate = createdAt.toLocaleDateString();
                                                                const formattedTime = createdAt.toLocaleTimeString();
                                                                // console.log(createdAt, formattedDate, formattedTime);
                                                                return (
                                                                    <tr key={item?.transaction_id}>
                                                                        <td>{index + 1}</td>
                                                                        <td>{item?.userId}</td>
                                                                        <td>{item?.userName}</td>
                                                                        <td>{item?.detail}</td>
                                                                        <th>{item?.fromname}</th>
                                                                        <td>{item?.amount}</td>
                                                                        <td>{formattedDate}</td>
                                                                        <td>{formattedTime}</td>
                                                                    </tr>
                                                                );
                                                            })}
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
                                                sx={{ color: 'orange' }}
                                                rowsPerPageOptions={[10, 25, 50, 100]}
                                                component="div"
                                                count={tableData.length}
                                                rowsPerPage={rowsPerPage}
                                                page={currentPage - 1} // Material-UI uses 0-based indexing for pages
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

export default StackManage;