import styled from 'styled-components';
import ShoppingList from './shopping-list';
import { Grid } from '@mui/material';

const Header = styled.header`
  display: flex;
  background-color: #5980b3;
  color: white;
`;

const Main = styled(Grid)`
  font-family: 'Nunito', sans-serif;
  padding: 30px 0px;
`;

export const App = () => {
  return (
    <>
      <Header>
        <h3
          style={{
            margin: '20px',
            fontWeight: '500',
            textTransform: 'uppercase',
          }}
        >
          Shopping List
        </h3>
      </Header>
      <Main container spacing={2} justifyContent="space-between">
        <Grid item xs />
        <Grid container item xs={8} spacing={2} direction="column" minHeight={500}>
          <Grid item xs />
          <Grid item xs={8} flexGrow='1' alignItems='stretch'>
            <ShoppingList />
          </Grid>
          <Grid item xs />
        </Grid>
        <Grid item xs />
      </Main>
    </>
  );
};

export default App;
