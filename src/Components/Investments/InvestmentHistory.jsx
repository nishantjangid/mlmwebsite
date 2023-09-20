import React, { useState } from 'react'
import RotateLeftIcon from '@mui/icons-material/RotateLeft';

function InvestmentHistory() {
    const [activeTab, setActiveTab] = useState('transfer');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const transferHistoryData = [
        {
            id: 1,
            from: 'htxtradex',
            toUserName: '',
            toUserID: '',
            amount: '2500.00 TRX',
            date: '2023-02-22 12:52 pm',
        },
        {
            id: 2,
            from: 'htxtradex',
            toUserName: 'HTX2653',
            toUserID: 'Krishna',
            amount: '10000.00 TRX',
            date: '2023-02-24 04:46 pm',
        },
        // Add more data entries as needed
    ];


    const requestHistoryData = [
        {
            id: 1,
            from: 'User A',
            toUser: 'User B',
            toUserID: 'UserID123',
            amount: '500.00 TRX',
            date: '2023-02-20 10:30 am',
        },
        {
            id: 2,
            from: 'User B',
            toUser: 'User C',
            toUserID: 'UserID456',
            amount: '1000.00 TRX',
            date: '2023-02-25 03:45 pm',
        },
        // Add more data entries as needed
    ];
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };


    const handleFromDateChange = (event) => {
        setFromDate(event.target.value);
    };

    const handleToDateChange = (event) => {
        setToDate(event.target.value);
    };

    const handleSearchClick = () => {
        const dataToFilter = activeTab === 'transfer' ? transferHistoryData : requestHistoryData;

        const filtered = filterData(dataToFilter);
        setFilteredData(filtered);
    };
    const handleReset = () => {
        setFromDate('');
        setToDate('');
        setSearchQuery('');
        setFilteredData([]);
    };
    const filterData = (data) => {
        const startDate = new Date(fromDate);
        const endDate = new Date(toDate);

        const filtered = data.filter((item) => {
            const itemDate = new Date(item.date);

            return (
                (!fromDate || itemDate >= startDate) &&
                (!toDate || itemDate <= endDate) &&
                (!searchQuery || item.from.includes(searchQuery) || item.toUserName.includes(searchQuery))
            );
        });

        return filtered;
    };


    return (
        <>
            <div className="content-wrapper" style={{ minHeight: 1016 }}>

                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="welcome_heading">Investment History</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="https://hammertradex.com">Home</a></li>
                                    <li className="breadcrumb-item active">Active New Member</li>
                                </ol>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">

                                <form role="form" type="submit">
                                    {/* <input type="hidden" name="_token" defaultValue="eLkpGsUBYr9izTDYhoNZCCY6pxm06c8hRkw1N41O" /> */}
                                    <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                        <div className="form-group">
                                            <label>Pick a start date:</label>
                                            <div className="input-group date" id="datepicker" data-target-input="nearest">
                                                <input type="date" className="form-control t" placeholder="yyyy-mm-dd" name="start_date" onChange={handleFromDateChange}
                                                    value={fromDate} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                        <div className="form-group">
                                            <label>Pick a end date:</label>
                                            <div className="input-group date" id="datepicker1" data-target-input="nearest">
                                                <input type="date" className="form-control " placeholder="yyyy-mm-dd" name="end_date" onChange={handleToDateChange}
                                                    value={toDate} />
                                            </div>
                                        </div>
                                    </div>
                                    <div style={{ clear: 'both' }} />
                                    <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                        <label htmlFor="validationCustomUsername"> General Search</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Name, User ID , Mobile No."
                                                name="userid"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    {/* <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                        <label htmlFor="validationCustomUsername">Select id status</label>
                                        <select className="custom-select selectbox" style={{ backgroundColor: 'rgb(39 39 39)', border: "none", padding: '9px 5px', height: '3rem' }} name="status" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                                            <option value> ----Select---- </option>
                                            <option >active</option>
                                            <option >inactive</option>
                                            <option >blocked</option>
                                        </select>
                                    </div> */}
                                    {/* <div className="col-md-6 mb-6" style={{ float: 'left', marginTop: 10 }}>
                                                <label htmlFor="validationCustomUsername">Type</label>
                                                <div className="input-group">
                                                    <input type="text" className="form-control" placeholder="Type" defaultValue name="type_id" />
                                                </div>
                                            </div> */}

                                    <div style={{ clear: 'both' }} />
                                    <br />
                                    <div className='row' >
                                        <div className="col-md-12 mb-12">
                                            <center>
                                                <button type='button' style={{ color: 'black', backgroundColor: 'rgb(195 161 119)' }} className="btn btn-primary" value="Search"
                                                    onClick={handleSearchClick} >Search Now</button>
                                                <button className="btn btn-info" style={{ marginLeft: '20px', background: 'black', color: '#d8af72', border: '1px solid #d8af72' }} type="button" onClick={handleReset}>Reset <span><RotateLeftIcon /></span> </button>

                                            </center>
                                        </div>
                                    </div>


                                    <br />




                                </form>
                            </div>


                            <section className="content">
                                <div className="container-fluid" style={{ marginTop: '-35px' }}>
                                    <div className="row">


                                        <div className="col-12 mt-5">
                                            <div className="card  dashboard_boxes_main_dark">
                                                <div className="card-body" style={{ backgroundColor: '#000000' }}>
                                                    <div className="single-table">
                                                        <div className="table-responsive">
                                                            <ul className="nav nav-tabs nav-tabs-primary mb-4">
                                                                <li className="nav-item">
                                                                    <span style={{ cursor: 'pointer' }} className={`nav-link ${activeTab === 'transfer' ? 'active' : ''}`}
                                                                        onClick={() => handleTabClick('transfer')}><i className="icon-user" /> <span className="hidden-xs text-white">Transfer History</span></span>
                                                                </li>
                                                                <li className="nav-item">
                                                                    <span style={{ cursor: 'pointer' }} className={`nav-link ${activeTab === 'receive' ? 'active' : ''}`}
                                                                        onClick={() => handleTabClick('receive')}><i className="icon-user" /> <span className="hidden-xs text-white">Recieve History</span></span>
                                                                </li>
                                                            </ul>

                                                            <div className="tab-content">
                                                                <div id="tabe-1" className={`container tab-pane ${activeTab === 'transfer' ? 'active' : ''}`}>


                                                                    {activeTab === "transfer" && (
                                                                        <>

                                                                            <table className="table text-center">
                                                                                <thead className="text-capitalize">
                                                                                    <tr>
                                                                                        <th>Sr No.</th>
                                                                                        <th>From</th>
                                                                                        <th>To User Name</th>
                                                                                        <th>To User ID</th>
                                                                                        <th>Amount</th>

                                                                                        <th>Date</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {filteredData
                                                                                        .filter((item) => {
                                                                                            if (!fromDate && !toDate) {
                                                                                                // If no dates are selected, display all data
                                                                                                return true;
                                                                                            }

                                                                                            // Convert dates to Date objects
                                                                                            const itemDate = new Date(item.date);
                                                                                            const fromDateObj = fromDate ? new Date(fromDate) : null;
                                                                                            const toDateObj = toDate ? new Date(toDate) : null;

                                                                                            // Check if the item date falls within the selected date range
                                                                                            return (
                                                                                                (!fromDateObj || itemDate >= fromDateObj) &&
                                                                                                (!toDateObj || itemDate <= toDateObj)
                                                                                            );
                                                                                        })
                                                                                        .map((item, index) => (
                                                                                            <tr key={item.id}>
                                                                                                <td>{item.id}</td>
                                                                                                <td>{item.from}</td>
                                                                                                <td>{item.toUserName}</td>
                                                                                                <td>{item.toUserID}</td>
                                                                                                <td>{item.amount}</td>
                                                                                                <td>{item.date}</td>
                                                                                            </tr>
                                                                                        ))}
                                                                                </tbody>
                                                                            </table>
                                                                            <br /><br />
                                                                            <center>
                                                                                <div>
                                                                                </div>
                                                                            </center>
                                                                        </>
                                                                    )}


                                                                </div>
                                                                <div id="tabe-2" className={`container tab-pane ${activeTab === 'receive' ? 'active' : ''}`}>



                                                                    {activeTab === "receive" && (
                                                                        <>
                                                                            <table className="table text-center">
                                                                                <thead className="text-capitalize">
                                                                                    <tr>
                                                                                        <th>Sr no.</th>
                                                                                        <th>From</th>
                                                                                        <th>To User Name</th>
                                                                                        <th>To User ID</th>
                                                                                        <th>Amount</th>

                                                                                        <th>Date</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {filteredData
                                                                                        .filter((item) => {
                                                                                            if (!fromDate && !toDate) {
                                                                                                // If no dates are selected, display all data
                                                                                                return true;
                                                                                            }

                                                                                            // Convert dates to Date objects
                                                                                            const itemDate = new Date(item.date);
                                                                                            const fromDateObj = fromDate ? new Date(fromDate) : null;
                                                                                            const toDateObj = toDate ? new Date(toDate) : null;

                                                                                            // Check if the item date falls within the selected date range
                                                                                            return (
                                                                                                (!fromDateObj || itemDate >= fromDateObj) &&
                                                                                                (!toDateObj || itemDate <= toDateObj)
                                                                                            );
                                                                                        })
                                                                                        .map((item, index) => (
                                                                                            <tr key={item.id}>
                                                                                                <td>{item.id}</td>
                                                                                                <td>{item.from}</td>
                                                                                                <td>{item.toUser}</td>
                                                                                                <td>{item.toUserID}</td>
                                                                                                <td>{item.amount}</td>
                                                                                                <td>{item.date}</td>
                                                                                            </tr>
                                                                                        ))}
                                                                                </tbody>
                                                                            </table>
                                                                            <br /><br />
                                                                            <center>
                                                                                <div>
                                                                                </div>
                                                                            </center>
                                                                        </>
                                                                    )}


                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </section>

                        </div>

                    </div>
                </div>


            </div>

        </>
    )
}

export default InvestmentHistory;