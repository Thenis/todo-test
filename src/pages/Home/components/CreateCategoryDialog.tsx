import { Send } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import DialogWithCancel, {
  DialogWithCancelProps,
} from "src/shared/components/DialogWithCancel/DialogWithCancel";
import FormElement from "src/shared/components/FormElement/FormElement";

interface CreateCategoryDialogProps extends DialogWithCancelProps {}

const CreateCategoryDialog = ({ isOpen, close }: CreateCategoryDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ title: string }>({
    defaultValues: {
      title: "",
    },
  });

  const titleFormControl = register("title", {
    required: "This field is required",
    minLength: {
      value: 5,
      message: "Title must be at least 5 characters",
    },
  });

  const onSubmit = (data: { title: string }) => {
    console.log(data);
    reset();
  };

  const handleClose = (e: any) => {
    reset();
    close(e);
  };

  return (
    <DialogWithCancel isOpen={isOpen} close={handleClose}>
      <Typography mb={2} variant="h5">
        Create Category
      </Typography>

      <Box
        mt={8}
        component="form"
        id="title-control"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormElement formElementSpan={12} errorMessage={errors.title?.message}>
          <TextField label="Title" fullWidth {...titleFormControl} />
        </FormElement>

        <Box mt={8}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            endIcon={<Send />}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </DialogWithCancel>
  );
};

export default CreateCategoryDialog;
