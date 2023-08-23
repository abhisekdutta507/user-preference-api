export const check = async (_, response) => {
  return response
    .status(200)
    .send({
      data: {
        message: 'server is up'
      }
    });
};
