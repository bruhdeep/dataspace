import axios, { AxiosError } from "axios";

interface RapidApiResponse {
  valid: boolean;
  disposable: boolean;
}

interface EmailValidationResponse {
  isValid: boolean;
  isTemp: boolean; 
}

export const validateEmail = async (
  emailToCheck: string
): Promise<EmailValidationResponse> => {
  const options = {
    method: "GET",
    url: "https://mailcheck.p.rapidapi.com/",
    params: {
      email: emailToCheck,
    },
    headers: {
      "X-RapidAPI-Key": "08d15176demsh003d4dc3ae666a2p1c5c45jsnb412b4a72ac7",
      "X-RapidAPI-Host": "mailcheck.p.rapidapi.com",
    },
  };

  try {
    // Make a request to the RapidAPI for email validation
    const response = await axios.request(options);
    console.log(response.data);

    // Check if the email is valid and temporary
    const isValid = response.data.valid;
    const isTemp = response.data.disposable;

    return { isValid, isTemp }; // Changed from isDisposable to isTemp
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error("Error checking email:", axiosError.message);
    return { isValid: false, isTemp: false }; // Changed from isDisposable to isTemp
  }
};
