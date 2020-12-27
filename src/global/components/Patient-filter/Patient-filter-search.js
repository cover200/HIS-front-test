import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";

import { getAutocompleteIdList } from "actions/patient.action";

const useStyles = makeStyles((theme) => ({
  input: {
    width: 288,
  },
}));

const PatientFilterSearch = ({
  keyword,
  setKeyword,
  filterOption,
  updateFilterOption,
  resetPagination,
  getAutocompleteIdList,
}) => {
  const classes = useStyles();
  const [autocompleteIdList, setAutocompleteList] = useState([]);

  let deboundTimeout;

  useEffect(() => {
    fetchAutocompleteList();
  }, [keyword, filterOption.date]);

  const fetchAutocompleteList = async () => {
    const datas = await getAutocompleteIdList(keyword, filterOption.date);
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

  const fetchByKeyword = (id = keyword) => {
    const pagination = resetPagination();
    updateFilterOption({
      ...filterOption,
      pagination,
      keyword: id,
    });
  };

  return (
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
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  getAutocompleteIdList,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientFilterSearch);
