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
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

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
  const [activeSection, setActiveSection] = useState('trade'); // default is trade

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

      layout.addTabToActiveTabSet(tabJson);
    }
    
    setSelectedPanel('');
  };

  return (
    <div className="app-container" style={{ display: 'flex', height: '100vh' }}>
      {/* Sidebar */}
      <div className="sidebar">
        <div 
          className={`sidebar-item ${activeSection === 'dashboard' ? 'active' : ''}`} 
          onClick={() => setActiveSection('dashboard')}
        >
          <DashboardIcon />
          <span>Dashboard</span>
        </div>
        <div 
          className={`sidebar-item ${activeSection === 'trade' ? 'active' : ''}`} 
          onClick={() => setActiveSection('trade')}
        >
          <ShoppingCartIcon />
          <span>Trade</span>
        </div>
        <div 
          className={`sidebar-item ${activeSection === 'watchlist' ? 'active' : ''}`} 
          onClick={() => setActiveSection('watchlist')}
        >
          <ListAltIcon />
          <span>Watchlist</span>
        </div>
      </div>

      {/* Main content */}
      <div className="main-content" style={{ flexGrow: 1 }}>
        <Toolbar
          panelConfigs={panelConfigs}
          selectedPanel={selectedPanel}
          setSelectedPanel={setSelectedPanel}
          addNewTab={addNewTab}
        />

        {/* Panel Selector */}
        {activeSection === 'trade' && (
          <> 
            <div className="layout-container">
              <Layout 
                ref={layoutRef}
                model={model} 
                factory={factory} 
                onModelChange={onModelChange}
              />
            </div>
          </>
        )}

        {/* Dashboard View */}
        {activeSection === 'dashboard' && (
          <div className="section-placeholder">
            Dashboard Content
          </div>
        )}

        {/* Watchlist View */}
        {activeSection === 'watchlist' && (
          <div className="section-placeholder">
            Watchlist Content
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
