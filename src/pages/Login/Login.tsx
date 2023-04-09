import { Box, Button, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { useAuth } from "src/context/auth.context";
import { AppPaper } from "src/shared/components/AppPaper/AppPaper";

const Login = observer(() => {
  const { authStore } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await authStore.login();
    navigate("/category/create");
  };

  return (
    <AppPaper elevation={8}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="h4">Login</Typography>

        <Box mt={4}>
          <Button variant="contained" onClick={handleLogin}>
            Login with Google
          </Button>
        </Box>
      </Box>
    </AppPaper>
  );
});

export default Login;
