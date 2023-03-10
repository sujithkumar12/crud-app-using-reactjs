import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { FaEdit, FaFileCsv, FaFilePdf } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ModalImage from "react-modal-image";
import { Button, IconButton, TextField } from "@mui/material";
import Modal from "./Modal/Modal";
import idContext from "../../store/IdContext";
import { MainURL, pdfHeaders } from "../../../variables/constants";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { exportCsv } from "../../store/Helper";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "asc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "index",
    numeric: false,
    disablePadding: true,
    label: "Index",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "email",
    numeric: true,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "phone",
    numeric: true,
    disablePadding: false,
    label: "Phone Number",
  },
  {
    id: "image",
    numeric: false,
    disablePadding: false,
    label: "Image",
  },
  {
    id: "actions",
    disablePadding: false,
    numeric: true,
    label: "",
  },
];

function EnhancedTableHead(props) {
  return (
    <TableHead>
      <TableRow>
        <TableCell></TableCell>
        {headCells.map((headCell) => (
          <TableCell
            sx={{
              fontFamily: "poppins",
              fontWeight: "bold",
              fontSize: "0.9rem",
            }}
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            <TableSortLabel>{headCell.label}</TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export function EnhancedTableToolbar(props) {
  const { numSelected, isAddModalOpen } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        paddingTop: "1rem",
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      <Typography
        sx={{
          flex: "1 1 100%",
          fontFamily: "poppins",
          display: {
            xs: "none",
            sm: "none",
            md: "block",
            lg: "block",
            xl: "block",
          },
        }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Employees
      </Typography>
      {props.children}
      <Button
        sx={{
          flex: "1 1 20%",
          height: "3rem",
          fontFamily: "poppins",
          color: "white",
          backgroundColor: "#009387",
          marginLeft: "1rem",
          fontWeight: "bold",
          ":hover": { backgroundColor: "#fff", color: "#000" },
        }}
        onClick={isAddModalOpen}
      >
        Add Employee
      </Button>
    </Toolbar>
  );
}

export default function EnhancedTable() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [empDataChange, setEmpDataChange] = React.useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [editId, setIsEditid] = React.useState("");
  const [editFname, setIsEditFname] = React.useState("");
  const [editLname, setIsEditLname] = React.useState("");
  const [editEmail, setIsEditEmail] = React.useState("");
  const [editPhone, setIsEditPhone] = React.useState("");
  const [editImage, setIsEditImage] = React.useState("");
  const [isRowLength, setIsRowLength] = React.useState(0);
  const [reducedValue, forceUpdate] = React.useReducer((x) => x + 1, 0);

  const userToken = localStorage.getItem("user-info");

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  React.useEffect(() => {
    axios({
      url: `${MainURL}/list_profile`,
      method: "get",
      headers: {
        autherization: userToken,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        setEmpDataChange(response.data.responseData);
        setIsRowLength(response.data.responseData.length);
      })
      .catch((err) => {
        toast.warn(err, toastOptions);
      });
  }, [reducedValue]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleExportCsv = () => {
    exportCsv();
  };

  const handleExportPdf = () => {
    const doc = new jsPDF();
    
    // doc.text("Employees", 20, 10);
    autoTable(doc, {
      margin: {top: 20},
      theme: "grid",
      body: empDataChange,
      bodyStyles: { minCellHeight: 15 },
      columnStyles: {
        0: { cellWidth: 14 },
        1: { cellWidth: 23 },
        2: { cellWidth: 23 },
        3: { cellWidth: 30 },
        4: { cellWidth: 45 },
        5: { cellWidth: 35 },
      },
      styles: { minCellHeight: 1 },
      columns: 
      pdfHeaders.map((c) => ({ header: c.label, dataKey: c.id })),
        // [
        //   {header : "Index", dataKey: "index"},
        //   {header: "First Name", dataKey: "first_name"},
        //   {header: "Last Name", dataKey: "last_name"},
        //   {header: "Phone Number", dataKey: "phone"},
        //   {header: "Email", dataKey: "email"},
        //   {header: "Image", dataKey: "image"}
        // ],
      didDrawCell: (data) => {
        if (data.section === "body" && data.column.index === 5) {
          doc.addImage(
            data.cell.raw,
            "JPEG, png, jpg, heic",
            data.cell.x + 2,
            data.cell.y + 2,
            31.5,
            25
          );
        }
      },
    });
    doc.save("crud-report.pdf");
  };

  const editFunction = (id, first_name, last_name, email, phone, image) => {
    setIsEditModalOpen(true);
    setIsEditid(id);
    setIsEditFname(first_name);
    setIsEditLname(last_name);
    setIsEditEmail(email);
    setIsEditPhone(phone);
    setIsEditImage(image);
  };

  const deleteFunction = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch(`${MainURL}/delete_profile/${id}`, {
        method: "DELETE",
        headers: {
          autherization: userToken,
        },
      })
        .then((resp) => {
          toast.success("Data removed", toastOptions);
          forceUpdate();
        })
        .catch((err) => {
          toast.error(err.message, toastOptions);
        });
    }
  };

  const searchHandle = (event) => {
    if (event.target.value === "") {
      forceUpdate(empDataChange);
    }

    axios({
      url: `${MainURL}/search/${event.target.value}`,
      method: "get",
      headers: {
        autherization: userToken,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.data.responseCode === 200) {
          setEmpDataChange(response.data.responseData);
          setIsRowLength(response.data.responseData.length);
        } else if (response.data.responseCode === 212) {
          setEmpDataChange("");
          setIsRowLength((response.data.responseData.length = 0));
        } else {
          toast.warn(response.data.responseMessage, toastOptions);
        }
      })
      .catch((err) => {
        toast.error(err, toastOptions);
      });
  };

  return (
    <idContext.Provider
      value={{ editId, editFname, editLname, editEmail, editPhone, editImage }}
    >
      <Box
        sx={{
          width: { sm: "100%", md: "100%" },
        }}
      >
        <Paper
          sx={{
            width: {
              xs: "100%",
              sm: "100%",
              md: "100%",
              lg: "100%",
              xl: "100%",
            },
            height: { xs: "100%" },
            mb: 2,
          }}
        >
          <EnhancedTableToolbar
            isAddModalOpen={() => setIsAddModalOpen(true)}
            setEmpDataChange={setEmpDataChange}
          >
            <IconButton
              sx={{
                height: "3rem",
                fontFamily: "poppins",
                color: "black",
                ":hover": { backgroundColor: "#fff", color: "#009387" },
              }}
              onClick={handleExportPdf}
            >
              {/* <PDFDownloadLink document={<PDFFile />} fileName="crud"> */}

              <FaFilePdf />
              {/* <button><FaFilePdf /></button> */}
              {/* </PDFDownloadLink> */}
            </IconButton>
            <IconButton
              sx={{
                height: "3rem",
                fontFamily: "poppins",
                color: "black",
                marginRight: "0.5rem",
                ":hover": { backgroundColor: "#fff", color: "#009387" },
              }}
              onClick={handleExportCsv}
            >
              <FaFileCsv />
            </IconButton>
            <TextField
              label="Search"
              sx={{ flex: "1 1 25%" }}
              InputLabelProps={{ style: { fontFamily: "poppins" } }}
              inputProps={{ style: { fontFamily: "poppins" } }}
              variant="outlined"
              onChange={searchHandle}
            />
          </EnhancedTableToolbar>
          <TableContainer>
            <Table
              className="tableee pdfTable"
              sx={{
                overflow: "hidden",
              }}
              aria-labelledby="tableTitle"
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={setEmpDataChange.length}
              />
              <TableBody>
                {empDataChange &&
                  stableSort(empDataChange, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow hover tabIndex={-1} key={row.first_name}>
                          <TableCell padding="checkbox"></TableCell>
                          <TableCell
                            // align="right"
                            sx={{ fontFamily: "poppins" }}
                          >
                            {row.index}
                          </TableCell>
                          <TableCell
                            sx={{ fontFamily: "poppins" }}
                            component="th"
                            scope="row"
                            padding="none"
                          >
                            {row.first_name + " " + row.last_name}
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{ fontFamily: "poppins" }}
                          >
                            {row.email}
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{ fontFamily: "poppins" }}
                          >
                            {row.phone}
                          </TableCell>
                          <TableCell align="right">
                            <ModalImage
                              small={row.image}
                              className="w-20 cursor-pointer text-left h-20 rounded-2xl imagge"
                              large={row.image}
                              alt={row.first_name + " " + row.last_name}
                              hideZoom={true}
                              hideDownload={true}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <button
                              className="px-6 bg-teal-500 py-1 rounded"
                              onClick={() =>
                                editFunction(
                                  row.id,
                                  row.first_name,
                                  row.last_name,
                                  row.email,
                                  row.phone,
                                  row.image
                                )
                              }
                            >
                              <FaEdit color="#f2f2f2" />
                            </button>
                            <button
                              className="px-6 bg-red-500 ml-4 py-1 rounded"
                              onClick={() => deleteFunction(row.id)}
                            >
                              <MdDelete color="white" />
                            </button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            sx={{ fontFamily: "poppins" }}
            rowsPerPageOptions={[5, 10, 15, 20, 25]}
            component="div"
            count={isRowLength}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <Modal
            isEditModalOpen={isEditModalOpen}
            onClosee={() => setIsEditModalOpen(false)}
            isAddModalOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            forceUpdate={forceUpdate}
          />
        </Paper>
      </Box>
      <ToastContainer />
    </idContext.Provider>
  );
}
