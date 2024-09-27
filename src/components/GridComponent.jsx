import { useState, useEffect } from 'react';
import { Box, Typography, Snackbar, Alert } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { LocationOn } from '@mui/icons-material';
import PropTypes from 'prop-types';

const ObjectIcon = ({ direction }) => {
  const rotationDegrees = {
    NORTH: '0deg',
    EAST: '90deg',
    SOUTH: '180deg',
    WEST: '270deg',
  };

  return (
    <LocationOn
      style={{
        transform: `rotate(${rotationDegrees[direction]})`,
        fontSize: '2rem',
        color: 'FFA726',
      }}
    />
  );
};

ObjectIcon.propTypes = {
  direction: PropTypes.oneOf(['NORTH', 'EAST', 'SOUTH', 'WEST']).isRequired,
};

const GridComponent = () => {
  //Initialize
  const [position, setPosition] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [input, setInput] = useState('');

    // Debouncer
    useEffect(() => {
      const handler = setTimeout(() => {
        handleInputChange(input);
      }, 500);
  
      return () => {
        clearTimeout(handler);
      };
    }, [input]); 

  const handleInputChange = (input) => {

    if (input.trim() === '') {
      setPosition('');
      return;
    }

    const regex = /^\s*(\d+)\s*,\s*(\d+)\s+(NORTH|EAST|SOUTH|WEST)\s*$/;
    const match = input.match(regex);

    if (match) {
      const x = parseInt(match[1]);
      const y = parseInt(match[2]);
      const direction = match[3].toUpperCase();

      if (x >= 0 && x <= 4 && y >= 0 && y <= 4) {
        setPosition({ x, y, direction });
        setSnackbarOpen(false);
      } else {
        setErrorMessage('Coordinates must be between 0 and 4.');
        setSnackbarOpen(true);
      }
    } else {
      setErrorMessage('Invalid input format. Use: x,y DIRECTION');
      setSnackbarOpen(true);
    }
  };

  const createGrid = () => {
    const gridSize = 5;
    const cells = [];

    for (let row = gridSize - 1; row >= 0; row--) {
      for (let col = 0; col < gridSize; col++) {
        const isCurrentPosition = position.x === col && position.y === row;
        cells.push(
          <Grid
            item
            key={`${col},${row}`}
            xs={2}
            style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#424242',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isCurrentPosition && <ObjectIcon direction={position.direction} />}
          </Grid>
        );
      }
    }
    return cells;
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography 
        variant="h6"
        gutterBottom
      >
        5x5 Grid
      </Typography>
      <input
        type="text"
        placeholder="Enter position (e.g., 1,1 NORTH)"
        onChange={(e) => setInput(e.target.value)}
        style={{
          marginBottom: '20px',
          padding: '10px',
          width: '250px',
          fontSize: '16px',
          border: '1px solid #9e9e9e',
          borderRadius: '4px',
        }}
      />
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        style={{
          width: '30%',
          minWidth: '400px'
        }}
      >
        {createGrid()}
      </Grid>

      <Snackbar 
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: '100%' }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default GridComponent;
