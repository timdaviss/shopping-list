import {
  Card,
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { ShoppingListItem as ShoppingListItemInterface } from '@shopping-list/api-interfaces';
import React from 'react';
import { DeleteOutlineRounded, EditOutlined } from '@mui/icons-material';
import { ItemFormDrawer } from './item-form-drawer';
import { FormType } from './item-form';
import { ItemDeleteModal } from './item-delete-modal';

interface State {
  labelId: string;
  checked: number[];
  drawerOpen: boolean;
  modalOpen: boolean;
}

export default class ShoppingListItem extends React.Component<
  ShoppingListItemInterface,
  State
> {
  constructor(props: ShoppingListItemInterface) {
    super(props);
    this.state = {
      labelId: `checkbox-list-label-${props.id}`,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      checked: [+props.purchased!],
      drawerOpen: false,
      modalOpen: false,
    };
  }

  handleToggle = (value: number) => () => {

    const currentIndex = this.state.checked.indexOf(value);
    const newChecked = [...this.state.checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({ checked: newChecked });
  };

  toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      this.setState({ drawerOpen: open });
    };

  toggleModal =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      this.setState({ modalOpen: open });
    };

  override render(): React.ReactNode {
    return (
      <ListItem key={this.props.id} disableGutters>
        <Card
          variant="outlined"
          style={{
            margin: '0px',
            width: '-webkit-fill-available',
            display: 'flex',
            alignItems: 'center',
            padding: '15px 0px',
            backgroundColor:
              this.state.checked.indexOf(this.props.id) !== -1
                ? '#F8FAFB'
                : 'transparent',
            border:
              this.state.checked.indexOf(this.props.id) !== -1
                ? '0'
                : '1px solid rgba(0,0,0,0.12)',
          }}
        >
          <ListItemButton
            onClick={this.handleToggle(this.props.id)}
            dense
            disableRipple
            sx={{
              '&:hover': {
                backgroundColor: 'transparent',
              },
            }}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={this.state.checked.indexOf(this.props.id) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': this.state.labelId }}
                sx={{
                  color: '#C6C6C6',
                  '&.Mui-checked': { color: '#587DB0' },
                }}
              />
            </ListItemIcon>
            <ListItemText
              id={this.state.labelId}
              primary={this.props.name}
              secondary={this.props.description}
              sx={{
                '& .MuiListItemText-primary': {
                  color:
                    this.state.checked.indexOf(this.props.id) !== -1
                      ? '#587DB0'
                      : 'inherit',
                  textDecoration:
                    this.state.checked.indexOf(this.props.id) !== -1
                      ? 'line-through'
                      : 'none',
                },
                '& .MuiListItemText-secondary': {
                  textDecoration:
                    this.state.checked.indexOf(this.props.id) !== -1
                      ? 'line-through'
                      : 'none',
                },
              }}
            />
          </ListItemButton>
          <div style={{ justifyContent: 'space-around', marginRight: '25px' }}>
            <IconButton aria-label="Edit" onClick={this.toggleDrawer(true)}>
              <EditOutlined />
            </IconButton>
            <ItemFormDrawer
              isOpen={this.state.drawerOpen}
              formType={FormType.edit}
              handleToggleDrawer={this.toggleDrawer}
              state={{...this.props}}
            />
            <IconButton aria-label="Delete" onClick={this.toggleModal(true)}>
              <DeleteOutlineRounded />
            </IconButton>
            <ItemDeleteModal open={this.state.modalOpen} onClose={this.toggleModal(false)} id={this.props.id} />
          </div>
        </Card>
      </ListItem>
    );
  }
}
