import React, { useEffect, useState } from 'react'


function TotalIncom() {

    const [loading, setLoading] = useState(true);
    const [incomeDetails, setIncomedetails] = useState([]);

    const getincome = async () => {
       
    }
    useEffect(() => {
        // Simulate a delay to showcase the loading animation
        setTimeout(() => {
            setLoading(false);
        }, 5); // Change the delay as needed
        getincome();
        // You can also fetch data or perform other initialization here
    }, []);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center'  }}>
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

        </>
    )
}

export default TotalIncom;