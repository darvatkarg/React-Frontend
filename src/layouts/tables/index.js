// @mui material components
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";
// Data
import Author, { Function } from "./data/authorsTableData";
import { useEffect, useState } from "react";
import { findAllUsers } from "helpers/apiCallHelper";
import { Icon } from "@mui/material";
import { deleteUser } from "helpers/apiCallHelper";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Tables() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    fetchDetails();
  }, []);

  const handleDeleteUser = async (id) => {
    try {
      const deleteData = await deleteUser(id);
      if (deleteData.status === 200) {
        toast.success(deleteData.data.message);
      } else {
        toast.error("Something went wrong");
      }
      fetchDetails();
      console.log(deleteData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function fetchDetails() {
    const res = await findAllUsers();
    console.log("res", res.data);
    if (res.status === 200) {
      toast.success(res.data.message);
    } else {
      toast.error("No users found");
    }
    setUsers(res.data.data);
  }

  const navigate = useNavigate();

  const authorsTableData = {
    columns: [
      { name: "fullname", width: "38%", align: "left" },
      { name: "email", width: "35%", align: "left" },
      { name: "edit", width: "4%", align: "center" },
      { name: "view", width: "4%", align: "center" },
      { name: "delete", width: "4%", align: "center" },
    ],

    rows: users.map((user) => {
      return {
        fullname: <Author name={`${user.first_name} ${user.last_name}`} />,
        email: <Function email={user.email} />,
        edit: (
          <SoftTypography
            style={{ cursor: "pointer" }}
            fontSize="large"
            variant="caption"
            color="text"
            fontWeight="medium"
            // onClick={() => navigate(`/authentication/update/${user.id}`)}
            onClick={() => navigate(`/authentication/update`)}
          >
            <Icon>edit</Icon>
          </SoftTypography>
        ),
        view: (
          <SoftTypography
            style={{ cursor: "pointer" }}
            fontSize="large"
            variant="caption"
            color="text"
            fontWeight="medium"
            onClick={() => handleOpen(user)}
          >
            <Icon>visibility</Icon>
          </SoftTypography>
        ),
        delete: (
          <SoftTypography
            style={{ cursor: "pointer" }}
            fontSize="large"
            variant="caption"
            color="text"
            fontWeight="medium"
            onClick={() => handleDeleteUser(user.id)}
          >
            <Icon color="error">delete</Icon>
          </SoftTypography>
        ),
      };
    }),
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={3}
            >
              <SoftTypography variant="h6">Authors table</SoftTypography>
            </SoftBox>
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table
                columns={authorsTableData.columns}
                rows={authorsTableData.rows}
              />
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ textAlign: "center" }}>User Details</DialogTitle>
        <DialogContent>
          <SoftTypography variant="h6">
            Full Name: {selectedUser?.first_name} {selectedUser?.last_name}
          </SoftTypography>
          <br />
          <SoftTypography variant="h6">
            Email: {selectedUser?.email}
          </SoftTypography>
        </DialogContent>
        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default Tables;
