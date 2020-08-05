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

function Address(number) {
  return (
    <FormControl fullWidth>
      <TextField id={`address${number}`} label={`Address Line ${number}`} />
    </FormControl>
  );
}

function LocalityList({ localities }) {
  const breakpoint = 12 / localities.length;
  const listItems = localities.map((locality, index) => (
    <Grid item key={index} xs={breakpoint}>
      locality
    </Grid>
  ));

  return listItems;
}

LocalityList.propTypes = {
  localities: PropTypes.arrayOf(PropTypes.object),
};

LocalityList.defaultProps = {
  localities: [],
};

const AddressForm = () => {
  const [country, setCountry] = useState(AddressField.options[0]);

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ backgroundColor: '#cfe8fc', height: '100vh' }}
      >
        <form action="" style={{ width: '100%' }}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="country-label">Country</InputLabel>
                <Select
                  id="country-select"
                  labelId="country-label"
                  value={country}
                  onChange={handleCountryChange}
                >
                  {AddressField.options.map((option) => (
                    <MenuItem key={option.iso} value={option}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              {Address(1)}
            </Grid>
            <Grid item xs={12}>
              {Address(2)}
            </Grid>
            <LocalityList localities={country.fields[2].locality} />
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default AddressForm;
