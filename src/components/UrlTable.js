import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import axios from "axios";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import styled from "styled-components";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import FileCopyIcon from "@material-ui/icons/FileCopy";

// import { InfoButton } from "./ViewModal";
// import { Link } from "react-router-dom";
import { UserState } from "../context/UserProvider";
import { Link } from "react-router-dom";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const columns = [
  { id: "id", label: "ID", minWidth: 50 },
  { id: "longUrl", label: "Long-Url", minWidth: 280 },
  {
    id: "shortUrl",
    label: "Short-Url",
    minWidth: 200,
  },
  {
    id: "clicks",
    label: "No. 0f Clicks",
    minWidth: 50,
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 60,
  },
];
const useStyles = makeStyles({
  root: {
    width: "97%",
    maxHeight: "100vh",
    margin: "1rem",
    backgroundColor: "#faeee7",
  },
  head: {},
  container: {
    maxHeight: 440,
  },
});
export default function UrlTable({ urls }) {
  const classes = useStyles();
  const [baseUrl] = useState(() =>
    process.env.NODE_ENV === "production"
      ? window.location.hostname
      : window.location.hostname + ":" + window.location.port
  );

  const { user } = UserState();
  const handleDelete = async (id) => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.delete(
        `https://url-shortner-be.herokuapp.com/api/url/delete/${id}`,
        config
      );
      alert("The Url is deleted !");
      window.location.reload();
    } catch (error) {
      if (error) console.log(error.message);
      return;
    }
  };
  return (
    <Paper className={classes.root}>
      <TableContainer
        className={classes.container}
        style={{ maxHeight: "100vh" }}
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    backgroundColor: "#f3d3c0",
                    minWidth: column.minWidth,
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {urls?.map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell
                    align={"left"}
                    style={{ maxWidth: "260px", overflow: "hidden" }}
                  >
                    {row.longUrl}
                  </TableCell>
                  <TableCell align={"left"}>
                    <Link
                      style={{
                        textDecoration: "none",
                        fontWeight: "700",
                        color: "#0dcaf0",
                        paddingRight: "2rem",
                      }}
                      to={`/${row.shortUrl}`}
                    >
                      {`${baseUrl}/${row.shortUrl}`}
                    </Link>
                    <FileCopyIcon
                      style={{ color: "#ff8ba7", cursor: "pointer" }}
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${baseUrl}/${row.shortUrl}`.trim()
                        );
                        alert("Copied");
                      }}
                    />
                  </TableCell>
                  <TableCell align={"left"}>{row.clicks}</TableCell>
                  <TableCell align={"right"}>
                    <ButtonWrapper>
                      <DeleteForeverIcon
                        style={{
                          color: "red",
                          fontSize: "30px",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          handleDelete(row._id);
                        }}
                      />
                    </ButtonWrapper>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
