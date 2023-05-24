exports.NotFound = (message, code) => {
  return {
    isError: true,
    message: message,
    code: code,
    name: 'NotFound',
    statusCode: 404,
  };
};
