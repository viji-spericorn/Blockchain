exports.AlreadyExistsError = (message) => {
  return {
    isError: true,
    message: message,
    code: 409,
    name: 'AlreadyExistsError',
    statusCode: 409,
  };
};
