export default function HandleError(errors) {
  if (Array.isArray(errors)) {
    return errors.map((error) => ({
      message: findErrorByMessage(error.message),
      originalError: error,
    }));
  } else if (typeof errors === "object") {
    return {
      message: findErrorByMessage(errors.message),
      originalError: errors,
    };
  } else {
    return { message: findErrorByMessage(errors), originalError: errors };
  }
}

function findErrorByMessage(message) {
  switch (message) {
    case "timeout of 500ms exceeded":
      return "Timeout";

    case "GraphQL error: The Url alredy exists":
      return "this URL was already used";

    default:
      return "Unknown  error";
  }
}
