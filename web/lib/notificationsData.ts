export type NotificationKind =
  | "warning"
  | "reminder"
  | "info"
  | "error"
  | "success"
  | "deal"
  | "privacy";

export type NotificationItem = {
  id: string;
  kind: NotificationKind;
  title: string;
  timestamp: string;
  description: string;
};

/** Items shown in the nav bell dropdown. */
export const DROPDOWN_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n1",
    kind: "warning",
    title: "Manual Settlement Required",
    timestamp: "12/12/2024, 03:45a",
    description: "Invoices for 12/24/2026 to 1/24/2026 need manual settlement with 0026 - Nebraska",
  },
  {
    id: "n2",
    kind: "reminder",
    title: "Employee Onboarding Form – Year Completion",
    timestamp: "12/12/2024, 03:45a",
    description: "John Doe’s year completion onboarding form is still pending submission.",
  },
  {
    id: "n3",
    kind: "reminder",
    title: "Reminder : Employee Year Completion Form",
    timestamp: "12/12/2024, 03:45a",
    description: "John Doe’s year completion onboarding form is still pending submission.",
  },
  {
    id: "n4",
    kind: "reminder",
    title: "Reminder : Your Day 1 Form",
    timestamp: "12/12/2024, 03:45a",
    description: "Your day 1 onboarding form is still pending submission.",
  },
  {
    id: "n5",
    kind: "warning",
    title: "Requires Attention!",
    timestamp: "12/12/2024, 03:45a",
    description: "Q1 - Contract 2024 has addendum. Review and acknowledge.",
  },
  {
    id: "n6",
    kind: "warning",
    title: "Requires Attention!",
    timestamp: "12/12/2024, 03:45a",
    description: "Schedule of Site “Zorinski Lake” requires attention",
  },
  {
    id: "n7",
    kind: "info",
    title: "Time-off Application",
    timestamp: "12/12/2024, 03:45a",
    description: "Officer “Mike Smith” applied for time-off on 02/14/2024",
  },
];

/** Full notifications screen list. */
export const ALL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "a1",
    kind: "warning",
    title: "Requires Attention!",
    timestamp: "Feb 16, 03:45a",
    description: "Schedule of Site “Zorinski Lake” requires attention",
  },
  {
    id: "a2",
    kind: "info",
    title: "Time-off Application",
    timestamp: "Feb 15, 03:45a",
    description: "Officer “Mike Smith” applied for time-off on 02/14/2024",
  },
  {
    id: "a3",
    kind: "reminder",
    title: "NC Alert",
    timestamp: "Feb 02, 03:45a",
    description: "Officer “Mike Smith” has not started the job yet",
  },
  {
    id: "a4",
    kind: "info",
    title: "Time change request",
    timestamp: "Jan 29, 03:45a",
    description: "Mike Andrew requested time change",
  },
  {
    id: "a5",
    kind: "error",
    title: "System Error!",
    timestamp: "Jan 29, 03:45a",
    description: "Your changes to report template “Vehicle Inspection Report” could not be saved",
  },
  {
    id: "a6",
    kind: "success",
    title: "Congratulations! New Badge!",
    timestamp: "Jan 25, 03:45a",
    description: "Congratulations! You just earned a new badge on completing your milestones",
  },
  {
    id: "a7",
    kind: "deal",
    title: "Deal Status Updated",
    timestamp: "Jan 24, 03:45a",
    description: "Deal status for “Costco Wholesale” updated to Nurturing",
  },
  {
    id: "a8",
    kind: "privacy",
    title: "Privacy Alert",
    timestamp: "Jan 22, 03:44a",
    description: "Suspicious activity detected on your account",
  },
];
