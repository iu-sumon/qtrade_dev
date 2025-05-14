import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const WatchlistPanel = () => {
  const columns = [
    { field: 'symbol', headerName: 'Symbol', width: 150 },
    { field: 'price', headerName: 'Price', width: 150 },
    { field: 'change', headerName: 'Change', width: 150 },
    { field: 'volume', headerName: 'Volume', width: 150 },
  ];

  const rows = [
    { id: 1, symbol: 'AAPL', price: 182.63, change: '+1.25', volume: '45.2M' },
    { id: 2, symbol: 'MSFT', price: 420.72, change: '-0.85', volume: '32.1M' },
    { id: 3, symbol: 'GOOGL', price: 156.78, change: '+2.34', volume: '28.7M' },
    { id: 4, symbol: 'AMZN', price: 185.19, change: '-1.12', volume: '38.9M' },
    { id: 5, symbol: 'TSLA', price: 172.63, change: '+3.45', volume: '52.3M' },
  ];

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
};

export default WatchlistPanel;