import { CircularProgress, List, ListSubheader } from '@mui/material';
import { ShoppingListItem as ShoppingListItemInterface } from '@shopping-list/api-interfaces';
import React from 'react';
import { ItemButton } from './add-item-button';
import { EmptyListCard } from './empty-list-card';
import ShoppingListItem from './shopping-list-item';

interface State {
  shoppingList: ShoppingListItemInterface[];
  status: Status;
}

enum Status {
  loading = 'loading',
  loaded = 'loaded',
}

class ShoppingList extends React.Component<object, State> {
  constructor(props: object) {
    super(props);
    this.state = {
      shoppingList: [],
      status: Status.loading,
    };
  }

  override componentDidMount() {
    // Load shopping list data.
    setTimeout(() => {
      fetch('/api/shopping-list').then((r) => {
        return r.json().then((value) => {
          this.setState({ shoppingList: value, status: Status.loaded });
        });
      });
    }, 1000);
  }

  override render(): React.ReactNode {
    if (this.state.status === Status.loading) {
      return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress
            size={75}
            thickness={1.7}
            style={{ color: '#5980b3' }}
          />
        </div>
      );
    } else if (this.state.shoppingList.length > 0) {
      return (
        <List>
          <ListSubheader
            disableGutters
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
            }}
          >
            <h2 style={{ margin: '0px' }}>Your Items</h2>
            <ItemButton>Add Item</ItemButton>
          </ListSubheader>
          {this.state.shoppingList.map((element: ShoppingListItemInterface) => {
            return (
              <ShoppingListItem
                key={element.id}
                id={element.id}
                name={element.name}
                description={element.description}
                quantity={element.quantity}
                purchased={element.purchased}
              ></ShoppingListItem>
            );
          })}
        </List>
      );
    } else {
      return <EmptyListCard></EmptyListCard>;
    }
  }
}

export default ShoppingList;
