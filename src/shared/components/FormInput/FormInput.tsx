import { Clear } from "@mui/icons-material";
import { MouseEvent } from "react";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import {
  UseControllerProps,
  useController,
  FieldValues,
} from "react-hook-form";
import FormElement from "../FormElement/FormElement";

type MultilineProps =
  | { multiline: boolean; minRows?: number }
  | { multiline?: never; minRows?: never };

export interface FormInputProps<T extends FieldValues>
  extends UseControllerProps<T, any> {
  label?: string;
  placeholder?: string;
  formElementSpan?: number;
  name: string;
  md?: number;
  suffix?: string;
  infoText?: string;
  showClear?: boolean;
  clearClick?: (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
}

type Props<B extends FieldValues> = FormInputProps<B> & MultilineProps;

const FormInput = <N extends FieldValues>({
  control,
  name,
  rules,
  md = 12,
  label,
  multiline = false,
  minRows = 2,
  placeholder = "",
  formElementSpan = 4,
  suffix = "",
  infoText,
  showClear = false,
  clearClick,
}: Props<N>) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <Grid item md={md}>
      <FormElement
        label={label}
        formElementSpan={formElementSpan}
        errorMessage={error?.message}
        infoText={infoText}
      >
        <Box display="flex" alignItems="center">
          <TextField
            fullWidth
            placeholder={placeholder}
            multiline={multiline}
            minRows={minRows}
            onChange={onChange}
            onBlur={onBlur}
            size="small"
            value={value}
            name={name}
            inputRef={ref}
            error={Boolean(error)}
            InputProps={{
              endAdornment:
                showClear && value?.length > 1 ? (
                  <InputAdornment position="end">
                    <IconButton
                      data-testid="clear-icon"
                      onClick={(e) => clearClick?.(e)}
                    >
                      <Clear />
                    </IconButton>
                  </InputAdornment>
                ) : (
                  <></>
                ),
            }}
          />
          <Typography ml={2}>{suffix}</Typography>
        </Box>
      </FormElement>
    </Grid>
  );
};

export default FormInput;
