import { Box } from '@mui/material';

import LayoutCom from './components/LayoutCom';
import MainCom from './components/MainCom';

function App() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', background: 'rgba(103, 58, 183, 0.85)', width: '100%' }}>
      <LayoutCom />
      <Box sx={{ p: 3, pt: 0, flexGrow: 1 }}>
        <MainCom />
      </Box>
    </Box>
  );
}

export default App
