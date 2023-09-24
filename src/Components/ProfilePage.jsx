import React, { useState, useEffect, useRef, useContext } from "react";
import "../StyleFolder/ReferealPage.css";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton, Tooltip } from "@material-tailwind/react";
import { tooltipClasses } from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { AuthContext } from "../Context/AuthContext";
import { APP_URL } from "../Constants";
import { resetPassword } from "../ApiHelpers";
import { useToasts } from "react-toast-notifications";
import copy from "copy-to-clipboard";

const ProfilePage = ({ userDataa }) => {
  const {addToast} = useToasts();
  const [activeTab, setActiveTab] = useState("personalData");
  const {userDetail} = useContext(AuthContext);
  const [userData, setUserData] = useState({
    name: "",
  });
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const copyToClipboard = (url) => {
    copy(url);
    alert(`Copied`);
}

  const handleChangePassword = async (e) => {
    e.preventDefault();
    let oldpassword = e.target.oldpassword.value;
    let newpassword = e.target.newpassword.value;
    let confirmpassword = e.target.conpassword.value;

    if(!oldpassword){
      addToast("Please enter old password", {appearance: "error",autoDismiss: true});
      return;
    }
    if(!newpassword){
      addToast("Please enter new password", {appearance: "error",autoDismiss: true});
      return;
    }
    if(!confirmpassword){
      addToast("Please enter confirm password", {appearance: "error",autoDismiss: true});
      return;
    }

    if(newpassword != confirmPassword){
      addToast("New password must be same as confirm password", {appearance: "error",autoDismiss: true});
      return;
    }

    try{
      let result = await resetPassword({password:newpassword});
      addToast(result.message, {appearance: "success",autoDismiss: true});
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    }catch(err){
      if(err.code == "ERR_NETWORK"){
          addToast(err.message, {appearance: "error",autoDismiss: true});
      }   
      else if(err.code == "ERR_BAD_REQUEST"){
          addToast(err.response.data.error, {appearance: "error",autoDismiss: true});
      }
      else if(err.response.status){
          addToast(err.response.data, {appearance: "error",autoDismiss: true});
      }      
    }
  };
  

  const openDialog = () => {
    setIsDialogOpen(true);
    setNewName(userData?.name); // Initialize the input with the current name
  };

  const handleUpdateName = () => {
    // Update the user's name here (you can dispatch an action or make an API call)
    // After successful update, close the dialog and update the local state
    setIsDialogOpen(false);
    setUserData({ ...userData, name: newName });
  };

  return (
    <>
      <div
        className=" ml-4 my-3 px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg bg-black"
        style={{ minHeight: "675.2px" }}
      >
        <section className=" light_border ">
          <h2 className="mb-3 pr-2 text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-[#c3a177]">
            My Profile{" "}
          </h2>
        </section>

        <section
          className="profile_main_section"
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px 40px",
          }}
        >
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="row gutters">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <ul
                          className="nav nav-tabs light_border"
                          id="myTab"
                          role="tablist"
                        >
                          <li className="nav-item" role="presentation">
                            <button
                              className={`nav-link ${activeTab === "personalData" ? "active" : ""
                                }`}
                              onClick={() => handleTabClick("personalData")}
                            >
                              Personal Data
                            </button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button
                              className={`nav-link ${activeTab === "ReferralDetails" ? "active" : ""
                                }`}
                              onClick={() => handleTabClick("ReferralDetails")}
                            >
                              Referral Details
                            </button>
                          </li>
                          <li className="nav-item" role="presentation">
                            <button
                              className={`nav-link ${activeTab === "changePassword" ? "active" : ""
                                }`}
                              onClick={() => handleTabClick("changePassword")}
                            >
                              Change Password
                            </button>
                          </li>
                        </ul>
                        {/* <div className="tab-content" id="myTabContent"> */}
                        {activeTab === "personalData" && (
                          <div
                            style={{ color: "white", textAlign: "left" }}
                            className="tab-pane fade show active"
                            id="home"
                            role="tabpanel"
                            aria-labelledby="home-tab"
                          >
                            <section className>
                              <div
                                style={{ justifyContent: "center" }}
                                className="row"
                              >

                                <div className="col-lg-8 col-md-8 col-sm-12">

                                  <div className="dashboard_boxes_main_dark">




                                    {/* Dialog for updating name */}
                                    <Dialog
                                      open={isDialogOpen}
                                      onClose={() => setIsDialogOpen(false)}
                                    >
                                      <DialogTitle>Update Name</DialogTitle>
                                      <DialogContent>
                                        <TextField
                                          label="Name"
                                          variant="outlined"
                                          fullWidth
                                          value={newName}
                                          onChange={(e) => setNewName(e.target.value)}
                                        />
                                      </DialogContent>
                                      <DialogActions>
                                        <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                                        <Button onClick={handleUpdateName} color="primary">
                                          Update
                                        </Button>
                                      </DialogActions>
                                    </Dialog>

                                    <div className="profile_section_tabs_inner_main">

                                      <div className="form_main_div">


                                        <form role="form">
                                          <input
                                            type="hidden"
                                            name="_token"
                                            defaultValue="b66aFctTonKhd73PjlzMG7wu4Oj0Wd3BFxkyEZXS"
                                          />
                                          <div className="row gutters">
                                            <div
                                              style={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                              }}
                                              className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12"
                                            >
                                              <h4
                                                style={{
                                                  color: "rgb(195 161 119)",
                                                }}
                                                className="mb-3 "
                                              >
                                                Personal Details
                                              </h4>
                                            </div>
                                            <div className="form-group">
                                              {" "}
                                              <label htmlFor="validationCustomUsername">
                                                User ID
                                              </label>
                                              <input
                                                type="text"
                                                className="form-control input_box"
                                                readOnly={!isEditing}
                                                placeholder={userData?.username}
                                                required
                                                disabled
                                                value={userDetail.userId ? userDetail.userId : ""}
                                              />
                                              {/* // )} */}
                                            </div>
                                            <div className="form-group">
                                              <label htmlFor="validationCustomUsername">
                                                Expiry Date
                                              </label>
                                              <input
                                                type="text"
                                                className="form-control input_box"
                                                value="Unlimited"
                                                readOnly={!isEditing}
                                                placeholder={
                                                  userData?.pack_expiry
                                                }
                                                
                                                required
                                                disabled
                                              />
                                              {/* <p>{userData?.pack_expiry}</p> */}
                                              {/* // )} */}
                                            </div>
                                            <div className="form-group">
                                              <label htmlFor="validationCustom01">
                                                Username
                                              </label>
                                              {isEditing ? (
                                                <input
                                                  type="text"
                                                  className="form-control input_box"
                                                  value={userDetail.username ? userDetail.username : ""}
                                                  placeholder="Name"
                                                  required
                                                />
                                              ) : (
                                                <input
                                                  type="text"
                                                  className="form-control input_box"                                                  
                                                  value={userDetail.username ? userDetail.username : ""}
                                                  onChange={(e) =>
                                                    setUserData({
                                                      ...userData,
                                                      name: e.target.value,
                                                    })
                                                  }
                                                  readOnly={!isEditing}
                                                  placeholder={userData?.name}
                                                  required
                                                  disabled
                                                />
                                              )}
                                            </div>
                                            <div className="form-group">
                                              <label htmlFor="validationCustom02">
                                                Email
                                              </label>
                                              {/* <p>{userData?.email}</p> */}
                                              <input
                                                type="text"
                                                className="form-control input_box"
                                                required
                                                disabled
                                                value={userDetail.email ? userDetail.email : ""}
                                              />
                                              {/* )} */}
                                            </div>
                                            <div className="form-group">
                                              <label htmlFor="validationCustomUsername">
                                                Mobile Number
                                              </label>
                                              <input
                                                type="text"
                                                className="form-control input_box"                                                
                                                required
                                                disabled
                                                value={userDetail.mobileNo ? userDetail.mobileNo : ""}
                                              />
                                            </div>
                                            {/* Edit Name button */}

                                            <button type="button" style={{ float: 'right', marginTop: '10px' }}
                                              className="btn btn-primary"
                                              onClick={openDialog}
                                            >
                                              Edit Name
                                            </button>
                                          </div>

                                        </form>

                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </section>
                          </div>
                        )}

                        {activeTab === "ReferralDetails" && (
                          <section className="profile_main_section">
                            <div
                              style={{ justifyContent: "center" }}
                              className="row"
                            >
                              <div className="col-lg-12 col-md-8 col-sm-12">
                                <div className="dashboard_boxes_main_dark">
                                  <div
                                    style={{ color: "white" }}
                                    className="profile_section_tabs_inner_main"
                                  >
                                    <div
                                      style={{ color: "white" }}
                                      className="refer_link_main"
                                    >
                                      <p
                                        style={{ color: "#c3a177 !important" }}
                                      >
                                        Referral Link
                                      </p>
                                      <div className="refer_link">
                                        <p className="flex justify-between items-center w-full">
                                          <p
                                            style={{ overflowWrap: "anywhere" }}
                                          >
                                            {userDetail.userId ? `${APP_URL}/register?refferalCode=${userDetail.userId}` : ''}
                                          </p>
                                          <p>
                                            <Tooltip
                                              content="Copy"
                                              sx={{ color: "black" }}
                                            >
                                              <IconButton
                                                variant="text"
                                                color="blue-gray"
                                                onClick={()=>copyToClipboard(userDetail.userId ? `${APP_URL}/register?refferalCode=${userDetail.userId}` : '')}
                                              >
                                                <ContentCopyIcon className="h-5 w-5" />
                                              </IconButton>
                                            </Tooltip>
                                          </p>
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                        )}

                        {activeTab === "changePassword" && (
                          <div
                            className="tab-pane fade show active"
                            id="home"
                            role="tabpanel"
                            aria-labelledby="home-tab"
                          >
                            <section className>
                              <div
                                style={{ justifyContent: "center" }}
                                className="row"
                              >
                                <div className="col-lg-8 col-md-8 col-sm-12">
                                  <div className="dashboard_boxes_main_dark">
                                    <div className="profile_section_tabs_inner_main">
                                      <h2
                                        style={{
                                          color: "rgb(195 161 119)",
                                          textAlign: "left",
                                        }}
                                        className="other_heading"
                                      >
                                        Change Password
                                      </h2>
                                      <div className="form_main_div">
                                        <form onSubmit={handleChangePassword}>
                                          <div className="input_box_div">
                                            <label htmlFor="fname">
                                              Old Password:
                                            </label>
                                            <input
                                              className="input_box"
                                              type="password"
                                              name="oldpassword"
                                              value={oldPassword}
                                              onChange={(e) =>
                                                setOldPassword(e.target.value)
                                              }
                                              placeholder="Old Password"
                                            />
                                          </div>
                                          <div className="input_box_div">
                                            <label htmlFor="fname">
                                              New Password:
                                            </label>
                                            <input
                                              className="input_box"
                                              type="password"
                                              name="newpassword"
                                              value={newPassword}
                                              onChange={(e) =>
                                                setNewPassword(e.target.value)
                                              }
                                              placeholder="New Password"
                                            />
                                          </div>
                                          <div className="input_box_div">
                                            <label htmlFor="fname">
                                              Confirm Password:
                                            </label>
                                            <input
                                              className="input_box"
                                              type="password"
                                              name="conpassword"
                                              value={confirmPassword}
                                              onChange={(e) =>
                                                setConfirmPassword(
                                                  e.target.value
                                                )
                                              }
                                              placeholder="Confirm password"
                                            />
                                          </div>
                                      
                                             

                                          <div className="dash_second_col_third ">
                                            <input
                                              style={{
                                                marginTop: "20px",
                                                padding: "5px",
                                                width: "100%",
                                                border: "none",
                                                backgroundColor:
                                                  "rgb(195 161 119)",
                                              }}
                                              type="submit"
                                              className="button_submit"
                                            />
                                          </div>
                                        </form>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </section>
                          </div>
                        )}
                        {/* </div> */}
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
  );
};

export default ProfilePage;
