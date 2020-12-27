import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { fetchAllData } from "actions/patient.action";
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
  const [sortOption, setSortOption] = useState({ key: "id", direction: "asc" });

  useEffect(() => {
    fetchData();
  }, [sortOption]);

  const fetchData = async () => {
    try {
      const { data } = await props.fetchAllData(sortOption);
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
        sortOption={sortOption}
        updateSortOption={setSortOption}
      />

      <LoadingDialog />
    </Container>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  fetchAllData,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
