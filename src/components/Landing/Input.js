import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class Input extends Component {
  render() {
    return (
      <form style={{ display: 'flex', justifyContent: 'center' }}>
        <input
          type="text"
          style={{
            padding: '1rem',
            outline: 'none',
            border: '0',
            font: 'inherit',
            borderRadius: '5px 0 0 5px',
          }}
          placeholder="#Tweet"
        />
        <Button
          variant="contained"
          color="primary"
          style={{
            boxShadow: 'none',
            borderRadius: '0 5px 5px 0',
            fontWeight: 'bold',
          }}
        >
          Search
        </Button>
      </form>
    );
  }
}

export default Input;
