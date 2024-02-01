import axios from "axios";

interface DisposableApiResponse {
  disposable: boolean;
}

interface EmailValidationResponse {
  isTemp: boolean;
}

export const validateEmail = async (
  emailToCheck: string
): Promise<EmailValidationResponse> => {
  try {
    // Make a request to the disposable email check API
    const disposableApiEndpoint = `https://disposable.debounce.io/?email=${emailToCheck}`;
    const disposableResponse = await axios.get<DisposableApiResponse>(
      disposableApiEndpoint
    );
    console.log(disposableResponse.data);

    // Check if the email is disposable
    const isTemp = disposableResponse.data.disposable;

    return { isTemp };
  } catch (error) {
    console.error("Error checking email:", error);
    return { isTemp: false };
  }
};
