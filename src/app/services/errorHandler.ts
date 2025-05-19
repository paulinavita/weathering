export class ApiError extends Error {
  code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = "ApiError";
    this.code = code;
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
    };
  }
}

export const getErrorMessage = (error: ApiError): string => {
  switch (error.code) {
    case "CITY_NOT_FOUND":
      return "City not found. Please check the spelling and try again.";
    case "NETWORK_ERROR":
      return "Network connection error. Please check your internet connection.";
    case "API_ERROR":
      return `Weather service error (${error.code}). Please try again later.`;
    default:
      return "An unexpected error occurred. Please try again.";
  }
};
