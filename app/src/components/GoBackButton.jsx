import { useHistory } from "react-router-dom";

export default function GoBackButton() {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };
  return <button onClick={handleGoBack}>Go Back</button>;
}
