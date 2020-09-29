export function HandleError(errors) {
  let message = '';
  errors.forEach(err => {
    if (
      err.message.includes('ValidationError: email: Error, expected `email` to be unique.')
      ||
      err.message.includes('ValidationError: phone: Error, expected `phone` to be unique.')
      ||
      err.message.includes('ValidationError: email: Error, email')
    ) {
      message = 'This user is already registered';
    }
  });
  return message;
}
