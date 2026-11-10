export function roleBasedAccess(role) {
  return function (req, res, next) {
    const user = req.user;
    const userRoles = user.roles;

    if (userRoles.includes(role)) {
      next();
    } else {
      return res.status(403).json({
        message: "insuffecient permissions",
      });
    }
  };
}
