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
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ModalImage from "react-modal-image";
import { Button, TextField } from "@mui/material";
import Modal from "./Modal/Modal";
import idContext from "../../store/IdContext";
import { MainURL } from "../../../variables/constants";
import axios from "axios";
import { async } from "@firebase/util";

function createData(name, email, phone, image, actions) {
  return {
    name,
    email,
    phone,
    image,
    actions,
  };
}

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
  return order === "desc"
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
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

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
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export function EnhancedTableToolbar(props) {
  const { numSelected, isAddModalOpen, searchFunction } = props;
  // const [ isSearch, setIsSearch] = React.useState("");

  // const searchHandle = (event) => {
  //   setIsSearch(event.target.value);
  // }

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
        sx={{ flex: "1 1 100%", fontFamily: "poppins" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Employees
      </Typography>
      {/* <TextField
        id="input-with-icon-textfield"
        label="Search"
        sx={{ flex: "1 1 40%" }}
        variant="outlined"
        onChange={(searchedVal) => searchFunction(searchedVal)}
      /> */}
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
  const [isRowLength, setIsRowLength] = React.useState(0);
  const [searchterm, setSearchTerm] = React.useState("");

  // let URL = `${MainURL}/list_profile?page=0&limit=10`;

  // const fetchApiData = async(url) => {
  //   try{
  //     const res = await fetch(url);
  //     const data = await res.json();
  //     console.log(data);
  //   } catch(err) {
  //     console.log(err.message);
  //   }
  // }
  
  React.useEffect(() => {
    fetch("http://localhost:8000/users")
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setEmpDataChange(resp);
        setIsRowLength(resp.length);
      })
      .catch((err) => {
        console.log(err.message);
      });
    // fetchApiData(URL);
  }, []);

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

  const editFunction = (id) => {
    setIsEditModalOpen(true);
    setIsEditid(id);
  };

  const searchFunction = (searchedVal) => {
    console.log(empDataChange)
    const filteredRows = empDataChange().filter((row) => {
      return row.fname.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setSearchTerm(filteredRows);
  }

  const deleteFunction = (id) => {
    if (window.confirm("Do you want to remove?")) {
      fetch("http://localhost:8000/users/" + id, {
        method: "DELETE",
      })
        .then((resp) => {
          window.location.reload();
          alert("Data removed");
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  return (
    <idContext.Provider value={editId}>
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            isAddModalOpen={() => setIsAddModalOpen(true)} 
            searchFunction={searchFunction}
          />
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
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
                        <TableRow hover tabIndex={-1} key={row.fname}>
                          <TableCell padding="checkbox"></TableCell>
                          <TableCell
                            sx={{ fontFamily: "poppins" }}
                            component="th"
                            scope="row"
                            padding="none"
                          >
                            {row.fname + " " + row.lname}
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
                              className="w-20 cursor-pointer text-left"
                              large={row.image}
                              alt={row.fname + " " + row.lname}
                              hideZoom={true}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <button
                              className="px-6 bg-teal-500 py-1 rounded"
                              onClick={() => editFunction(row.id)}
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
          />
        </Paper>
      </Box>
    </idContext.Provider>
  );
}
