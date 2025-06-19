const authorizeRole = (requiredRole) => {
  return (req, res, next) => {
    if (!req.userRoles || !req.userRoles.includes(requiredRole)) {
      return res.status(403).json({ message: 'Forbidden: insufficient privileges' });
    }
    next();
  };
};

module.exports = {authorizeRole};