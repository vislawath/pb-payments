// PA-43: Add audit logging for security events

const fs = require('fs').promises;
const path = require('path');

class SecurityAuditLogger {
  constructor(logDir = './logs/security') {
    this.logDir = logDir;
    this.ensureLogDirectory();
  }
  
  async ensureLogDirectory() {
    try {
      await fs.mkdir(this.logDir, { recursive: true });
    } catch (error) {
      console.error('Failed to create security log directory:', error);
    }
  }
  
  async logSecurityEvent(event) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      eventType: event.type,
      severity: event.severity || 'INFO',
      userId: event.userId,
      ipAddress: event.ipAddress,
      action: event.action,
      resource: event.resource,
      outcome: event.outcome,
      details: event.details || {}
    };
    
    const logFile = path.join(this.logDir, `security-${new Date().toISOString().split('T')[0]}.log`);
    const logLine = JSON.stringify(logEntry) + '\n';
    
    try {
      await fs.appendFile(logFile, logLine);
    } catch (error) {
      console.error('Failed to write security audit log:', error);
    }
  }
  
  async logAuthenticationEvent(event) {
    await this.logSecurityEvent({
      ...event,
      type: 'AUTHENTICATION',
      resource: 'auth'
    });
  }
  
  async logAuthorizationEvent(event) {
    await this.logSecurityEvent({
      ...event,
      type: 'AUTHORIZATION',
      resource: 'access_control'
    });
  }
  
  async logDataAccessEvent(event) {
    await this.logSecurityEvent({
      ...event,
      type: 'DATA_ACCESS',
      resource: event.resource || 'data'
    });
  }
  
  async logSecurityViolation(event) {
    await this.logSecurityEvent({
      ...event,
      type: 'SECURITY_VIOLATION',
      severity: 'HIGH',
      resource: event.resource || 'system'
    });
  }
}

module.exports = SecurityAuditLogger;
