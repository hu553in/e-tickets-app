export const ROUTES = {
  DEFAULT: '/',
  SIGN_IN: '/sign-in',
  ISSUE_TICKET: '/issue-ticket',
  LOTTERY: '/lottery',
  GENERATE_NEW_TICKET: '/generate-new-ticket',
  ADD_EXISTING_TICKET: '/add-existing-ticket',
  ISSUED_TICKETS: '/issued-tickets',
};

export enum IssueMethod {
  MANUAL = 'MANUAL',
  AUTOMATIC = 'AUTOMATIC',
}

export enum NotificationSeverity {
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
  SUCCESS = 'success',
}
