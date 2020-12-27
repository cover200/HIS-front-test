import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { TextField, Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";

import { getAutocompleteIdList } from "actions/patient.action";

const useStyles = makeStyles((theme) => ({
  root: {
    "margin-bottom": 20,
  },
}));

const PatientFilter = (props) => {
  const classes = useStyles();
  const [autocompleteIdList, setAutocompleteList] = useState([]);
  const [keyword, setKeyword] = useState("");
  let deboundTimeout;

  useEffect(() => {
    fetchAutocompleteList();
  }, [keyword]);

  const fetchAutocompleteList = async () => {
    const idList = await props.getAutocompleteIdList(keyword);
    setAutocompleteList(idList);
  };

  const handleChangeKeyword = (event, value, reason) => {
    if (reason === "clear") {
      setKeyword("");
      updateKeyword("");
    } else if (reason === "select-option") {
      const id = value?.id.toString();
      setKeyword(id);
      updateKeyword(value?.id.toString());
    } else {
      const { value } = event.target;

      // Debound search
      if (!!deboundTimeout) {
        clearTimeout(deboundTimeout);
      }
      deboundTimeout = setTimeout(() => setKeyword(value), 800);
    }
  };

  const updateKeyword = (id = keyword) => {
    props.updateKeyword({ ...props.filterOption, keyword: id });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1} alignItems="center">
        <Grid item>
          <Autocomplete
            clearOnBlur={false}
            options={autocompleteIdList}
            getOptionLabel={(option) => option.id.toString()}
            style={{ width: 300 }}
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
          />
        </Grid>
        <Grid item></Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => updateKeyword()}
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
