import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const MarketWatchPanel = () => {
  const data = [
    { symbol: 'NIFTY 50', last: 22147.00, change: 21.05, percentChange: 0.10 },
    { symbol: 'SENSEX', last: 73097.28, change: 89.64, percentChange: 0.12 },
    { symbol: 'NIFTY BANK', last: 47689.30, change: -125.40, percentChange: -0.26 },
    { symbol: 'INDIA VIX', last: 13.45, change: -0.35, percentChange: -2.54 },
  ];

  return (
    <TableContainer component={Paper} style={{ height: '100%' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Index</TableCell>
            <TableCell align="right">Last</TableCell>
            <TableCell align="right">Change</TableCell>
            <TableCell align="right">% Change</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.symbol}>
              <TableCell component="th" scope="row">{row.symbol}</TableCell>
              <TableCell align="right">{row.last.toLocaleString()}</TableCell>
              <TableCell align="right" style={{ color: row.change >= 0 ? 'green' : 'red' }}>
                {row.change >= 0 ? '+' : ''}{row.change}
              </TableCell>
              <TableCell align="right" style={{ color: row.percentChange >= 0 ? 'green' : 'red' }}>
                {row.percentChange >= 0 ? '+' : ''}{row.percentChange}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MarketWatchPanel;