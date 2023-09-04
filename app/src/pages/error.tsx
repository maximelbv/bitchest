import { useRouteError } from "react-router-dom";
import { styled } from "styled-components";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const StyledError = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `;

  return (
    <StyledError>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </StyledError>
  );
}
