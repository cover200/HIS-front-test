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
  headerBackground: {
    "background-color": theme.palette.primary.main,
  },
  headerFont: {
    color: theme.palette.common.white,
    "font-weight": 600,
  },
  bodyEach2ndRow: {
    "background-color": "#f9f5f5",
  },
  bodyFont: {
    color: theme.palette.common.black,
  },
}));

const DisplayDate = ({ dateString }) => {
  const date = moment(dateString);
  const yearPlusOffset = +date.format("YYYY") + 543;
  return (
    <div style={{ textAlign: "center" }}>
      <p>{date.format("DD/MM/") + yearPlusOffset}</p>
      <p>{date.format("HH:mm")}</p>
    </div>
  );
};

const headRows = [
  [
    { label: "รหัส", key: "id", rowSpan: 2, colSpan: 1 },
    {
      label: "ชื่อ",
      key: "firstName",
      rowSpan: 2,
      colSpan: 1,
    },
    {
      label: "นามสกุล",
      key: "lastName",
      rowSpan: 2,
      colSpan: 1,
    },
    {
      label: "วันที่",
      key: null,
      rowSpan: 1,
      colSpan: 2,
    },
  ],
  [
    {
      label: "เข้า",
      key: "checkIn",
      rowSpan: 1,
      colSpan: 1,
    },
    {
      label: "ออก",
      key: "checkOut",
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
    const pagination = { ...filterOption.pagination, page: 0, perPage };
    updateFilterOption({ ...filterOption, pagination });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead className={classes.headerBackground}>
            {headRows.map((row, index) => (
              <TableRow key={index}>
                {row.map((headCell) => (
                  <TableCell
                    key={headCell.label}
                    className={classes.headerFont}
                    align="center"
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
                className={index % 2 ? classes.bodyEach2ndRow : ""}
              >
                <TableCell className={classes.bodyFont} align="center">
                  {patient.id}
                </TableCell>
                <TableCell className={classes.bodyFont}>
                  {patient.firstName}
                </TableCell>
                <TableCell className={classes.bodyFont}>
                  {patient.lastName}
                </TableCell>
                <TableCell className={classes.bodyFont} align="center">
                  <DisplayDate dateString={patient.checkIn} />
                </TableCell>
                <TableCell className={classes.bodyFont} align="center">
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
