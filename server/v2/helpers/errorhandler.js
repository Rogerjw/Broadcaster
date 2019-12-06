
export default (fn) => async (req, res, next) => {
  try {
    return await fn(req, res, next);
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.message,
    });
  }
};
