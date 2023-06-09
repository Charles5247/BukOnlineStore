import { AppBar, Toolbar, Typography, Button, Container } from "@mui/material";
import { Link, Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/customer"
            style={{ textDecoration: "none", color: "inherit" }}>
            My Store
          </Typography>
          <Button color="inherit" component={Link} to="/customer/cart">
            Cart
          </Button>
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
