import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  MenuItem,
  TextField,
} from '@mui/material';
import React from 'react';
import { ShoppingListItem as ShoppingListItemInterface } from '@shopping-list/api-interfaces';

export enum FormType {
  add = 'add',
  edit = 'edit',
}

interface Props {
  formType: FormType;
  onSubmit(event: React.KeyboardEvent | React.MouseEvent): void;
  state?: ShoppingListItemInterface;
}

interface State {
  name: string;
  description: string;
  quantity: number | string;
  purchased?: boolean | undefined;
}

export class ItemForm extends React.Component<Props, State> {
  defaultState: State = {
    name: '',
    description: '',
    quantity: '',
    // purchased: undefined,
  };
  formHeaderText = {
    [FormType.add]: 'Add an Item',
    [FormType.edit]: 'Edit an Item',
  };
  formSubheadingText = {
    [FormType.add]: 'Add your new item below',
    [FormType.edit]: 'Edit your item below',
  };
  formSubmitText = {
    [FormType.add]: 'Add Task',
    [FormType.edit]: 'Save item',
  };

  constructor(props: Props) {
    super(props);
    if (this.props.state) {
      this.state = {
        ...this.props.state,
        quantity: `${this.props.state.quantity}`,
        purchased: !!this.props.state.purchased,
      };
    } else {
      this.state = { ...this.defaultState };
    }
  }

  handleChange = {
    name: (event: React.ChangeEvent<HTMLInputElement>): void =>
      this.setState({ name: event.target.value }),
    description: (event: React.ChangeEvent<HTMLInputElement>): void =>
      this.setState({ description: event.target.value }),
    quantity: (event: React.ChangeEvent<HTMLInputElement>): void =>
      this.setState({ quantity: parseInt(event.target.value) }),
    purchased: (event: React.ChangeEvent<HTMLInputElement>): void =>
      this.setState({ purchased: event.target.checked }),
  };

  /**
   * This handles "create or update" logic upon clicking submission button.
   * @param event React.MouseEvent
   */
  handleSubmit = async (event: React.MouseEvent) => {
    if (this.props.formType === FormType.add) {
      await fetch('/api/shopping-list', {
        method: 'POST',
        body: JSON.stringify({ ...this.state }),
        headers: { 'Content-Type': 'application/json' },
      });
      this.setState({ ...this.defaultState });
    } else if (this.props.formType === FormType.edit && this.props.state) {
      // empty `this.props.state` should just throw an error for tighter data grip.
      await fetch(`/api/shopping-list/${this.props.state.id}`, {
        method: 'PUT',
        body: JSON.stringify({ id: this.props.state.id, ...this.state }),
        headers: { 'Content-Type': 'application/json' },
      });
    }
    this.props.onSubmit(event);
  };

  handleCancel = (event: React.MouseEvent): void => {
    this.setState({ ...this.defaultState });
    this.props.onSubmit(event);
  };

  override render(): React.ReactNode {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    let purchased = <></>;
    if (this.props.formType === FormType.edit && this.props.state) {
      purchased = (
        <Box sx={{ my: 1, mx: 3 }}>
          <FormControlLabel
            control={
              <Checkbox
                onChange={this.handleChange.purchased}
                checked={this.state.purchased}
              />
            }
            label="Purchased"
          />
        </Box>
      );
    }
    return (
      <>
        <Box
          component="form"
          sx={{
            '& h3': { mt: 3, mb: 0, mx: 3 },
            '& p': { my: 1, mx: 3 },
            '& .MuiTextField-root': { my: 1, mx: 3, width: '60ch' },
          }}
        >
          <FormControl fullWidth>
            <h3>{this.formHeaderText[this.props.formType]}</h3>
            <p>{this.formSubheadingText[this.props.formType]}</p>
            <TextField
              placeholder="Item Name"
              value={this.state.name}
              onChange={this.handleChange.name}
            ></TextField>
            <TextField
              placeholder="Description"
              multiline
              rows={4}
              inputProps={{ maxLength: 100 }}
              value={this.state.description}
              onChange={this.handleChange.description}
            ></TextField>
            <TextField
              label="How many?"
              select
              value={this.state.quantity}
              onChange={this.handleChange.quantity}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
            </TextField>
            {purchased}
          </FormControl>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            alignItems: 'end',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row-reverse',
              flexGrow: 1,
              gap: '10px',
              padding: '20px 10px',
            }}
          >
            <Button variant="contained" onClick={this.handleSubmit} style={{ textTransform: 'none' }}>
              {this.formSubmitText[this.props.formType]}
            </Button>
            <Button onClick={this.handleCancel} style={{ textTransform: 'none', color: 'black' }}>Cancel</Button>
          </div>
        </Box>
      </>
    );
  }
}
