import React, { useEffect, useRef, useState } from "react";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import "../StyleFolder/style.css";

import CircularProgress from "@mui/material/CircularProgress";
import { getdepositedata } from "../ApiHelpers";
import { useToasts } from "react-toast-notifications";

import { useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../Constants";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";

function AllDeposite() {
  const { addToast } = useToasts();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Set the initial rowsPerPage to 5

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // Initially, set loading to true
  const [loadings, setLoadings] = useState(true);
  const [data, setData] = useState([]);
  const dt = useRef(null);

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const cols = [
    { field: "id", header: "Id" },
    { field: "amount", header: "Amount" },
    { field: "image", header: "Image" },
    { field: "status", header: "Status" },
    { field: "message", header: "Message" },
    { field: "createdAt", header: "Datetime" },
  ];

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);
        const exportColumns = cols.map((col) => ({
          title: col.header,
          dataKey: col.field,
        }));        
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
  const footer = `In total there are ${data ? data.length : 0} Deposits.`;
  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;
  const imageTemplate = (data) => (
    <img src={IMAGE_URL + data.image} height={40} width={40} />
  );
  const statusTemplate = (row) => (
    <span>
      {row?.status == 0 && (
        <p style={{ color: "orange", fontWeight: "bold" }}>Pending</p>
      )}
      {row?.status == 1 && (
        <p style={{ color: "green", fontWeight: "bold" }}>Approved</p>
      )}
      {row?.status == 2 && (
        <p style={{ color: "red", fontWeight: "bold" }}>Rejected</p>
      )}
    </span>
  );
  const dateTemplate = (row) => {
    const createdAt = new Date(row?.createdAt);
    const formattedDate = createdAt.toLocaleDateString();
    const formattedTime = createdAt.toLocaleTimeString();
    return formattedDate + " " + formattedTime;
  };

  const handlegetdata = async () => {
    try {
      let result = await getdepositedata();
      console.log(result.result, "result");
      setData(result.result);
    } catch (err) {
      console.log(err, "err");
      if (err.code == "ERR_NETWORK") {
        addToast(err.message, { appearance: "error", autoDismiss: true });
      } else if (err.code == "ERR_BAD_REQUEST") {
        addToast(err.response.data.error, {
          appearance: "error",
          autoDismiss: true,
        });
      } else if (err.response.status) {
        addToast(err.response.data, { appearance: "error", autoDismiss: true });
      }
    }
  };

  const handleReset = (e) => {
    handlegetdata();
  }

  useEffect(() => {
    setTimeout(() => {
      setLoadings(false);
    }, 1500); // Change the delay as needed
    handlegetdata();
  }, []);

  const handlerenew = async (id) => {
    // navigate(`${id}`)
    navigate(`/AllUsers/${id}`);
  };

  return (
    <>
      <div className="content-wrapper" style={{ minHeight: "706.4px" }}>
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0 text-dark">All Deposite</h1>
              </div>
              {/* /.col */}
              <div className="col-sm-6">
                <ol className="breadcrumb float-sm-right">
                  <li className="breadcrumb-item">
                    <a href="https://hammertradex.com">Home</a>
                  </li>
                  <li className="breadcrumb-item active">All Users</li>
                </ol>
              </div>
              {/* /.col */}
            </div>
            {/* /.row */}
          </div>
          {/* /.container-fluid */}
        </div>

        <section className="content">
          <div className="container-fluid" style={{ marginTop: "-35px" }}>
            <div className="row">
              {/* Primary table start */}
              <div className="col-12 mt-5">
                <div className="card">
                  <div className="card-body">
                    <form role="form" type="submit">
                      {/* <input type="hidden" name="_token" defaultValue="eLkpGsUBYr9izTDYhoNZCCY6pxm06c8hRkw1N41O" /> */}
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
                      <div
                        className="col-md-6 mb-6"
                        style={{ float: "left", marginTop: 10 }}
                      >
                        <label htmlFor="validationCustomUsername">
                          Search By status
                        </label>
                        <select
                          className="custom-select selectbox"
                          style={{
                            backgroundColor: "rgb(39 39 39)",
                            border: "none",
                            padding: "9px 5px",
                            height: "3rem",
                          }}
                          name="status"
                          value={selectedStatus}
                          onChange={(e) => setSelectedStatus(e.target.value)}
                        >
                          <option value> ----Select---- </option>
                          <option> Pending </option>
                          <option>Reject</option>
                          <option>Approve</option>
                        </select>
                      </div>

                      <div style={{ clear: "both" }} />
                      <br />
                      <div className="row">
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
                              onClick={handleReset}
                              type="button"
                            >
                              Reset{" "}
                              <span>
                                <RotateLeftIcon />
                              </span>{" "}
                            </button>
                          </center>
                        </div>
                      </div>
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
                                  header="Id"
                                ></Column>
                                <Column
                                  field="amount"
                                  sortable
                                  header="Amount"
                                ></Column>
                                <Column
                                  field="image"
                                  sortable
                                  header="Image"
                                  body={imageTemplate}
                                ></Column>
                                <Column
                                  field="status"
                                  sortable
                                  body={statusTemplate}
                                  header="Status"
                                ></Column>
                                <Column
                                  field="message"
                                  sortable
                                  header="Message"
                                ></Column>
                                <Column
                                  dataType="date"
                                  field="createdAt"
                                  sortable
                                  body={dateTemplate}
                                  header="Datetime"
                                ></Column>
                              </DataTable>
                            ) : (
                              ""
                            )}
                          </>
                        )}
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
    </>
  );
}

export default AllDeposite;
