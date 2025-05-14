import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import './css/watchlist.css'

const initialSymbols = ['AAPL', 'GOOG', 'MSFT', 'AMZN', 'TSLA'];

const generateRandomRow = (symbol) => {
  const basePrice = Math.random() * 1000;
  const randomPercentage = () => parseFloat((Math.random() * 2 - 1).toFixed(2));
  const randomValue = (range) => parseFloat((Math.random() * range).toFixed(2));

  return {
    id: symbol,
    symbol,
    ltp: basePrice,
    change: randomValue(20),
    changePercent: randomPercentage(),
    bq: randomValue(500),
    aq: randomValue(500),
    vol: randomValue(10000),
    yvol: randomValue(10000),
    chg: randomValue(10),
    chgPct: randomPercentage(),
    twentySixWHL: `${randomValue(1000)} / ${randomValue(1000)}`,
    fourWHL: `${randomValue(1000)} / ${randomValue(1000)}`,
    twoWHL: `${randomValue(1000)} / ${randomValue(1000)}`,
    oneWHL: `${randomValue(1000)} / ${randomValue(1000)}`,
    oneYCh: parseFloat((basePrice * 0.2 * (Math.random() > 0.5 ? 1 : -1)).toFixed(2)),
    sixMCh: parseFloat((basePrice * 0.1 * (Math.random() > 0.5 ? 1 : -1)).toFixed(2)),
    oneMCh: parseFloat((basePrice * 0.05 * (Math.random() > 0.5 ? 1 : -1)).toFixed(2)),
    twoWCh: parseFloat((basePrice * 0.03 * (Math.random() > 0.5 ? 1 : -1)).toFixed(2)),
    oneWCh: parseFloat((basePrice * 0.02 * (Math.random() > 0.5 ? 1 : -1)).toFixed(2)),
    oneYChPct: randomPercentage(),
    sixMChPct: randomPercentage(),
    oneMChPct: randomPercentage(),
    twoWChPct: randomPercentage(),
    oneWChPct: randomPercentage(),
  };
};

const columns = [
  { field: 'symbol', headerName: 'Symbol', width: 90 },
  { field: 'ltp', headerName: 'LTP', width: 100 },
  { field: 'change', headerName: 'Change', width: 100 },
  { field: 'changePercent', headerName: 'Change %', width: 110 },
  { field: 'bq', headerName: 'BQ', width: 100 },
  { field: 'aq', headerName: 'AQ', width: 100 },
  { field: 'vol', headerName: 'VOL', width: 100 },
  { field: 'yvol', headerName: 'YVOL', width: 100 },
  { field: 'chg', headerName: 'CHG', width: 100 },
  { field: 'chgPct', headerName: '%CHG', width: 100 },
  { field: 'twentySixWHL', headerName: '26W H/L', width: 120 },
  { field: 'fourWHL', headerName: '4W H/L', width: 110 },
  { field: 'twoWHL', headerName: '2W H/L', width: 110 },
  { field: 'oneWHL', headerName: '1W H/L', width: 110 },
  { field: 'oneYCh', headerName: '1Y CHG', width: 100 },
  { field: 'sixMCh', headerName: '6M CHG', width: 100 },
  { field: 'oneMCh', headerName: '1M CHG', width: 100 },
  { field: 'twoWCh', headerName: '2W CHG', width: 100 },
  { field: 'oneWCh', headerName: '1W CHG', width: 100 },
  { field: 'oneYChPct', headerName: '1Y CHG%', width: 110 },
  { field: 'sixMChPct', headerName: '6M CHG%', width: 110 },
  { field: 'oneMChPct', headerName: '1M CHG%', width: 110 },
  { field: 'twoWChPct', headerName: '2W CHG%', width: 110 },
  { field: 'oneWChPct', headerName: '1W CHG%', width: 110 },
];

const WatchlistPanel = () => {
  const [rows, setRows] = useState(initialSymbols.map(generateRandomRow));
  const [flashingCells, setFlashingCells] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setRows((prevRows) => {
        const newRows = prevRows.map((row) => {
          const newRow = generateRandomRow(row.symbol);
          const flash = {};
          Object.keys(newRow).forEach((key) => {
            if (newRow[key] !== row[key]) {
              flash[`${row.id}-${key}`] =
                newRow[key] > row[key] ? 'flash-green' : 'flash-red';
            }
          });
          setFlashingCells((prev) => ({ ...prev, ...flash }));
          return newRow;
        });
        return newRows;
      });

      setTimeout(() => {
        setFlashingCells({});
      }, 300); // Flash duration
    }, 5000); // Update every 1 second

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getCellClassName={({ id, field }) =>
          flashingCells[`${id}-${field}`] || ''
        }
        density="compact"
        hideFooter
        disableColumnMenu
      />
    </div>
  );
};

export default WatchlistPanel;
