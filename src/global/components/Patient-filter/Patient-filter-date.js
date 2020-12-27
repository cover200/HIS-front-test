import moment from "moment";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider as MuiPickersUtilsProviderTH,
  DatePicker,
} from "material-ui-thai-datepickers";
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
    <MuiPickersUtilsProviderTH
      libInstance={moment}
      utils={MomentUtils}
      locale={"th"}
    >
      <DatePicker
        className={classes.input}
        autoOk
        label="เลือกวันที่ผู้ป่วยอยู่ระหว่างการรักษา"
        format="DD/MM/YYYY"
        inputVariant="outlined"
        value={filterDate}
        onChange={handleChangeFilterDate}
        yearOffset={543}
        size="small"
        okLabel="ตกลง"
        cancelLabel="ยกเลิก"
        clearLabel="เคลียร์"
        clearable
      />
    </MuiPickersUtilsProviderTH>
  );
};

export default PatientFilterDate;
