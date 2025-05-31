import { List, ListItem, ListItemText, Typography } from '@mui/material';

const News = () => {
  const newsItems = [
    { title: 'Market Update', summary: 'Stocks rise on positive earnings reports' },
    { title: 'Economic Report', summary: 'Inflation shows signs of cooling' },
    { title: 'Company News', summary: 'Tech giant announces new product line' }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h6">Market News</Typography>
      <List>
        {newsItems.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item.title} secondary={item.summary} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default News;