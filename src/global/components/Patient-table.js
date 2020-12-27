import {
  Table,
  TableContainer,
  TableSortLabel,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
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

const PatientTable = ({ patients, sortOption, updateSortOption }) => {
  const classes = useStyles();

  const setSortOption = (key) => {
    let direction = "asc";
    if (sortOption.key === key) {
      direction = sortOption.direction === "asc" ? "desc" : "asc";
    }

    updateSortOption({ key, direction });
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
                        active={sortOption.key === headCell.key}
                        direction={
                          sortOption.key === headCell.key
                            ? sortOption.direction
                            : "asc"
                        }
                        onClick={() => setSortOption(headCell.key)}
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
            {patients.map((patient) => (
              <TableRow key={patient.id}>
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
        </Table>
      </TableContainer>
    </>
  );
};

export default PatientTable;
