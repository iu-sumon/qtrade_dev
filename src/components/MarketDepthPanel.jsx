import React from 'react';
import { Box, Typography } from '@mui/material';

const MarketDepthPanel = () => {
  const bids = [
    { price: 182.50, quantity: 1200 },
    { price: 182.45, quantity: 850 },
    { price: 182.40, quantity: 1500 },
    { price: 182.35, quantity: 900 },
    { price: 182.30, quantity: 1100 },
  ];

  const asks = [
    { price: 182.55, quantity: 800 },
    { price: 182.60, quantity: 1200 },
    { price: 182.65, quantity: 950 },
    { price: 182.70, quantity: 1300 },
    { price: 182.75, quantity: 700 },
  ];

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      <Box sx={{ flex: 1, p: 1 }}>
        <Typography variant="h6" color="green" gutterBottom>Bids</Typography>
        {bids.map((bid, index) => (
          <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography color="green">{bid.price.toFixed(2)}</Typography>
            <Typography>{bid.quantity}</Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ flex: 1, p: 1 }}>
        <Typography variant="h6" color="red" gutterBottom>Asks</Typography>
        {asks.map((ask, index) => (
          <Box key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography color="red">{ask.price.toFixed(2)}</Typography>
            <Typography>{ask.quantity}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MarketDepthPanel;