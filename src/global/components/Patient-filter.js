import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { TextField, Grid, Button, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider as MuiPickersUtilsProviderTH,
  DatePicker,
} from "material-ui-thai-datepickers";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";

import { getAutocompleteIdList } from "actions/patient.action";

import "moment/locale/th";

const useStyles = makeStyles((theme) => ({
  root: {
    "margin-bottom": 20,
  },
  input: {
    width: 288,
  },
  searchBtn: {
    width: 120,
  },
}));

const PatientFilter = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const [autocompleteIdList, setAutocompleteList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [filterDate, setFilterDate] = useState(null);
  let deboundTimeout;

  useEffect(() => {
    fetchAutocompleteList();
  }, [keyword, props.filterOption.date]);

  const fetchAutocompleteList = async () => {
    const datas = await props.getAutocompleteIdList(
      keyword,
      props.filterOption.date
    );
    const idList = datas.map(({ id }) => id.toString());
    setAutocompleteList(idList);
  };

  const handleChangeKeyword = (event, value, reason) => {
    if (reason === "clear") {
      setKeyword("");
      fetchByKeyword("");
    } else if (reason === "select-option") {
      setKeyword(value);
      fetchByKeyword(value);
    } else {
      const { value } = event.target;

      // Debound search
      if (!!deboundTimeout) {
        clearTimeout(deboundTimeout);
      }
      deboundTimeout = setTimeout(() => setKeyword(value), 800);
    }
  };

  const handleChangeFilterDate = (date) => {
    setFilterDate(date);

    if (!date) {
      const pagination = resetPagination();
      props.updateFilterOption({ ...props.filterOption, pagination, date });
    }
  };

  const fetchByKeyword = (id = keyword) => {
    const pagination = resetPagination();
    props.updateFilterOption({
      ...props.filterOption,
      pagination,
      keyword: id,
    });
  };

  const submit = () => {
    const pagination = resetPagination();
    props.updateFilterOption({
      ...props.filterOption,
      pagination,
      keyword,
      date: filterDate,
    });
  };

  const resetPagination = () => ({ ...props.filterOption.pagination, page: 0 });

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justify={isMobile ? "center" : "flex-start"}
      >
        <Grid item>
          <Autocomplete
            className={classes.input}
            clearOnBlur={false}
            options={autocompleteIdList}
            getOptionLabel={(option) => option}
            renderInput={(params) => (
              <TextField
                {...params}
                label="ค้นหาด้วยรหัส"
                variant="outlined"
                value={keyword}
                onChange={handleChangeKeyword}
              />
            )}
            onChange={handleChangeKeyword}
            size="small"
            fullWidth
          />
        </Grid>
        <Grid item>
          <MuiPickersUtilsProviderTH
            libInstance={moment}
            utils={MomentUtils}
            locale={"th"}
          >
            <DatePicker
              className={classes.input}
              autoOk
              label="เลือกวันที่"
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
        </Grid>
        <Grid item>
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
        </Grid>
        <Grid item>
          <Button
            className={classes.searchBtn}
            variant="contained"
            color="primary"
            onClick={submit}
          >
            ค้นหา
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  getAutocompleteIdList,
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientFilter);
