// axiosValidation.ts

import axios from "axios";

interface AbstractApiResponse {
  is_valid_format: { value: boolean };
  quality_score: string;
  is_disposable_email: { value: boolean };
  is_role_email: { value: boolean };
  deliverability: string;
}

interface EmailValidationResponse {
  isValid: boolean;
  isTemp: boolean;
  deliverability: string;
}

export const validateEmail = async (
  emailToCheck: string
): Promise<EmailValidationResponse> => {
  try {
    // Validate email using a simple regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidFormat = emailRegex.test(emailToCheck);

    if (!isValidFormat) {
      // If the email is not in a valid format, return early
      return {
        isValid: false,
        isTemp: false,
        deliverability: "INVALID_FORMAT",
      };
    }

    // Make a request to Abstract API for email validation
    const apiKey = "323268c695c24a24921bce278959160f"; // Replace with your actual Abstract API key
    const apiEndpoint = `https://emailvalidation.abstractapi.com/v1/?api_key=${apiKey}&email=${encodeURIComponent(
      emailToCheck
    )}`;

    const response = await axios.get<AbstractApiResponse>(apiEndpoint);
    console.log(response.data);

    // Check deliverability status
    const deliverability = response.data.deliverability;
    const isTemp =
      response.data.is_disposable_email?.value ||
      response.data.is_role_email?.value;

    // Check if the email is valid based on format and quality score
    const isValid =
      isValidFormat && parseFloat(response.data.quality_score) > 0.6;

    return { isValid, isTemp, deliverability };
  } catch (error) {
    console.error("Error checking email:", error);
    return { isValid: false, isTemp: false, deliverability: "ERROR" };
  }
};
