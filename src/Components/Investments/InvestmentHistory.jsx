import React, { useContext, useEffect, useRef, useState } from "react";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { investmentHistory } from "../../ApiHelpers";
import { useToasts } from "react-toast-notifications";
import { AuthContext } from "../../Context/AuthContext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Tooltip } from "primereact/tooltip";
import { Column } from "primereact/column";
import { CircularProgress } from "@mui/material";

function InvestmentHistory() {
  const { addToast } = useToasts();
  const { userDetail } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("transfer");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [loadings, setLoadings] = useState(true);
  const [data, setData] = useState([]);
  const dt = useRef(null);

  const exportCSV = (selectionOnly) => {
    dt.current.exportCSV({ selectionOnly });
  };

  const cols = [
    { field: "id", header: "Id" },
    { field: "fromUsername", header: "From Username" },
    { field: "toUsername", header: "To Username" },
    { field: "userId", header: "UserId" },
    { field: "amount", header: "Amount" },
    { field: "createAt", header: "Datetime" },
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
  const footer = `In total there are ${data ? data.length : 0} Invesments.`;
  const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
  const paginatorRight = <Button type="button" icon="pi pi-download" text />;
  const dateTemplate = (row) => {
    const createdAt = new Date(row?.createdAt);
    const formattedDate = createdAt.toLocaleDateString();
    const formattedTime = createdAt.toLocaleTimeString();
    return formattedDate + " " + formattedTime;
  };
  const investmenthistory = async () => {
    let token = localStorage.getItem("authToken");
    if (!token) return;
    try {
      setData([]);
      setLoadings(true);
      let result = await investmentHistory();
      setLoadings(false);
      let data = result;
      console.log(data.result, data.result);
      setData(data.result);
    } catch (err) {
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

  const handleReset = () => {
    investmenthistory();
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500); // Change the delay as needed
    investmenthistory();
  }, []);

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
                  <li className="breadcrumb-item">
                    <a href="https://hammertradex.com">Home</a>
                  </li>
                  <li className="breadcrumb-item active">Active New Member</li>
                </ol>
              </div>
            </div>
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
                      {" "}
                      General Search
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Name, User ID , Mobile No."
                        name="userid"
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

                  <div style={{ clear: "both" }} />
                  <br />
                  <div className="row">
                    <div className="col-md-12 mb-12">
                      <center>
                        <button
                          type="button"
                          style={{
                            color: "black",
                            backgroundColor: "rgb(195 161 119)",
                          }}
                          className="btn btn-primary"
                          value="Search"
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
                  </div>

                  <br />
                </form>
              </div>

              <section className="content">
                <div className="container-fluid" style={{ marginTop: "-35px" }}>
                  <div className="row">
                    <div className="col-12 mt-5">
                      <div className="card  dashboard_boxes_main_dark">
                        <div
                          className="card-body"
                          style={{ backgroundColor: "#000000" }}
                        >
                          <div className="single-table">
                            <div className="table-responsive">
                              <ul className="nav nav-tabs nav-tabs-primary mb-4">
                                <li className="nav-item">
                                  <span
                                    style={{ cursor: "pointer" }}
                                    className={`nav-link ${
                                      activeTab === "transfer" ? "active" : ""
                                    }`}
                                  >
                                    <i className="icon-user" />{" "}
                                    <span className="hidden-xs text-white">
                                      Investment History
                                    </span>
                                  </span>
                                </li>
                                {/* <li className="nav-item">
                                                                    <span style={{ cursor: 'pointer' }} className={`nav-link ${activeTab === 'receive' ? 'active' : ''}`}
                                                                        onClick={() => handleTabClick('receive')}><i className="icon-user" /> <span className="hidden-xs text-white">Recieve History</span></span>
                                                                </li> */}
                              </ul>

                              <div className="tab-content">
                                <div
                                  id="tabe-1"
                                  className={`container tab-pane ${
                                    activeTab === "transfer" ? "active" : ""
                                  }`}
                                >
                                  {activeTab === "transfer" && <></>}
                                </div>
                                <div
                                  id="tabe-2"
                                  className={`container tab-pane ${
                                    activeTab === "receive" ? "active" : ""
                                  }`}
                                >
                                  {activeTab === "receive" && <></>}
                                </div>

                                {loadings ? (
                                  <>
                                    <div className="loader-container">
                                      <CircularProgress
                                        sx={{ color: "orange" }}
                                      />
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
                                          field="fromUsername"
                                          sortable
                                          header="From Username"
                                        ></Column>
                                        <Column
                                          field="toUsername"
                                          sortable
                                          header="To Username"
                                        ></Column>
                                        <Column
                                          field="userId"
                                          sortable
                                          header="UserId"
                                        ></Column>
                                        <Column
                                          field="amount"
                                          sortable
                                          header="Amount"
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
  );
}

export default InvestmentHistory;
