import { useState } from 'react';
import { Layout, Model } from 'flexlayout-react';
import 'flexlayout-react/style/light.css';
import './App.css';
import defaultLayout from './layouts/defaultLayout.json';
import ChartPanel from './components/ChartPanel';
import WatchlistPanel from './components/WatchlistPanel';
import MarketWatchPanel from './components/MarketWatchPanel';
import MarketDepthPanel from './components/MarketDepthPanel';
import Toolbar from './components/Toolbar';

function App() {
  const [model, setModel] = useState(Model.fromJson(defaultLayout));

  const factory = (node) => {
    const component = node.getComponent();
    
    switch (component) {
      case "chart":
        return <ChartPanel />;
      case "watchlist":
        return <WatchlistPanel />;
      case "marketWatch":
        return <MarketWatchPanel />;
      case "marketDepth":
        return <MarketDepthPanel />;
      default:
        return null;
    }
  };

  const onModelChange = (model) => {
    setModel(model);
  };

  return (
    <div className="app-container">
      <Toolbar />
      <div className="layout-container">
        // To:
        <Layout 
          model={model} 
          factory={factory} 
          onModelChange={onModelChange}
        />
      </div>
    </div>
  );
}

export default App;