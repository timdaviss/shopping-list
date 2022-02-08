import { Button } from '@mui/material';
import React from 'react';
import { FormType } from './item-form';
import { ItemFormDrawer } from './item-form-drawer';

interface Props {
  children: string;
}

interface State {
  isOpen: boolean;
}

export class ItemButton extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      this.setState({ isOpen: open });
    };

  override render(): React.ReactNode {
    return (
      <>
        <Button
          variant="contained"
          style={{ textTransform: 'none' }}
          onClick={this.toggleDrawer(true)}
        >
          {this.props.children}
        </Button>
        <ItemFormDrawer isOpen={this.state.isOpen} formType={FormType.add} handleToggleDrawer={this.toggleDrawer} />
      </>
    );
  }
}
