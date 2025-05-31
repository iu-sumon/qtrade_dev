import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import { useContext } from 'react';
import { ThemeContext } from '../../components/Theme/ThemeContext';

const Topbar = ({ panelConfigs, selectedPanel, setSelectedPanel, addNewTab }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="Topbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px', backgroundColor: '#f5f5f5' }}>
      
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

      <IconButton onClick={toggleTheme} color="inherit">
        {theme === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </div>
  );
};

export default Topbar;
