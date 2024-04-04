import { useState } from "react";
export const MessageState = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  return { successMessage, setSuccessMessage, errorMessage, setErrorMessage };
};
