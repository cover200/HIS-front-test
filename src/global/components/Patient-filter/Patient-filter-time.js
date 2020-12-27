import moment from "moment";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  input: {
    width: 288,
  },
}));

const PatientFilterDate = ({
  filterDate,
  setFilterDate,
  filterOption,
  updateFilterOption,
  resetPagination,
}) => {
  const classes = useStyles();

  const handleChangeFilterDate = (date) => {
    setFilterDate(date);

    if (!date) {
      const pagination = resetPagination();
      updateFilterOption({ ...filterOption, pagination, date });
    }
  };

  return (
    <MuiPickersUtilsProvider
      libInstance={moment}
      utils={MomentUtils}
      locale={"th"}
    >
      <TimePicker
        className={classes.input}
        ampm={false}
        label="เลือกเวลา"
        format="HH : mm"
        inputVariant="outlined"
        value={filterDate}
        onChange={handleChangeFilterDate}
        size="small"
        okLabel="ตกลง"
        cancelLabel="ยกเลิก"
        clearLabel="เคลียร์"
        clearable
      />
    </MuiPickersUtilsProvider>
  );
};

export default PatientFilterDate;
