import { Dialog, DialogActions, DialogContent } from '@mui/material';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import Form from '../common/form-ui-kit/Form';
import FormRow from '../common/form-ui-kit/FormRow';
import TextInput from '../common/form-ui-kit/TextInput';
import { Button } from '../common/shadcn-ui-kit/button';

export type AddMoreProductItemDialogProps = {
  open: boolean;
  handleCloseModal(): void;
  onAddMoreItem(numberToAdd: number): void;
};

const AddMoreProductItemDialog: FC<AddMoreProductItemDialogProps> = (props) => {
  const { handleCloseModal, open, onAddMoreItem } = props;
  const methods = useForm();

  const onSubmit = (formData: any) => {
    onAddMoreItem(formData.num_item ?? 1);
  };

  return (
    <Dialog open={open} onClose={handleCloseModal} maxWidth="xl">
      {/* <DialogTitle>Page</DialogTitle> */}
      <Form methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <DialogContent>
          <FormRow>
            <TextInput name="num_item" required title="Number to add" />
          </FormRow>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={methods.handleSubmit(onSubmit)}>Save</Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};

export default AddMoreProductItemDialog;
