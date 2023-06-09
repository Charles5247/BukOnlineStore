import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

export default function VendorRoot() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/vendor"
            style={{ textDecoration: "none", color: "inherit" }}>
            My Store
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" style={{ marginTop: "2rem" }}>
        <div id="detail">
          <Outlet />
        </div>
      </Container>
    </>
  );
}
