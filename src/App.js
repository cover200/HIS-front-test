import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { fetchAllData, getDataCount } from "actions/patient.action";
import PatientTable from "global/components/Patient-table";
import LoadingDialog from "global/components/dialogs/Loading-dialog";

import "./App.css";

const useStyles = makeStyles((theme) => ({
  root: {
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
  });

  useEffect(() => {
    getDataCount();
  }, []);

  const getDataCount = async () => {
    try {
      const count = await props.getDataCount();
      filterOption.pagination.total = count;
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterOption]);

  const fetchData = async () => {
    const { sort, pagination } = filterOption;
    try {
      const { data } = await props.fetchAllData(sort, pagination);
      setPatient(data);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container maxWidth="lg" className={classes.root}>
      <h1>รายชื่อผู้ป่วย</h1>
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
  getDataCount,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
