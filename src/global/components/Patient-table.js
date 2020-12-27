import {
  Table,
  TableContainer,
  TableSortLabel,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  tableHeader: {
    "background-color": theme.palette.primary.main,
  },
  headerFont: {
    color: theme.palette.common.white,
    "font-weight": 600,
  },
  each2ndRow: {
    "background-color": "#f9f5f5",
  },
}));

const DisplayDate = ({ dateString }) => {
  const date = moment(dateString);
  return (
    <div style={{ textAlign: "center" }}>
      <p>{date.format("DD/MM/YYYY")}</p>
      <p>{date.format("HH:mm")}</p>
    </div>
  );
};

const headRows = [
  [
    { label: "รหัส", key: "id", align: "center", rowSpan: 2, colSpan: 1 },
    {
      label: "ชื่อ",
      key: "firstName",
      align: "left",
      rowSpan: 2,
      colSpan: 1,
    },
    {
      label: "นามสกุล",
      key: "lastName",
      align: "left",
      rowSpan: 2,
      colSpan: 1,
    },
    {
      label: "วันที่",
      key: null,
      align: "center",
      rowSpan: 1,
      colSpan: 2,
    },
  ],
  [
    {
      label: "เข้า",
      key: "checkIn",
      align: "center",
      rowSpan: 1,
      colSpan: 1,
    },
    {
      label: "ออก",
      key: "checkOut",
      align: "center",
      rowSpan: 1,
      colSpan: 1,
    },
  ],
];

const PatientTable = ({ patients, filterOption, updateFilterOption }) => {
  const classes = useStyles();

  const handleChangeSort = (key) => {
    const sort = { key, direction: "asc" };

    if (filterOption.sort.key === key) {
      sort.direction = filterOption.sort.direction === "asc" ? "desc" : "asc";
    }

    updateFilterOption({ ...filterOption, sort });
  };

  const handleChangePage = (_, page) => {
    const pagination = { ...filterOption.pagination, page };
    updateFilterOption({ ...filterOption, pagination });
  };

  const handleChangePerPage = (event) => {
    const perPage = event.target.value;
    const pagination = { ...filterOption.pagination, perPage };
    updateFilterOption({ ...filterOption, pagination });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead className={classes.tableHeader}>
            {headRows.map((row, index) => (
              <TableRow key={index}>
                {row.map((headCell) => (
                  <TableCell
                    key={headCell.label}
                    className={classes.headerFont}
                    align={headCell.align}
                    rowSpan={headCell.rowSpan}
                    colSpan={headCell.colSpan}
                  >
                    {headCell.key ? (
                      <TableSortLabel
                        active={filterOption.sort.key === headCell.key}
                        direction={
                          filterOption.sort.key === headCell.key
                            ? filterOption.sort.direction
                            : "asc"
                        }
                        onClick={() => handleChangeSort(headCell.key)}
                      >
                        {headCell.label}
                      </TableSortLabel>
                    ) : (
                      headCell.label
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>

          <TableBody>
            {patients.map((patient, index) => (
              <TableRow
                key={patient.id}
                className={index % 2 ? classes.each2ndRow : ""}
              >
                <TableCell align="center">{patient.id}</TableCell>
                <TableCell>{patient.firstName}</TableCell>
                <TableCell>{patient.lastName}</TableCell>
                <TableCell align="center">
                  <DisplayDate dateString={patient.checkIn} />
                </TableCell>
                <TableCell align="center">
                  <DisplayDate dateString={patient.checkOut} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={filterOption.pagination.total}
                rowsPerPage={filterOption.pagination.perPage}
                page={filterOption.pagination.page}
                labelRowsPerPage="จำนวนข้อมูล:"
                labelDisplayedRows={({ from, to, count }) =>
                  `${from}-${to} จาก ${count}`
                }
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangePerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default PatientTable;
