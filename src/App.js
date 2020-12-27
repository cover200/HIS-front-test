import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { fetchAllData, getAutocompleteIdList } from "actions/patient.action";
import PatientTable from "global/components/Patient-table";
import PatientFilter from "global/components/Patient-filter";
import LoadingDialog from "global/components/dialogs/Loading-dialog";

import "./App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "padding-top": 24,
    "padding-bottom": 50,
  },
}));

const App = (props) => {
  const classes = useStyles();
  const [patients, setPatient] = useState([]);
  const [filterOption, setFilterOption] = useState({
    pagination: { page: 0, perPage: 5, total: 0 },
    sort: { key: "id", direction: "asc" },
    keyword: "",
    date: null,
  });

  useEffect(() => {
    getDataCount();
  }, [filterOption.keyword, filterOption.date]);

  const getDataCount = async () => {
    try {
      const data = await props.getAutocompleteIdList(
        filterOption.keyword,
        filterOption.date
      );
      const pagination = { ...filterOption.pagination, total: data.length };
      setFilterOption({ ...filterOption, pagination });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [
    filterOption.sort,
    filterOption.pagination.page,
    filterOption.pagination.perPage,
    filterOption.keyword,
    filterOption.date,
  ]);

  const fetchData = async () => {
    try {
      const { data } = await props.fetchAllData(filterOption);
      setPatient(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container maxWidth="lg" className={classes.root}>
      <h1 className="title">รายชื่อผู้ป่วย</h1>

      <PatientFilter
        filterOption={filterOption}
        updateFilterOption={setFilterOption}
        submit={fetchData}
      />

      <PatientTable
        patients={patients}
        filterOption={filterOption}
        updateFilterOption={setFilterOption}
      />

      <LoadingDialog />
    </Container>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  fetchAllData,
  getAutocompleteIdList,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
