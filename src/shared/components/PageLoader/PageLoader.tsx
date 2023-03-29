import { Box, CircularProgress } from "@mui/material";

interface PageLoaderProps {
  height?: string;
}

const PageLoader = ({ height = "100%" }: PageLoaderProps) => {
  return (
    <Box
      display="flex"
      height={height}
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress size={80} />
    </Box>
  );
};

export default PageLoader;
