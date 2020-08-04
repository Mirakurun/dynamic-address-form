import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import AddressField from '../data/addressfield.json';

const CountryOptions = React.forwardRef((props, ref) => {
  const options = props.addressfield.options.map((option) => (
    <MenuItem key={option.iso} ref={ref} value={option.iso}>
      {option.label}
    </MenuItem>
  ));

  return options;
});

CountryOptions.propTypes = {
  addressfield: PropTypes.shape({
    label: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object),
  }),
};

CountryOptions.defaultProps = {
  addressfield: {},
};

function AddressLine1() {
  return (
    <FormControl fullWidth>
      <TextField id="address1" label="Address Line 1" />
    </FormControl>
  );
}

function AddressLine2() {
  return (
    <FormControl fullWidth>
      <TextField id="address2" label="Address Line 2" />
    </FormControl>
  );
}

const AddressForm = () => {
  const [country, setCountry] = useState('');

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ backgroundColor: '#cfe8fc', height: '100vh' }}
      >
        <form action="" style={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="country-label">Country</InputLabel>
                <Select
                  id="country-select"
                  labelId="country-label"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <CountryOptions addressfield={AddressField} />
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <AddressLine1 />
            </Grid>
            <Grid item xs={12}>
              <AddressLine2 />
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default AddressForm;
