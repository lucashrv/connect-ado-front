import { Box, Container, Typography } from "@mui/joy";

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{ py: 4, borderTop: "1px solid", borderColor: "divider" }}
    >
      <Container sx={{ textAlign: "center" }}>
        <Typography level="body-xs" sx={{ color: "text.tertiary" }}>
          © 2026 ConnectAdo
        </Typography>
      </Container>
    </Box>
  );
}
