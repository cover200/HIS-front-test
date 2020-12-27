import { useState } from "react";
import { Grid, Button, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import PatientFilterSearch from "./Patient-filter-search";
import PatientFilterDate from "./Patient-filter-date";
import PatientFilterTime from "./Patient-filter-time";

import "moment/locale/th";

const useStyles = makeStyles((theme) => ({
  root: {
    "margin-bottom": 20,
  },
  searchBtn: {
    width: 120,
  },
}));

const PatientFilter = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const [keyword, setKeyword] = useState("");
  const [filterDate, setFilterDate] = useState(null);

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
          <PatientFilterSearch
            keyword={keyword}
            setKeyword={setKeyword}
            filterOption={props.filterOption}
            updateFilterOption={props.updateFilterOption}
            resetPagination={resetPagination}
          />
        </Grid>
        <Grid item>
          <PatientFilterDate
            filterDate={filterDate}
            setFilterDate={setFilterDate}
            filterOption={props.filterOption}
            updateFilterOption={props.updateFilterOption}
            resetPagination={resetPagination}
          />
        </Grid>
        <Grid item>
          <PatientFilterTime
            filterDate={filterDate}
            setFilterDate={setFilterDate}
            filterOption={props.filterOption}
            updateFilterOption={props.updateFilterOption}
            resetPagination={resetPagination}
          />
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

export default PatientFilter;
