import { useEffect, useState } from "react";
// react-router-dom components
import { Link, useNavigate, useParams } from "react-router-dom";
// @mui material components
import Card from "@mui/material/Card";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
// Images
import curved6 from "assets/images/curved-images/curved14.jpg";
import { toast } from "react-toastify";
import { updateUser } from "helpers/apiCallHelper";
import { findUserByID } from "helpers/apiCallHelper";

function UpdateUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    findUser();
  }, []);

  const findUser = async () => {
    const res = await findUserByID(id);
    console.log(res.data);
    setFirstName(res.data.data.first_name);
    setLastName(res.data.data.last_name);
    setEmail(res.data.data.email);
  };
  async function handleSubmit(e) {
    e.preventDefault();
    const data = {
      first_name: firstName,
      last_name: lastName,
      email,
    };
    const response = await updateUser(id, data);
    console.log(response);
    if (response.status === 200) {
      toast.success(response.data.message);
      navigate("/authenticate/login");
    } else {
      toast.error("Something went wrong");
    }
    setFirstName("");
    setLastName("");
    setEmail("");
  }

  return (
    <BasicLayout
      title="Welcome!"
      description="Update your form."
      image={curved6}
    >
      <Card>
        <SoftBox pt={5} pb={3} px={3}>
          <SoftBox component="form" role="form" onSubmit={handleSubmit}>
            <SoftBox mb={2}>
              <SoftInput
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                required
                value={firstName}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                required
                value={lastName}
              />
            </SoftBox>
            <SoftBox mb={2}>
              <SoftInput
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
                value={email}
                disabled
              />
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton
                variant="gradient"
                color="dark"
                fullWidth
                type="submit"
              >
                Update
              </SoftButton>
            </SoftBox>
            <SoftBox mt={3} textAlign="center">
              <SoftTypography
                variant="button"
                color="text"
                fontWeight="regular"
              >
                Don't want to update?&nbsp;
                <SoftTypography
                  component={Link}
                  to="/tables"
                  variant="button"
                  color="dark"
                  fontWeight="bold"
                  textGradient
                >
                  Go to Dashboard
                </SoftTypography>
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default UpdateUser;
