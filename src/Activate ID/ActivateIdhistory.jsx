import React, { useState } from 'react'

function FundActivateID() {
    const [activeTab, setActiveTab] = useState('transfer');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };


    const handleFromDateChange = (event) => {
        setFromDate(event.target.value);
    };

    const handleToDateChange = (event) => {
        setToDate(event.target.value);
    };

    return (
        <>
            <div className="content-wrapper" style={{ minHeight: 1016 }}>

                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="welcome_heading">Active New Member</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="https://hammertradex.com">Home</a></li>
                                    <li className="breadcrumb-item active">Active New Member</li>
                                </ol>
                            </div>
                        </div>
                        {/* <form id="tabclick1" method="POST">
                            <input type="hidden" name="_token" defaultValue="1nP1Eivu6Q7kjHazoDkNoRSz830zT2SDmcSnZmAy" />                        <div className="row">
                                <div className="form-group col-md-3"><lable>From Date

                                </lable>
                                    <input type="date" className="form-control input_box" defaultValue id="fdate" name="fdate" value={fromDate}
                                        onChange={handleFromDateChange} /></div>
                                <div className="form-group col-md-3"><lable>To Date

                                </lable>
                                    <input type="date" className="form-control input_box" defaultValue id="tdate" name="tdate" value={toDate}
                                        onChange={handleToDateChange} /></div>
                                <div className="form-group col-md-3">
                                    <br />
                                    <input type="button" className="form-control btn btn-info" defaultValue="Search" name onClick={() => handleTabClick(activeTab)} />
                                </div>
                            </div>
                        </form> */}
                    </div>
                </div>

                <section className="content">
                    <div className="container-fluid" style={{ marginTop: '-35px' }}>
                        <div className="row">

                            <div className="col-12 mt-5">
                                <div className="card  dashboard_boxes_main_dark">
                                    <div className="card-body" style={{ backgroundColor: '#000000' }}>
                                        <div className="single-table">
                                            <div className="table-responsive">
                                                <ul className="nav nav-tabs nav-tabs-primary">
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
                                                                            <th>To User</th>
                                                                            <th>To User ID</th>
                                                                            <th>Amount</th>

                                                                            <th>Date</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td>1</td>
                                                                            <td>htxtradex</td>
                                                                            <td />
                                                                            <td />
                                                                            <td>2500.00 TRX</td>

                                                                            <td>2023-02-22 12:52 pm</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>2</td>
                                                                            <td>htxtradex</td>
                                                                            <td>HTX2653</td>
                                                                            <td>Krishna</td>
                                                                            <td>10000.00 TRX</td>

                                                                            <td>2023-02-24 04:46 pm</td>
                                                                        </tr>
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
                                                                            <th>To User</th>
                                                                            <th>To User ID</th>
                                                                            <th>Amount</th>

                                                                            <th>Date</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td colSpan={7}>Result Not Found</td>
                                                                        </tr>
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

        </>
    )
}

export default FundActivateID;