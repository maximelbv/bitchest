import styled from "@emotion/styled/macro";
import { Toolbar } from "@mui/material";

export default function RootLayout() {
  const StyledLayout = styled.div``;

  return (
    <StyledLayout>
      LAYOUT
      <Toolbar>
        <span>ok</span>
        <span>ok</span>
        <span>ok</span>
      </Toolbar>
    </StyledLayout>
  );
}
