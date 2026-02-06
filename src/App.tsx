import { Box } from "@chakra-ui/react";
import { Toaster } from "@/components/ui/toaster";
import { UsersPage } from "@/pages/UsersPage";

export default function App() {
  return (
    <Box minH="100vh">
      <Toaster />
      <UsersPage />
    </Box>
  );
}
