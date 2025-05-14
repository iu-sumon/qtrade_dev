import React, { useState, useRef } from 'react';
import { Layout, Model } from 'flexlayout-react';
import 'flexlayout-react/style/light.css';
import './App.css';
import defaultLayout from './layouts/defaultLayout.json';
import ChartPanel from './components/ChartPanel';
import WatchlistPanel from './components/WatchlistPanel';
import MarketWatchPanel from './components/MarketWatchPanel';
import MarketDepthPanel from './components/MarketDepthPanel';
import QuotePanel from './components/QuotePanel';
import NewsPanel from './components/NewsPanel';
import Toolbar from './components/Toolbar';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';

// Panel configurations
const panelConfigs = {
  chart: {
    name: "Chart",
    component: "chart",
    factory: () => <ChartPanel />
  },
  watchlist: {
    name: "Watchlist",
    component: "watchlist",
    factory: () => <WatchlistPanel />
  },
  marketWatch: {
    name: "Market Watch",
    component: "marketWatch",
    factory: () => <MarketWatchPanel />
  },
  marketDepth: {
    name: "Market Depth",
    component: "marketDepth",
    factory: () => <MarketDepthPanel />
  },
  // Add more panels as needed
  quote: {
    name: "Quote",
    component: "quote",
    factory: () => <QuotePanel />
  },
  news: {
    name: "News",
    component: "news",
    factory: () => <NewsPanel />
  }
};

function App() {
  const layoutRef = useRef(null);
  const [model, setModel] = useState(Model.fromJson(defaultLayout));
  const [selectedPanel, setSelectedPanel] = useState('');

  const factory = (node) => {
    const component = node.getComponent();
    return panelConfigs[component]?.factory() || null;
  };

  const onModelChange = (model) => {
    setModel(model);
  };

  const addNewTab = () => {
    if (!selectedPanel || !panelConfigs[selectedPanel]) return;
    
    const config = panelConfigs[selectedPanel];
    const layout = layoutRef.current;

    if (layout) {
      const tabJson = {
        type: "tab",
        name: config.name,
        component: selectedPanel,
        enableClose: true
      };

      // Add to the first tabset found (you can customize this logic)
      layout.addTabToActiveTabSet(tabJson);
    }
    
    setSelectedPanel('');
  };

  return (
    <div className="app-container">
      <Toolbar />
      <div style={{ padding: '10px', backgroundColor: '#f5f5f5' }}>
        <FormControl variant="outlined" size="small" style={{ width: 200 }}>
          <InputLabel>Add Panel</InputLabel>
          <Select
            value={selectedPanel}
            onChange={(e) => setSelectedPanel(e.target.value)}
            label="Add Panel"
            onClose={addNewTab}
          >
            <MenuItem value=""><em>Select a panel</em></MenuItem>
            {Object.keys(panelConfigs).map(key => (
              <MenuItem key={key} value={key}>{panelConfigs[key].name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="layout-container">
        <Layout 
          ref={layoutRef}
          model={model} 
          factory={factory} 
          onModelChange={onModelChange}
        />
      </div>
    </div>
  );
}

export default App;