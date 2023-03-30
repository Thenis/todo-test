import { Help } from "@mui/icons-material";
import { Box, FormHelperText, Grid, Tooltip, Typography } from "@mui/material";
import { PropsWithChildren, ReactNode } from "react";

interface FormElementProps {
  label?: string;
  errorMessage?: string | undefined;
  formElementSpan?: number;
  infoText?: ReactNode;
  spacing?: number;
}

const FormElement = ({
  children,
  label,
  errorMessage,
  formElementSpan = 2,
  spacing = 3,
  infoText,
}: PropsWithChildren<FormElementProps>) => {
  return (
    <Grid container>
      {label && (
        <Grid item md={spacing}>
          <Box display="flex" alignItems="center">
            <Typography mr={1} fontWeight="bold">
              {label}
            </Typography>
            {infoText ? (
              <Tooltip
                title={
                  <div
                    style={{
                      whiteSpace: "pre-line",
                      fontSize: 16,
                    }}
                  >
                    {infoText}
                  </div>
                }
              >
                <Help
                  color="info"
                  fontSize="small"
                  sx={{
                    cursor: "help",
                  }}
                />
              </Tooltip>
            ) : (
              <></>
            )}
          </Box>
        </Grid>
      )}
      <Grid item md={formElementSpan}>
        {children}
        <FormHelperText error={true}>{errorMessage}</FormHelperText>
      </Grid>
    </Grid>
  );
};

export default FormElement;
