// PA-42: Implement role-based access control

class RoleBasedAccessControl {
  constructor() {
    this.roles = {
      admin: ['read', 'write', 'delete', 'manage'],
      user: ['read', 'write'],
      viewer: ['read']
    };
    
    this.permissions = {
      payments: {
        read: ['admin', 'user', 'viewer'],
        write: ['admin', 'user'],
        delete: ['admin'],
        manage: ['admin']
      },
      refunds: {
        read: ['admin', 'user'],
        write: ['admin'],
        delete: ['admin'],
        manage: ['admin']
      },
      users: {
        read: ['admin'],
        write: ['admin'],
        delete: ['admin'],
        manage: ['admin']
      }
    };
  }
  
  /**
   * Check if user has permission for a resource
   */
  hasPermission(userRole, resource, action) {
    if (!this.roles[userRole]) {
      return false;
    }
    
    if (!this.permissions[resource]) {
      return false;
    }
    
    const allowedRoles = this.permissions[resource][action];
    return allowedRoles && allowedRoles.includes(userRole);
  }
  
  /**
   * Get all permissions for a role
   */
  getRolePermissions(role) {
    return this.roles[role] || [];
  }
  
  /**
   * Check access to a specific resource
   */
  canAccess(userRole, resource, action) {
    return this.hasPermission(userRole, resource, action);
  }
  
  /**
   * Middleware for Express routes
   */
  middleware(resource, action) {
    return (req, res, next) => {
      const userRole = req.user?.role || 'viewer';
      
      if (!this.canAccess(userRole, resource, action)) {
        return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
      }
      
      next();
    };
  }
}

module.exports = RoleBasedAccessControl;
