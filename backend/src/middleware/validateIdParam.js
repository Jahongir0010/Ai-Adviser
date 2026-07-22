function validateIdParam(paramName) {
  return (req, res, next) => {
    const raw = req.params[paramName];
    if (!/^\d+$/.test(raw)) {
      return res.status(400).json({ success: false, message: `"${paramName}" raqam bo'lishi kerak` });
    }
    next();
  };
}

module.exports = { validateIdParam };
