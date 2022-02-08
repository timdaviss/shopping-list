import { Card, CardContent } from '@mui/material';
import styled from 'styled-components';
import { ItemButton } from './add-item-button';

const EmptyCard = styled(Card)`
    align-items: stretch;
    height: 100%;
`

export const EmptyListCard = () => {
  return (
    <EmptyCard variant="outlined">
      <CardContent
        style={{
          display: 'flex',
          flexFlow: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80%'
        }}
      >
        <p>Your shopping list is empty :(</p>
        <ItemButton>
          Add your first item
        </ItemButton>
      </CardContent>
    </EmptyCard>
  );
};
