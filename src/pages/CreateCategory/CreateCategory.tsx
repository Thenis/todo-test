import { Save } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useForm } from "react-hook-form";
import { useCreateCategoryContext } from "src/context/create-category.context";
import { AppPaper } from "src/shared/components/AppPaper/AppPaper";
import FormInput from "src/shared/components/FormInput/FormInput";

const titleRules = {
  required: "This field is required",
  minLength: {
    value: 5,
    message: "Title must be at least 5 characters",
  },
};

const CreateCategory = observer(() => {
  const { createCategoryService } = useCreateCategoryContext();

  const { handleSubmit, reset, control } = useForm<{ title: string }>({
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (data: { title: string }) => {
    reset();
    await createCategoryService.create(data.title);
  };

  return (
    <>
      <Box component="header" mb={4} display="flex" alignItems="center">
        <Typography variant="h5">Create Category</Typography>
      </Box>

      <AppPaper elevation={8}>
        <Grid
          onSubmit={handleSubmit(onSubmit)}
          component="form"
          container
          spacing={4}
          rowGap={2}
        >
          <FormInput
            rules={titleRules}
            label="Title"
            name="title"
            control={control}
          />

          <Grid my={2} item md={12} display="flex" alignItems="flex-start">
            <Button type="submit" variant="contained" startIcon={<Save />}>
              Create Category
            </Button>
          </Grid>
        </Grid>
      </AppPaper>
    </>
  );
});

export default CreateCategory;
