import { Send } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import DialogWithCancel, {
  DialogWithCancelProps,
} from "src/shared/components/DialogWithCancel/DialogWithCancel";
import FormElement from "src/shared/components/FormElement/FormElement";
import { validateUrl } from "src/utils/validateUrl";

interface ICreateNewLinkProps extends DialogWithCancelProps {
  createLink: (url: string) => void;
}

const CreateNewLink = ({ close, isOpen, createLink }: ICreateNewLinkProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ link: string }>({
    defaultValues: {
      link: "",
    },
  });

  const linkFormControl = register("link", {
    required: "This field is required",
    minLength: {
      value: 5,
      message: "Title must be at least 5 characters",
    },
    validate: validateUrl,
  });

  const onSubmit = (data: { link: string }) => {
    reset();
    createLink(data.link);
  };

  const handleClose = (e: any) => {
    reset();
    close(e);
  };

  return (
    <DialogWithCancel isOpen={isOpen} close={handleClose}>
      <Typography mb={2} variant="h5">
        Create New Link
      </Typography>

      <Box
        mt={8}
        component="form"
        id="link-control"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormElement formElementSpan={12} errorMessage={errors.link?.message}>
          <TextField label="Link" fullWidth {...linkFormControl} />
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

export default CreateNewLink;
