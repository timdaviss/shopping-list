import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import React from 'react';

interface Props {
  open: boolean;
  onClose(open: React.KeyboardEvent | React.MouseEvent): void;
  id: number;
}

export class ItemDeleteModal extends React.Component<Props> {
  handleDelete = async (event: React.KeyboardEvent | React.MouseEvent) => {
    const response = (
      await fetch(`/api/shopping-list/${this.props.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
    ).json();
    console.log(response);
    this.props.onClose(event);
  };

  override render(): React.ReactNode {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        sx={{
          padding: '25px',
          '& .MuiPaper-root': { padding: '30px', maxWidth: '375px' },
        }}
      >
        <DialogTitle sx={{ padding: '0 0 12px' }}>Delete Item?</DialogTitle>
        <DialogContent sx={{ padding: '16px 0', height: '100px' }}>
          Are you sure you want to delete this item? This can not be undone.
        </DialogContent>
        <DialogActions sx={{ padding: '0' }}>
          <Button onClick={this.props.onClose} style={{ textTransform: 'none', color: 'black' }}>Cancel</Button>
          <Button variant="contained" onClick={this.handleDelete} style={{ textTransform: 'none' }}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}
