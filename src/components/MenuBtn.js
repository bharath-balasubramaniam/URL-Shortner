import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        style={{ backgroundColor: "#ff8ba7", color: "#33272a" }}
      >
        Menu
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} disabled>
          Profile
        </MenuItem>
        <Link
          to="/login"
          style={{ textDecorationLine: "none", color: "#33272a" }}
        >
          <MenuItem onClick={handleClose}>Login</MenuItem>
        </Link>
        <MenuItem
          onClick={() => {
            window.localStorage.clear();
            history.push("/login");
            history.go(0);
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
