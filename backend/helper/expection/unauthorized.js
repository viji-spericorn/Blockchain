exports.Unauthorized = (message) => {
  return {
    isError: true,
    message: message,
    code: 401,
    name: 'Unauthorized',
    statusCode: 401,
  };
};
