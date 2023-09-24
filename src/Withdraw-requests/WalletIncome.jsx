import React, { useEffect, useRef, useState } from "react";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

import { TablePagination } from "@mui/material";
import { compareDesc } from "date-fns";
import CircularProgress from "@mui/material/CircularProgress";
import { withdrawHistory } from "../ApiHelpers";
import { useToasts } from "react-toast-notifications";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function WalletHistory() {
  const { addToast } = useToasts();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [loading, setLoading] = useState(true);
  const [loadings, setLoadings] = useState(true);
  const [data, setData] = useState([]);
  const dt = useRef(null);

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const cols = [
    { field: "userId", header: "User ID" },
    { field: "username", header: "Username" },
    { field: "amount", header: "Amount" },
    { field: "address", header: "Address" },
    { field: "isAccpected", header: "Status" },
    { field: "datetime", header: "Datetime" },
  ];

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);
        const exportColumns = cols.map((col) => ({
          title: col.header,
          dataKey: col.field,
        }));
        console.log(exportColumns);
        doc.autoTable(exportColumns, data);
        doc.save("fundTransfers.pdf");
      });
    });
  };

  const exportExcel = () => {
    import("xlsx").then((xlsx) => {
      const worksheet = xlsx.utils.json_to_sheet(data);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ["data"] };
      const excelBuffer = xlsx.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      saveAsExcelFile(excelBuffer, "fundTransfer");
    });
  };

  const saveAsExcelFile = (buffer, fileName) => {
    import("file-saver").then((module) => {
      if (module && module.default) {
        let EXCEL_TYPE =
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
        let EXCEL_EXTENSION = ".xlsx";
        const data = new Blob([buffer], {
          type: EXCEL_TYPE,
        });

        module.default.saveAs(
          data,
          fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
        );
      }
    });
  };

  const getAllRequests = async () => {
    let token = localStorage.getItem("authToken");
    if (!token) return;
    try {
      setLoadings(true);
      setLoading(true);
      let result = await withdrawHistory();
      setData(result.result);
      setLoading(false);
      setLoadings(false);
    } catch (err) {
      setLoading(false);
      setLoadings(false);
      if (err.code == "ERR_NETWORK") {
        addToast(err.message, { appearance: "error", autoDismiss: true });
      } else if (err.code == "ERR_BAD_REQUEST") {
        addToast(err.response.data.error, {
          appearance: "error",
          autoDismiss: true,
        });
      } else if (err.response.status) {
        addToast(err.response.data.error, {
          appearance: "error",
          autoDismiss: true,
        });
      }
    }
  };

  const header = (
    <div className="flex align-items-center justify-content-end gap-2">
      <Button
        type="button"
        value="CSV"
        icon="pi pi-file"
        rounded
        onClick={() => exportCSV(false)}
        data-pr-tooltip="CSV"
      >
        CSV
      </Button>
      <Button
        type="button"
        icon="pi pi-file-excel"
        severity="success"
        value="XLS"
        rounded
        onClick={exportExcel}
        data-pr-tooltip="XLS"
      >
        XLS
      </Button>
      <Button
        type="button"
        icon="pi pi-file-pdf"
        severity="warning"
        value="PDF"
        rounded
        onClick={exportPdf}
        data-pr-tooltip="PDF"
      >
        PDF
      </Button>
    </div>
  );
  const footer = `In total there are ${data ? data.length : 0} History.`;
  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;
  const statusTemplate = (row) => (
    <span>
      {row?.type == "Pending" && (
        <p style={{ color: "orange", fontWeight: "bold" }}>Pending</p>
      )}
      {row?.type == "Approved" && (
        <p style={{ color: "green", fontWeight: "bold" }}>Approved</p>
      )}
      {row?.tpe == "Rejected" && (
        <p style={{ color: "red", fontWeight: "bold" }}>Rejected</p>
      )}
    </span>
  );

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500); // Change the delay as needed
    getAllRequests();
  }, []);

  const handleReset = () => {
    getAllRequests();
  };

  return (
    <>
      {" "}
      <div className={`fade-in ${loading ? "" : "active"}`}>
        <div className="content-wrapper" style={{ minHeight: "512px" }}>
          {/* Content Header (Page header) */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0 text-dark"> Wallet History </h1>
                </div>
                {/* /.col */}
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item">
                      <a href="https://hammertradex.com">Home</a>
                    </li>
                    <li className="breadcrumb-item active">Transaction</li>
                  </ol>
                </div>
                {/* /.col */}
              </div>
              {/* /.row */}
            </div>
            {/* /.container-fluid */}
          </div>
          {/* Main content */}
          <section className="content">
            <div className="container-fluid" style={{ marginTop: "-35px" }}>
              <div className="row">
                {/* Primary table start */}
                <div className="col-12 mt-5">
                  <div className="card">
                    <div className="card-body">
                      <form role="form">
                        <input
                          type="hidden"
                          name="_token"
                          defaultValue="eLkpGsUBYr9izTDYhoNZCCY6pxm06c8hRkw1N41O"
                        />
                        <div
                          className="col-md-6 mb-6"
                          style={{ float: "left", marginTop: 10 }}
                        >
                          <div className="form-group">
                            <label>Pick a start date:</label>
                            <div
                              className="input-group date"
                              id="datepicker"
                              data-target-input="nearest"
                            >
                              <input
                                type="date"
                                className="form-control t"
                                placeholder="yyyy-mm-dd"
                                name="start_date"
                                onChange={(e) => setStartDate(e.target.value)}
                                value={startDate}
                              />
                            </div>
                          </div>
                        </div>
                        <div
                          className="col-md-6 mb-6"
                          style={{ float: "left", marginTop: 10 }}
                        >
                          <div className="form-group">
                            <label>Pick a end date:</label>
                            <div
                              className="input-group date"
                              id="datepicker1"
                              data-target-input="nearest"
                            >
                              <input
                                type="date"
                                className="form-control "
                                placeholder="yyyy-mm-dd"
                                name="end_date"
                                onChange={(e) => setEndDate(e.target.value)}
                                value={endDate}
                              />
                            </div>
                          </div>
                        </div>
                        <div style={{ clear: "both" }} />
                        <div
                          className="col-md-6 mb-6"
                          style={{ float: "left", marginTop: 10 }}
                        >
                          <label htmlFor="validationCustomUsername">
                            General Search
                          </label>
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Name,User ID"
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
                        <div style={{ clear: "both" }} />
                        <br />
                        <div className="col-md-12 mb-12">
                          <center>
                            <button
                              style={{
                                color: "black",
                                backgroundColor: "rgb(195 161 119)",
                              }}
                              className="btn btn-primary"
                            >
                              Search Now
                            </button>
                            <button
                              className="btn btn-info"
                              style={{
                                marginLeft: "20px",
                                background: "black",
                                color: "#d8af72",
                                border: "1px solid #d8af72",
                              }}
                              type="button"
                              onClick={handleReset}
                            >
                              Reset{" "}
                              <span>
                                <RotateLeftIcon />
                              </span>{" "}
                            </button>
                          </center>
                        </div>
                        <br />
                      </form>
                      <div className="single-table">
                        <div className="table-responsive">
                          {loadings ? (
                            <>
                              <div className="loader-container">
                                <CircularProgress sx={{ color: "orange" }} />
                              </div>
                            </>
                          ) : (
                            <>
                              <Tooltip
                                target=".export-buttons>button"
                                position="bottom"
                              />
                              {data.length > 0 ? (
                                <DataTable
                                  ref={dt}
                                  paginator
                                  rows={5}
                                  rowsPerPageOptions={[5, 10, 25, 50]}
                                  tableStyle={{ minWidth: "50rem" }}
                                  paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                  currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                  paginatorLeft={paginatorLeft}
                                  paginatorRight={paginatorRight}
                                  value={data}
                                  header={header}
                                  footer={footer}
                                >
                                  <Column
                                    field="id"
                                    sortable
                                    header="Sr.no"
                                  ></Column>
                                  <Column
                                    field="userId"
                                    sortable
                                    header="UserId"
                                  ></Column>
                                  <Column
                                    field="username"
                                    sortable
                                    header="Username"
                                  ></Column>
                                  <Column
                                    field="amount"
                                    sortable
                                    header="Amount"
                                  ></Column>
                                  <Column
                                    field="type"
                                    sortable
                                    body={statusTemplate}
                                    header="Type"
                                  ></Column>
                                  <Column
                                    dataType="date"
                                    field="datetime"
                                    sortable
                                    header="Datetime"
                                  ></Column>
                                </DataTable>
                              ) : (
                                <DataTable
                                  ref={dt}
                                  paginator
                                  rows={5}
                                  rowsPerPageOptions={[5, 10, 25, 50]}
                                  tableStyle={{ minWidth: "50rem" }}
                                  paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                                  currentPageReportTemplate="{first} to {last} of {totalRecords}"
                                  paginatorLeft={paginatorLeft}
                                  paginatorRight={paginatorRight}
                                  value={data}
                                  header={header}
                                  footer={footer}
                                  
                                ></DataTable>
                              )}
                            </>
                          )}

                          <br />
                          <br />
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
  );
}

export default WalletHistory;
