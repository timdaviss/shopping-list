import { Box, Drawer, IconButton } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import LastPageOutlinedIcon from '@mui/icons-material/LastPageOutlined';
import { FormType, ItemForm } from './item-form';
import { ShoppingListItem as ShoppingListItemInterface } from '@shopping-list/api-interfaces';

interface Props {
  isOpen: boolean;
  formType: FormType;
  handleToggleDrawer(open: boolean): (event: React.KeyboardEvent | React.MouseEvent) => void;
  state?: ShoppingListItemInterface;
}

const Header = styled.header`
  display: flex;
  background-color: #fbfafa;
  color: #5e6269;
  align-items: center;
  justify-content: space-between;
`;

export class ItemFormDrawer extends React.Component<Props> {

  override render(): React.ReactNode {
    return (
      <Drawer
        anchor="right"
        open={this.props.isOpen}
        onClose={this.props.handleToggleDrawer(false)}
      >
        <Box
          sx={{
            minWidth: '300px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
          height="100%"
        >
          <Header>
            <h3
              style={{
                margin: '25px',
                fontWeight: '500',
                textTransform: 'uppercase',
              }}
            >
              Shopping List
            </h3>
            <IconButton
              style={{ marginRight: '10px' }}
              onClick={this.props.handleToggleDrawer(false)}
            >
              <LastPageOutlinedIcon />
            </IconButton>
          </Header>
          <ItemForm
            formType={this.props.formType}
            onSubmit={this.props.handleToggleDrawer(false)}
            state={this.props.state}
          />
        </Box>
      </Drawer>
    );
  }
}
