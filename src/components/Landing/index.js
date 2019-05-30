import React from 'react';
import TextField from '@material-ui/core/TextField';

const Landing = () => {
  return (
    <form noValidate autoComplete="off">
      <TextField
        id="outlined-search-input"
        label="Search"
        type="text"
        name="search"
        margin="normal"
        variant="outlined"
      />
    </form>
  );
};

export default Landing;
