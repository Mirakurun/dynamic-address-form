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

const AddressForm = () => {
  const [country, setCountry] = useState(AddressField.options[0]);
  const [administrativeArea, setAdministrativeArea] = useState('');

  function Address(number) {
    return (
      <FormControl fullWidth>
        <TextField id={`address${number}`} label={`Address Line ${number}`} />
      </FormControl>
    );
  }

  function Locality({ locality }) {
    const keys = Object.keys(locality);

    return (
      <FormControl fullWidth>
        {locality[keys[0]].options ? (
          <>
            <InputLabel id={`${locality[keys[0]]}-label`}>
              {locality[keys[0]].label}
            </InputLabel>
            <Select
              id={`${locality[keys[0]]}-select`}
              labelId={`${locality[keys[0]]}-label`}
              value={administrativeArea}
              onChange={(e) => setAdministrativeArea(e.target.value)}
            >
              {locality[keys[0]].options.map((option) => {
                const optionKeys = Object.keys(option);
                const optionValues = Object.values(option);
                if (optionKeys[0] === '') {
                  return null;
                }
                return (
                  <MenuItem key={optionKeys[0]} value={optionKeys[0]}>
                    {optionValues[0]}
                  </MenuItem>
                );
              })}
            </Select>
          </>
        ) : (
          <TextField id={keys[0]} label={locality[keys[0]].label} />
        )}
      </FormControl>
    );
  }

  Locality.propTypes = {
    locality: PropTypes.objectOf(PropTypes.object),
  };

  Locality.defaultProps = {
    locality: {},
  };

  function LocalityList({ localities }) {
    const breakpoint = 12 / localities.length;
    const listItems = localities.map((locality, index) => (
      <Grid item key={index} xs={breakpoint}>
        <Locality locality={locality} />
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
