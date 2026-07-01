export const ADMIN_NAVIGATION_DATA = [
  { label: "Dashboard", href: "/admin/dashboard", icon: "House" },
  {
    label: "Employees",
    href: "/admin/employees",
    icon: "Users",
    children: [
      { label: "Employee List", href: "/admin/employees" },
      { label: "Add Employee", href: "/admin/employees/new" },
      { label: "Bulk Import", href: "/admin/employees/bulk-import" },
      { label: "Departments", href: "/admin/employees/departments" },
      { label: "Positions", href: "/admin/employees/positions" },
      { label: "Employment Status", href: "/admin/employees/status" },
    ],
  },
  {
    label: "Attendance",
    href: "/admin/attendance",
    icon: "Clock3",
    children: [
      { label: "Attendance Dashboard", href: "/admin/attendance" },
      { label: "Daily Attendance", href: "/admin/attendance/daily-attendance" },
      { label: "Corrections", href: "/admin/attendance/corrections" },
      { label: "Overtime Requests", href: "/admin/attendance/ot-requests" },
      { label: "Tardiness & Undertime", href: "/admin/attendance/tardiness-undertime" },
    ],
  },
  {
    label: "Leave Management",
    href: "/admin/leaves",
    icon: "CalendarClock",
    children: [
      { label: "Leave Dashboard", href: "/admin/leaves" },
      { label: "Leave Requests", href: "/admin/leaves/requests" },
      { label: "Leave Balances", href: "/admin/leaves/balances" },
      { label: "Leave Types", href: "/admin/leaves/types" },
      // { label: "Leave Calendar", href: "/admin/leaves/calendar" },
    ],
  },
  {
    label: "Payroll",
    href: "/admin/payroll",
    icon: "CreditCard",
    children: [
      { label: "Generate Payroll", href: "/admin/payroll/generate" },
      { label: "Run Payroll", href: "/admin/payroll/run" },
      { label: "Payslips", href: "/admin/payroll/payslips" },
      { label: "Leave Encashment", href: "/admin/payroll/leave-encashment" },
      // { label: "Payroll Settings", href: "/admin/payroll/settings" },
    ],
  },
  {
    label: "Government Contributions",
    href: "/admin/contributions",
    icon: "Landmark",
  },
  {
    label: "User Management",
    href: "/admin/users",
    icon: "ShieldCheck",
    children: [
      { label: "Users", href: "/admin/users" },
      { label: "Roles & Permissions", href: "/admin/users/roles" },
    ],
  },
  { label: "Activity Logs", href: "/admin/activity", icon: "Activity" },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: "Settings",
  },
] as const

export const KPI_DATA = [
  {
    title: "Total Employees",
    value: "1,248",
    note: "+12 this month",
    tone: "blue",
    icon: "Users",
  },
  {
    title: "Present Today",
    value: "1,103",
    note: "88.4% of employees",
    tone: "green",
    icon: "CalendarCheck",
  },
  {
    title: "On Leave",
    value: "36",
    note: "Active leaves",
    tone: "amber",
    icon: "Umbrella",
  },
  {
    title: "Payroll Due",
    value: "₱1.82M",
    note: "Upcoming payroll",
    tone: "violet",
    icon: "Wallet",
  },
  {
    title: "Late Today",
    value: "47",
    note: "3.8% of employees",
    tone: "orange",
    icon: "Clock3",
  },
  {
    title: "Overtime Requests",
    value: "18",
    note: "Pending approval",
    tone: "sky",
    icon: "Timer",
  },
  {
    title: "Absent Today",
    value: "62",
    note: "5.0% of employees",
    tone: "red",
    icon: "UserMinus",
  },
  {
    title: "Pending Approvals",
    value: "24",
    note: "All types",
    tone: "purple",
    icon: "ClipboardList",
  },
] as const

export const ATTENDANCE_TREND_DATA = [
  { date: "May 17", present: 1024, absent: 58 },
  { date: "May 20", present: 1058, absent: 52 },
  { date: "May 23", present: 1072, absent: 48 },
  { date: "May 26", present: 1148, absent: 36 },
  { date: "May 29", present: 1046, absent: 61 },
  { date: "Jun 1", present: 1098, absent: 44 },
  { date: "Jun 4", present: 1140, absent: 39 },
  { date: "Jun 7", present: 1064, absent: 56 },
  { date: "Jun 10", present: 1126, absent: 41 },
  { date: "Jun 13", present: 1088, absent: 50 },
  { date: "Jun 16", present: 1038, absent: 65 },
  { date: "Jun 18", present: 1054, absent: 62 },
] as const

export const ATTENDANCE_SUMMARY_DATA = [
  { name: "Present", value: 1103, percent: 88, fill: "#22c55e" },
  { name: "Late", value: 47, percent: 4, fill: "#fb923c" },
  { name: "On Leave", value: 36, percent: 3, fill: "#fbbf24" },
  { name: "Absent", value: 62, percent: 5, fill: "#ef4444" },
] as const

export const PAYROLL_SUMMARY_DATA = [
  { label: "Gross Payroll", value: "₱2,120,000.00", tone: "default" },
  { label: "Total Deductions", value: "₱298,000.00", tone: "danger" },
  { label: "Net Payroll", value: "₱1,822,000.00", tone: "success" },
] as const

export const GOVERNMENT_CONTRIBUTIONS_DATA = [
  { label: "SSS", value: "₱145,200.00", icon: "BadgeCheck", tone: "slate" },
  { label: "PhilHealth", value: "₱62,100.00", icon: "HeartPulse", tone: "green" },
  { label: "Pag-IBIG", value: "₱28,400.00", icon: "Home", tone: "violet" },
  { label: "Withholding Tax", value: "₱62,300.00", icon: "Receipt", tone: "red" },
  { label: "Loan", value: "₱52,250.00", icon: "Receipt", tone: "red" },
] as const

export const DEPARTMENT_DATA = [
  { department: "IT", employees: 152 },
  { department: "HR", employees: 34 },
  { department: "Finance", employees: 48 },
  { department: "Operations", employees: 320 },
] as const

export const PENDING_APPROVALS_DATA = [
  { label: "Leave Requests", count: 12, tone: "green" },
  { label: "Overtime Requests", count: 18, tone: "amber" },
  { label: "Attendance Corrections", count: 10, tone: "blue" },
  { label: "Payroll Review", count: 1, tone: "violet" },
  { label: "New Employee Registrations", count: 4, tone: "slate" },
] as const

export const RECENT_ACTIVITIES_DATA = [
  {
    title: "John Doe clocked in at 08:01 AM",
    time: "2 minutes ago",
    icon: "UserCheck",
    tone: "green",
  },
  {
    title: "Payroll generated for June 1 - 15, 2026",
    time: "15 minutes ago",
    icon: "FileText",
    tone: "blue",
  },
  {
    title: "Maria Santos approved leave request",
    time: "1 hour ago",
    icon: "CheckCircle2",
    tone: "orange",
  },
  {
    title: "New employee registered: Peter Cruz",
    time: "2 hours ago",
    icon: "Users",
    tone: "violet",
  },
  {
    title: "SSS contribution report exported",
    time: "3 hours ago",
    icon: "FileSpreadsheet",
    tone: "green",
  },
] as const

export const EMPLOYEE_KPI_DATA = [
  {
    title: "Total Employees",
    value: "1,248",
    note: "+12 this month",
    tone: "blue",
    icon: "Users",
  },
  {
    title: "Active Employees",
    value: "1,198",
    note: "95.99% of total",
    tone: "green",
    icon: "CalendarCheck",
  },
  {
    title: "Regular Employees",
    value: "1,102",
    note: "88.28% of total",
    tone: "amber",
    icon: "UserRoundCheck",
  },
  {
    title: "On Probation",
    value: "56",
    note: "4.49% of total",
    tone: "violet",
    icon: "BriefcaseBusiness",
  },
  {
    title: "Resigned",
    value: "50",
    note: "4.01% of total",
    tone: "red",
    icon: "ShieldX",
  },
] as const

export const EMPLOYEE_FILTER_DATA = {
  departments: [
    "All Departments",
    "Information Technology",
    "Human Resources",
    "Finance",
    "Operations",
    "Sales",
  ],
  statuses: ["All Status", "Regular", "On Probation", "Resigned"],
  positions: [
    "All Positions",
    "Software Developer",
    "HR Officer",
    "Accountant",
    "Operations Manager",
    "System Analyst",
    "Sales Executive",
  ],
} as const

export const EMPLOYEE_TABLE_DATA = [
  {
    id: "EMP-0001",
    name: "Juan Dela Cruz",
    email: "juan.delacruz@naditsolutions.com",
    department: "Information Technology",
    position: "Software Developer",
    status: "Regular",
    dateHired: "Jan 15, 2020",
    contact: "0917-123-4567",
    initials: "JC",
    tone: "blue",
  },
  {
    id: "EMP-0002",
    name: "Maria Santos",
    email: "maria.santos@naditsolutions.com",
    department: "Human Resources",
    position: "HR Officer",
    status: "Regular",
    dateHired: "Mar 01, 2019",
    contact: "0918-234-5678",
    initials: "MS",
    tone: "pink",
  },
  {
    id: "EMP-0003",
    name: "Carlos Reyes",
    email: "carlos.reyes@naditsolutions.com",
    department: "Finance",
    position: "Accountant",
    status: "Regular",
    dateHired: "Feb 10, 2021",
    contact: "0919-345-6789",
    initials: "CR",
    tone: "slate",
  },
  {
    id: "EMP-0004",
    name: "Anna Garcia",
    email: "anna.garcia@naditsolutions.com",
    department: "Operations",
    position: "Operations Manager",
    status: "Regular",
    dateHired: "Apr 20, 2018",
    contact: "0920-456-7890",
    initials: "AG",
    tone: "pink",
  },
  {
    id: "EMP-0005",
    name: "Michael Tan",
    email: "michael.tan@naditsolutions.com",
    department: "Information Technology",
    position: "System Analyst",
    status: "On Probation",
    dateHired: "May 05, 2024",
    contact: "0921-567-8901",
    initials: "MT",
    tone: "slate",
  },
  {
    id: "EMP-0006",
    name: "Jane Lim",
    email: "jane.lim@naditsolutions.com",
    department: "Sales",
    position: "Sales Executive",
    status: "Regular",
    dateHired: "Jun 18, 2022",
    contact: "0922-678-9012",
    initials: "JL",
    tone: "pink",
  },
  {
    id: "EMP-0007",
    name: "Robert Navarro",
    email: "robert.navarro@naditsolutions.com",
    department: "Finance",
    position: "Finance Manager",
    status: "Regular",
    dateHired: "Jul 12, 2017",
    contact: "0923-789-0123",
    initials: "RN",
    tone: "slate",
  },
  {
    id: "EMP-0008",
    name: "Patricia Cruz",
    email: "patricia.cruz@naditsolutions.com",
    department: "Human Resources",
    position: "HR Manager",
    status: "Regular",
    dateHired: "Aug 30, 2016",
    contact: "0924-890-1234",
    initials: "PC",
    tone: "pink",
  },
  {
    id: "EMP-0009",
    name: "Brian Villanueva",
    email: "brian.villanueva@naditsolutions.com",
    department: "Operations",
    position: "Team Leader",
    status: "Regular",
    dateHired: "Sep 11, 2023",
    contact: "0925-901-2345",
    initials: "BV",
    tone: "slate",
  },
  {
    id: "EMP-0010",
    name: "Kevin Mendoza",
    email: "kevin.mendoza@naditsolutions.com",
    department: "Sales",
    position: "Sales Associate",
    status: "Resigned",
    dateHired: "May 20, 2024",
    contact: "0926-012-3456",
    initials: "KM",
    tone: "slate",
  },
] as const

export const ADD_EMPLOYEE_STEPS = [
  {
    step: 1,
    title: "Personal Information",
    description: "Basic details of employee",
  },
  {
    step: 2,
    title: "Job Information",
    description: "Position and department",
  },
  {
    step: 3,
    title: "Compensation",
    description: "Salary and payroll details",
  },
  {
    step: 4,
    title: "Biometrics Registration",
    description: "Fingerprint / Face enrollment",
  },
  {
    step: 5,
    title: "Review & Submit",
    description: "Review and add employee",
  },
] as const

export const ADD_EMPLOYEE_SUMMARY_DATA = {
  name: "Maria Santos",
  role: "HR Specialist",
  personal: [
    ["Date of Birth", "March 12, 1994"],
    ["Mobile Number", "+63 917 123 4567"],
    ["Email Address", "maria.santos@gmail.com"],
  ],
  job: [
    ["Department", "Human Resources"],
    ["Position", "HR Specialist"],
    ["Employment Type", "Regular"],
    ["Date Hired", "May 20, 2026"],
  ],
  compensation: [
    ["Pay Group", "Regular"],
    ["Pay Type", "Monthly"],
    ["Basic Salary", "PHP 35,000.00"],
    ["Currency", "PHP"],
    ["Payroll Frequency", "Semi-Monthly"],
  ],
} as const

export const ADD_EMPLOYEE_UPLOADS = [
  "SSS ID / Number",
  "PhilHealth ID",
  "Pag-IBIG ID",
  "TIN ID / 2316",
  "NBI Clearance",
  "Medical Certificate",
  "Other Document",
] as const

export const BULK_IMPORT_STEPS = [
  { step: 1, title: "Upload File", description: "Upload your Excel file" },
  { step: 2, title: "Map Columns", description: "Map file columns to system" },
  { step: 3, title: "Preview & Validate", description: "Review and validate data" },
  { step: 4, title: "Import", description: "Import employees" },
] as const

export const BULK_IMPORT_RECENT_DATA = [
  { file: "Employee_Import_May2026.xlsx", date: "May 15, 2026 10:30 AM by Admin", status: "Completed", result: "120 / 120 Imported" },
  { file: "New_Hires_May2026.xlsx", date: "May 10, 2026 02:15 PM by Admin", status: "Completed", result: "45 / 45 Imported" },
  { file: "Employee_Import_Apr2026.xlsx", date: "Apr 28, 2026 09:45 AM by Admin", status: "Failed", result: "23 / 150 Imported" },
  { file: "Departments_Update.xlsx", date: "Apr 20, 2026 11:20 AM by Admin", status: "Completed", result: "10 / 10 Imported" },
  { file: "Employee_Import_Apr2026_v2.xlsx", date: "Apr 18, 2026 03:05 PM by Admin", status: "Completed", result: "150 / 150 Imported" },
] as const

export const BULK_IMPORT_MAPPING_DATA = [
  ["Employee ID", "EMP-2026-001", "Employee ID", "Required"],
  ["First Name", "Maria", "First Name", "Required"],
  ["Last Name", "Santos", "Last Name", "Required"],
  ["Email Address", "maria.santos@gmail.com", "Email Address", "Required"],
  ["Mobile Number", "+63 917 123 4567", "Mobile Number", "Required"],
  ["Department", "Human Resources", "Department", "Required"],
  ["Position", "HR Specialist", "Position", "Required"],
  ["Employment Type", "Regular", "Employment Type", "Required"],
  ["Date Hired", "5/20/2026", "Date Hired", "Required"],
  ["Pay Group", "Regular", "Pay Group", "Required"],
  ["Pay Type", "Monthly", "Pay Type", "Required"],
  ["Basic Salary", "35000", "Basic Salary", "Required"],
  ["Allowances", "2000", "Allowance (Fixed)", "Optional"],
  ["Overtime Rate (%)", "125", "Overtime Rate (%)", "Optional"],
  ["Address", "1234 Rizal St., Brgy. San Antonio", "Address", "Optional"],
  ["Remarks", "-", "-- Do not import this column --", "Optional"],
] as const

export const BULK_IMPORT_EMPLOYEE_ROWS = [
  { row: 1, id: "EMP-2026-001", name: "Maria Santos", department: "Human Resources", position: "HR Specialist", status: "Valid", message: "-" },
  { row: 2, id: "EMP-2026-002", name: "Juan Dela Cruz", department: "Information Technology", position: "IT Support", status: "Valid", message: "-" },
  { row: 3, id: "EMP-2026-003", name: "Ana Reyes", department: "Finance", position: "Accountant", status: "Valid", message: "-" },
  { row: 4, id: "-", name: "Pedro Garcia", department: "Operations", position: "Supervisor", status: "Error", message: "Missing Employee ID" },
  { row: 5, id: "EMP-2026-005", name: "Liza Martinez", department: "Marketing", position: "Marketing Associate", status: "Valid", message: "-" },
  { row: 6, id: "EMP-2026-006", name: "Mark Rivera", department: "Sales", position: "Sales Executive", status: "Warning", message: "Missing mobile number" },
  { row: 7, id: "EMP-2026-007", name: "Grace Lim", department: "Finance", position: "Cashier", status: "Valid", message: "-" },
  { row: 8, id: "EMP-2026-008", name: "Jon Tan", department: "Human Resources", position: "HR Assistant", status: "Error", message: "Invalid email format" },
  { row: 9, id: "EMP-2026-009", name: "Rhea Morales", department: "Administration", position: "Admin Staff", status: "Valid", message: "-" },
  { row: 10, id: "EMP-2026-010", name: "Leo Pascual", department: "Information Technology", position: "Developer", status: "Warning", message: "Overtime rate is high" },
] as const

export const BULK_IMPORT_STATS = [
  { label: "Total Rows", value: "120", note: "Rows in the uploaded file", tone: "blue" },
  { label: "Successfully Imported", value: "114", note: "Employees added to the system", tone: "green" },
  { label: "Failed to Import", value: "4", note: "Rows with errors", tone: "red" },
  { label: "Imported with Warnings", value: "2", note: "Employees imported with warnings", tone: "amber" },
] as const

export const DEPARTMENT_KPI_DATA = [
  { title: "Total Departments", value: "18", note: "Active departments", tone: "blue", icon: "ClipboardList" },
  { title: "Total Employees", value: "256", note: "Across all departments", tone: "green", icon: "Users" },
  { title: "Department Heads", value: "18", note: "Assigned heads", tone: "violet", icon: "UserRoundCheck" },
  { title: "Avg. Employees / Dept.", value: "14.2", note: "Average per department", tone: "orange", icon: "Clock3" },
] as const

export const DEPARTMENT_LIST_DATA = [
  { id: "hr", name: "Human Resources", head: "Jane Cruz", role: "HR Manager", employees: 24, description: "Handles recruitment, employee relations, and HR operations.", status: "Active", tone: "blue" },
  { id: "it", name: "Information Technology", head: "Michael Tan", role: "IT Manager", employees: 18, description: "Manages IT infrastructure, systems, and technical support.", status: "Active", tone: "blue" },
  { id: "finance", name: "Finance", head: "Anna Reyes", role: "Finance Manager", employees: 16, description: "Oversees financial planning, budgeting, and accounting.", status: "Active", tone: "violet" },
  { id: "operations", name: "Operations", head: "Pedro Garcia", role: "Operations Manager", employees: 32, description: "Responsible for day-to-day operational activities.", status: "Active", tone: "purple" },
  { id: "marketing", name: "Marketing", head: "Liza Martinez", role: "Marketing Manager", employees: 14, description: "Handles marketing strategies, campaigns, and branding.", status: "Active", tone: "green" },
  { id: "sales", name: "Sales", head: "Mark Rivera", role: "Sales Manager", employees: 28, description: "Manages sales team and revenue generation.", status: "Active", tone: "blue" },
  { id: "administration", name: "Administration", head: "Grace Lim", role: "Admin Manager", employees: 12, description: "Handles administrative support and office management.", status: "Active", tone: "violet" },
  { id: "support", name: "Customer Support", head: "Jon Tan", role: "Support Manager", employees: 22, description: "Provides customer assistance and service support.", status: "Active", tone: "purple" },
  { id: "rnd", name: "Research & Development", head: "Rhea Morales", role: "R&D Manager", employees: 10, description: "Focuses on innovation, product development, and research.", status: "Inactive", tone: "blue" },
  { id: "procurement", name: "Procurement", head: "Leo Pascual", role: "Procurement Manager", employees: 8, description: "Manages procurement, suppliers, and vendors.", status: "Active", tone: "blue" },
] as const

export const DEPARTMENT_FORM_OPTIONS = {
  heads: ["Jane Dela Cruz", "Michael Tan", "Anna Reyes", "Pedro Garcia", "Liza Martinez", "Mark Rivera"],
  parents: ["None", "Administration", "Operations", "Finance", "Human Resources"],
  statuses: ["Active", "Inactive", "Archived"],
  types: ["Operational", "Support", "Administrative", "Strategic"],
} as const

export const POSITION_KPI_DATA = [
  { title: "Total Positions", value: "24", note: "Active job positions", tone: "blue", icon: "BriefcaseBusiness" },
  { title: "Total Employees", value: "256", note: "Across all positions", tone: "green", icon: "Users" },
  { title: "Department Coverage", value: "11", note: "Departments with positions", tone: "violet", icon: "Network" },
  { title: "Avg. Employees / Position", value: "10.7", note: "Average per position", tone: "orange", icon: "TrendingUp" },
] as const

export const POSITION_LIST_DATA = [
  { id: "ceo", title: "Chief Executive Officer (CEO)", department: "Executive Management", type: "Full-time", employees: 1, status: "Active", reportsTo: "-", grade: "Executive", code: "CEO" },
  { id: "hr-manager", title: "Human Resources Manager", department: "Human Resources", type: "Full-time", employees: 24, status: "Active", reportsTo: "Chief Executive Officer (CEO)", grade: "Manager", code: "HR-MGR" },
  { id: "it-manager", title: "IT Manager", department: "Information Technology", type: "Full-time", employees: 18, status: "Active", reportsTo: "Chief Executive Officer (CEO)", grade: "Manager", code: "IT-MGR" },
  { id: "finance-manager", title: "Finance Manager", department: "Finance", type: "Full-time", employees: 16, status: "Active", reportsTo: "Chief Executive Officer (CEO)", grade: "Manager", code: "FIN-MGR" },
  { id: "operations-manager", title: "Operations Manager", department: "Operations", type: "Full-time", employees: 32, status: "Active", reportsTo: "Chief Executive Officer (CEO)", grade: "Manager", code: "OPS-MGR" },
  { id: "marketing-manager", title: "Marketing Manager", department: "Marketing", type: "Full-time", employees: 14, status: "Active", reportsTo: "Chief Executive Officer (CEO)", grade: "Manager", code: "MKT-MGR" },
  { id: "sales-executive", title: "Sales Executive", department: "Sales", type: "Full-time", employees: 28, status: "Active", reportsTo: "Sales Manager", grade: "Staff", code: "SALES-EXE" },
  { id: "admin-assistant", title: "Administrative Assistant", department: "Administration", type: "Full-time", employees: 12, status: "Active", reportsTo: "Admin Manager", grade: "Staff", code: "ADMIN-ASST" },
  { id: "support-specialist", title: "Customer Support Specialist", department: "Customer Support", type: "Full-time", employees: 22, status: "Active", reportsTo: "Support Manager", grade: "Staff", code: "SUP-SPEC" },
  { id: "software-developer", title: "Software Developer", department: "Information Technology", type: "Full-time", employees: 15, status: "Active", reportsTo: "IT Manager", grade: "Staff", code: "DEV001" },
] as const

export const POSITION_FORM_OPTIONS = {
  departments: ["Executive Management", "Human Resources", "Information Technology", "Finance", "Operations", "Marketing", "Sales", "Administration", "Customer Support"],
  employmentTypes: ["Full-time", "Part-time", "Contract", "Internship"],
  reportsTo: ["Chief Executive Officer (CEO)", "Human Resources Manager", "IT Manager", "Finance Manager", "Operations Manager"],
  salaryGrades: ["Grade 1", "Grade 2", "Grade 3", "Grade 4", "Manager", "Executive"],
  statuses: ["Active", "Inactive", "Draft"],
} as const

export const EMPLOYMENT_STATUS_KPI_DATA = [
  { title: "Total Status", value: "10", note: "Employment statuses", tone: "blue", icon: "BriefcaseBusiness" },
  { title: "Active Status", value: "7", note: "Currently active", tone: "green", icon: "Users" },
  { title: "Inactive Status", value: "2", note: "Currently inactive", tone: "orange", icon: "PauseCircle" },
  { title: "Archived Status", value: "1", note: "Archived / not in use", tone: "violet", icon: "Archive" },
] as const

export const EMPLOYMENT_STATUS_LIST_DATA = [
  { id: "active", name: "Active", code: "ACTIVE", description: "Regular active employment", type: "Active", default: true, status: "Active", color: "green", category: "Active Workforce", icon: "BriefcaseBusiness" },
  { id: "probation", name: "Probation", code: "PROBATION", description: "Employee is under probation period", type: "Active", default: false, status: "Active", color: "blue", category: "Active Workforce", icon: "UserRoundCheck" },
  { id: "regular", name: "Regular", code: "REGULAR", description: "Regular/permanent employee", type: "Active", default: false, status: "Active", color: "blue", category: "Active Workforce", icon: "Users" },
  { id: "contractual", name: "Contractual", code: "CONTRACTUAL", description: "Hired under a contract", type: "Active", default: false, status: "Active", color: "blue", category: "Active Workforce", icon: "FileText" },
  { id: "part-time", name: "Part-time", code: "PART_TIME", description: "Part-time employment", type: "Active", default: false, status: "Active", color: "blue", category: "Active Workforce", icon: "Clock3" },
  { id: "temporary", name: "Temporary", code: "TEMPORARY", description: "Temporary employment", type: "Active", default: false, status: "Active", color: "blue", category: "Active Workforce", icon: "CalendarClock" },
  { id: "on-leave", name: "On Leave", code: "ON_LEAVE", description: "Employee is currently on leave", type: "Inactive", default: false, status: "Inactive", color: "amber", category: "Temporary Inactive", icon: "PauseCircle" },
  { id: "suspended", name: "Suspended", code: "SUSPENDED", description: "Employment is temporarily suspended", type: "Inactive", default: false, status: "Inactive", color: "amber", category: "Temporary Inactive", icon: "CircleSlash" },
  { id: "resigned", name: "Resigned", code: "RESIGNED", description: "Employee has resigned", type: "Archived", default: false, status: "Archived", color: "violet", category: "Historical", icon: "Archive" },
  { id: "terminated", name: "Terminated", code: "TERMINATED", description: "Employment has been terminated", type: "Archived", default: false, status: "Archived", color: "violet", category: "Historical", icon: "Archive" },
] as const

export const EMPLOYMENT_STATUS_FORM_OPTIONS = {
  types: ["Active", "Inactive", "Archived"],
  categories: ["Active Workforce", "Temporary Inactive", "Historical", "Custom"],
  icons: ["BriefcaseBusiness", "Users", "Clock3", "Archive", "PauseCircle"],
} as const

export const DTR_KPI_DATA = [
  { title: "Total Employees", value: "1,248", note: "View all employees", tone: "blue", icon: "Users" },
  { title: "Present Today", value: "1,103", note: "88.4% of employees", tone: "green", icon: "CalendarCheck" },
  { title: "Late Today", value: "47", note: "3.8% of employees", tone: "orange", icon: "Clock3" },
  { title: "Absent Today", value: "62", note: "5.0% of employees", tone: "red", icon: "BadgeX" },
  { title: "On Leave Today", value: "36", note: "2.9% of employees", tone: "violet", icon: "ClipboardList" },
] as const

export const DTR_TAB_DATA = [
  { label: "All", count: "1,248", value: "all" },
  { label: "Present", count: "1,103", value: "present" },
  { label: "Late", count: "47", value: "late" },
  { label: "Absent", count: "62", value: "absent" },
  { label: "On Leave", count: "36", value: "leave" },
  { label: "Work From Home", count: "12", value: "wfh" },
] as const

export const DTR_TABLE_DATA = [
  { id: "EMP-0001", name: "Juan Dela Cruz", email: "juan.delacruz@naditsolutions.com", department: "Information Technology", shift: "Day Shift", schedule: "08:00 AM - 05:00 PM", timeIn: "07:58 AM", timeOut: "05:02 PM", hours: "9h 04m", status: "Present", location: "Office", tone: "blue", initials: "JC" },
  { id: "EMP-0002", name: "Maria Santos", email: "maria.santos@naditsolutions.com", department: "Human Resources", shift: "Day Shift", schedule: "08:00 AM - 05:00 PM", timeIn: "08:14 AM", timeOut: "-", hours: "-", status: "Late (14m)", location: "Office", tone: "pink", initials: "MS" },
  { id: "EMP-0003", name: "Carlos Reyes", email: "carlos.reyes@naditsolutions.com", department: "Finance", shift: "Day Shift", schedule: "08:00 AM - 05:00 PM", timeIn: "08:01 AM", timeOut: "05:01 PM", hours: "9h 00m", status: "Present", location: "Office", tone: "slate", initials: "CR" },
  { id: "EMP-0004", name: "Anna Garcia", email: "anna.garcia@naditsolutions.com", department: "Operations", shift: "Day Shift", schedule: "08:00 AM - 05:00 PM", timeIn: "-", timeOut: "-", hours: "-", status: "Absent", location: "-", tone: "pink", initials: "AG" },
  { id: "EMP-0005", name: "Michael Tan", email: "michael.tan@naditsolutions.com", department: "Information Technology", shift: "Night Shift", schedule: "09:00 PM - 06:00 AM", timeIn: "08:58 PM", timeOut: "-", hours: "-", status: "Present", location: "Office", tone: "slate", initials: "MT" },
  { id: "EMP-0006", name: "Jane Lim", email: "jane.lim@naditsolutions.com", department: "Sales", shift: "Day Shift", schedule: "08:00 AM - 05:00 PM", timeIn: "08:20 AM", timeOut: "-", hours: "-", status: "Late (20m)", location: "Office", tone: "pink", initials: "JL" },
  { id: "EMP-0007", name: "Robert Navarro", email: "robert.navarro@naditsolutions.com", department: "Finance", shift: "Day Shift", schedule: "08:00 AM - 05:00 PM", timeIn: "07:55 AM", timeOut: "05:05 PM", hours: "9h 10m", status: "Present", location: "Office", tone: "slate", initials: "RN" },
  { id: "EMP-0008", name: "Patricia Cruz", email: "patricia.cruz@naditsolutions.com", department: "Human Resources", shift: "Day Shift", schedule: "08:00 AM - 05:00 PM", timeIn: "-", timeOut: "-", hours: "-", status: "On Leave", location: "-", tone: "pink", initials: "PC" },
  { id: "EMP-0009", name: "Brian Villanueva", email: "brian.villanueva@naditsolutions.com", department: "Operations", shift: "Night Shift", schedule: "09:00 PM - 06:00 AM", timeIn: "09:05 PM", timeOut: "06:01 AM", hours: "8h 56m", status: "Present", location: "Office", tone: "slate", initials: "BV" },
  { id: "EMP-0010", name: "Kevin Mendoza", email: "kevin.mendoza@naditsolutions.com", department: "Sales", shift: "Day Shift", schedule: "08:00 AM - 05:00 PM", timeIn: "-", timeOut: "-", hours: "-", status: "Work From Home", location: "Home", tone: "slate", initials: "KM" },
] as const

export const DTR_DETAIL_EMPLOYEE_DATA = {
  name: "Juan Dela Cruz",
  employeeId: "EMP-0001",
  department: "Information Technology",
  position: "Software Developer",
  status: "Active",
  date: "May 15, 2026",
  workSchedule: "08:00 AM - 05:00 PM",
  shift: "Day Shift",
  minHours: "8h 00m",
  totalHours: "9h 04m",
  dtrStatus: "Present",
  initials: "JC",
} as const

export const DTR_DETAIL_METRIC_DATA = [
  { label: "Time In", value: "07:58 AM", note: "Actual", tone: "green", icon: "LogIn" },
  { label: "Time Out", value: "05:02 PM", note: "Actual", tone: "red", icon: "LogOut" },
  { label: "Break Time", value: "00h 45m", note: "Total", tone: "blue", icon: "Coffee" },
  { label: "Overtime", value: "01h 04m", note: "Total", tone: "violet", icon: "ClockPlus" },
  { label: "Undertime", value: "00h 00m", note: "Total", tone: "orange", icon: "AlarmClockMinus" },
  { label: "Late", value: "00h 00m", note: "Total", tone: "amber", icon: "Clock3" },
] as const

export const DTR_DETAIL_TIME_RECORD_DATA = [
  { no: 1, type: "Time In", time: "07:58 AM", source: "Biometric Device", location: "Office", note: "-", photo: "JC", status: "Valid" },
  { no: 2, type: "Break Out", time: "12:01 PM", source: "Biometric Device", location: "Office", note: "Lunch Break", photo: "JC", status: "Valid" },
  { no: 3, type: "Break In", time: "12:46 PM", source: "Biometric Device", location: "Office", note: "Lunch Break", photo: "JC", status: "Valid" },
  { no: 4, type: "Time Out", time: "05:02 PM", source: "Biometric Device", location: "Office", note: "-", photo: "JC", status: "Valid" },
] as const

export const DTR_DETAIL_SUMMARY_DATA = [
  ["Total Work Hours", "9h 04m"],
  ["Regular Hours", "8h 00m"],
  ["Overtime Hours", "1h 04m"],
  ["Undertime Hours", "0h 00m"],
  ["Break Duration", "0h 45m"],
  ["Late Duration", "0h 00m"],
  ["DTR Status", "Present"],
  ["Approved By", "-"],
] as const

export const ATTENDANCE_CORRECTION_KPI_DATA = [
  { title: "Pending Requests", value: "24", note: "Awaiting review", tone: "amber", icon: "ClipboardList" },
  { title: "Approved", value: "56", note: "This month", tone: "green", icon: "CheckCircle2" },
  { title: "Rejected", value: "8", note: "This month", tone: "red", icon: "XCircle" },
  { title: "Cancelled", value: "3", note: "This month", tone: "slate", icon: "CircleSlash" },
  { title: "Avg. Processing Time", value: "1.8 days", note: "This month", tone: "blue", icon: "Clock3" },
] as const

export const ATTENDANCE_CORRECTION_TABLE_DATA = [
  { requestId: "COR-2026-00024", employee: "Juan Dela Cruz", employeeId: "EMP-0001", department: "Information Technology", date: "May 15, 2026 Fri", type: "Time In", requestedTime: "07:58 AM -> 08:30 AM", status: "Pending", requestedOn: "May 15, 2026 09:15 AM", tone: "amber", initials: "JC", reason: "Traffic was heavy due to road construction.", attachment: "traffic-screenshot.jpg" },
  { requestId: "COR-2026-00023", employee: "Maria Santos", employeeId: "EMP-0002", department: "Human Resources", date: "May 15, 2026 Fri", type: "Time Out", requestedTime: "05:01 PM -> 06:00 PM", status: "Approved", requestedOn: "May 15, 2026 08:50 AM", tone: "green", initials: "MS", reason: "Forgot to clock out after overtime.", attachment: "-" },
  { requestId: "COR-2026-00022", employee: "Carlos Reyes", employeeId: "EMP-0003", department: "Finance", date: "May 14, 2026 Thu", type: "Break Out", requestedTime: "12:00 PM -> 12:30 PM", status: "Rejected", requestedOn: "May 14, 2026 01:20 PM", tone: "red", initials: "CR", reason: "Incorrect break punch.", attachment: "-" },
  { requestId: "COR-2026-00021", employee: "Anna Garcia", employeeId: "EMP-0004", department: "Operations", date: "May 14, 2026 Thu", type: "Break In", requestedTime: "01:00 PM -> 01:15 PM", status: "Approved", requestedOn: "May 14, 2026 11:05 AM", tone: "green", initials: "AG", reason: "Break ended late due meeting.", attachment: "-" },
  { requestId: "COR-2026-00020", employee: "Michael Tan", employeeId: "EMP-0005", department: "Information Technology", date: "May 14, 2026 Thu", type: "Time In", requestedTime: "09:05 AM -> 09:30 AM", status: "Cancelled", requestedOn: "May 14, 2026 09:45 AM", tone: "slate", initials: "MT", reason: "Request cancelled by employee.", attachment: "-" },
  { requestId: "COR-2026-00019", employee: "Jasmine Lee", employeeId: "EMP-0006", department: "Marketing", date: "May 13, 2026 Wed", type: "Time Out", requestedTime: "06:00 PM -> 06:30 PM", status: "Pending", requestedOn: "May 13, 2026 05:10 PM", tone: "amber", initials: "JL", reason: "Client call extension.", attachment: "-" },
  { requestId: "COR-2026-00018", employee: "Robert Lim", employeeId: "EMP-0007", department: "Customer Support", date: "May 13, 2026 Wed", type: "Time In", requestedTime: "08:14 AM -> 08:30 AM", status: "Approved", requestedOn: "May 13, 2026 08:40 AM", tone: "green", initials: "RL", reason: "Biometric device delay.", attachment: "-" },
  { requestId: "COR-2026-00017", employee: "Kelly Uson", employeeId: "EMP-0008", department: "Finance", date: "May 12, 2026 Tue", type: "Break Out", requestedTime: "12:05 PM -> 12:35 PM", status: "Pending", requestedOn: "May 12, 2026 01:00 PM", tone: "amber", initials: "KU", reason: "Lunch meeting.", attachment: "-" },
  { requestId: "COR-2026-00016", employee: "Victor Nardo", employeeId: "EMP-0009", department: "Logistics", date: "May 12, 2026 Tue", type: "Break In", requestedTime: "01:05 PM -> 01:20 PM", status: "Approved", requestedOn: "May 12, 2026 12:40 PM", tone: "green", initials: "VN", reason: "Field assignment.", attachment: "-" },
  { requestId: "COR-2026-00015", employee: "Patrick Dixon", employeeId: "EMP-0010", department: "Warehouse", date: "May 12, 2026 Tue", type: "Time Out", requestedTime: "05:10 PM -> 05:45 PM", status: "Rejected", requestedOn: "May 12, 2026 06:20 PM", tone: "red", initials: "PD", reason: "No proof attached.", attachment: "-" },
] as const

export const OVERTIME_REQUEST_KPI_DATA = [
  { title: "Pending Requests", value: "18", note: "Awaiting approval", tone: "amber", icon: "Clock3" },
  { title: "Approved (This Month)", value: "32", note: "87.0 hrs", tone: "green", icon: "CheckCircle2" },
  { title: "Rejected (This Month)", value: "6", note: "12.5 hrs", tone: "red", icon: "XCircle" },
  { title: "Total Overtime (This Month)", value: "99.5 hrs", note: "Across 32 employees", tone: "violet", icon: "Timer" },
  { title: "Average / Employee", value: "3.1 hrs", note: "This month", tone: "blue", icon: "CalendarCheck" },
] as const

export const OVERTIME_REQUEST_TABLE_DATA = [
  { requestId: "OTR-2026-00034", employee: "Juan Dela Cruz", employeeId: "EMP-0001", department: "Information Technology", date: "May 14, 2026 Thu", time: "06:00 PM - 10:00 PM", hours: "4.00 hrs", type: "Work Overtime", status: "Pending", requestedOn: "May 14, 2026 11:20 AM", initials: "JC" },
  { requestId: "OTR-2026-00033", employee: "Maria Santos", employeeId: "EMP-0002", department: "Human Resources", date: "May 12, 2026 Tue", time: "05:30 PM - 08:30 PM", hours: "3.00 hrs", type: "Work Overtime", status: "Approved", requestedOn: "May 12, 2026 10:15 AM", initials: "MS" },
  { requestId: "OTR-2026-00032", employee: "Carlos Reyes", employeeId: "EMP-0003", department: "Finance", date: "May 13, 2026 Wed", time: "06:00 PM - 11:00 PM", hours: "5.00 hrs", type: "Work Overtime", status: "Approved", requestedOn: "May 13, 2026 02:45 PM", initials: "CR" },
  { requestId: "OTR-2026-00031", employee: "Anna Garcia", employeeId: "EMP-0004", department: "Operations", date: "May 15, 2026 Fri", time: "07:00 PM - 10:00 PM", hours: "3.00 hrs", type: "Rest Day OT", status: "Pending", requestedOn: "May 15, 2026 09:10 AM", initials: "AG" },
  { requestId: "OTR-2026-00030", employee: "Michael Tan", employeeId: "EMP-0005", department: "Information Technology", date: "May 10, 2026 Sun", time: "09:00 AM - 05:00 PM", hours: "8.00 hrs", type: "Rest Day OT", status: "Approved", requestedOn: "May 10, 2026 07:55 AM", initials: "MT" },
  { requestId: "OTR-2026-00029", employee: "Jasmine Lee", employeeId: "EMP-0006", department: "Marketing", date: "May 9, 2026 Sat", time: "10:00 AM - 02:00 PM", hours: "4.00 hrs", type: "Special Project", status: "Rejected", requestedOn: "May 9, 2026 03:25 PM", initials: "JL" },
  { requestId: "OTR-2026-00028", employee: "Robert Lim", employeeId: "EMP-0007", department: "Customer Support", date: "May 11, 2026 Mon", time: "06:30 PM - 09:30 PM", hours: "3.00 hrs", type: "Work Overtime", status: "Approved", requestedOn: "May 11, 2026 01:05 PM", initials: "RL" },
  { requestId: "OTR-2026-00027", employee: "Kelly Uson", employeeId: "EMP-0008", department: "Finance", date: "May 15, 2026 Fri", time: "06:00 PM - 09:00 PM", hours: "3.00 hrs", type: "Work Overtime", status: "Pending", requestedOn: "May 15, 2026 10:40 AM", initials: "KU" },
  { requestId: "OTR-2026-00026", employee: "Victor Nardo", employeeId: "EMP-0009", department: "Logistics", date: "May 8, 2026 Fri", time: "07:00 PM - 12:00 AM", hours: "5.00 hrs", type: "Special Project", status: "Approved", requestedOn: "May 8, 2026 11:30 AM", initials: "VN" },
  { requestId: "OTR-2026-00025", employee: "Patrick Dixon", employeeId: "EMP-0010", department: "Warehouse", date: "May 7, 2026 Thu", time: "06:00 PM - 09:00 PM", hours: "3.00 hrs", type: "Work Overtime", status: "Rejected", requestedOn: "May 7, 2026 05:12 PM", initials: "PD" },
] as const

export const OVERTIME_STATUS_SUMMARY_DATA = [
  { name: "Pending", value: 18, note: "28.1%", fill: "#f59e0b" },
  { name: "Approved", value: 32, note: "50.0%", fill: "#22c55e" },
  { name: "Rejected", value: 6, note: "9.4%", fill: "#ef4444" },
  { name: "Cancelled", value: 8, note: "12.5%", fill: "#94a3b8" },
] as const

export const OVERTIME_TYPE_BREAKDOWN_DATA = [
  { name: "Work Overtime", value: "38", note: "59.4%", tone: "blue" },
  { name: "Rest Day OT", value: "12", note: "18.8%", tone: "violet" },
  { name: "Special Project", value: "10", note: "15.6%", tone: "amber" },
  { name: "Other", value: "4", note: "6.2%", tone: "slate" },
] as const

export const TARDINESS_UNDERTIME_KPI_DATA = [
  { title: "Total Violations", value: "174", note: "This month", tone: "amber", icon: "Clock3" },
  { title: "Tardy (Late)", value: "128", note: "73.6% of total", tone: "red", icon: "TimerReset" },
  { title: "Undertime (Early Out)", value: "36", note: "20.7% of total", tone: "blue", icon: "ClockArrowDown" },
  { title: "Insufficient Hours", value: "10", note: "5.7% of total", tone: "violet", icon: "UsersRound" },
  { title: "Avg. Late (This Month)", value: "18m", note: "Per occurrence", tone: "green", icon: "CalendarCheck" },
] as const

export const TARDINESS_UNDERTIME_TABLE_DATA = [
  { employee: "Juan Dela Cruz", employeeId: "EMP-0001", department: "Information Technology", type: "Tardy (Late)", date: "May 15, 2026 Fri", time: "08:18 AM", duration: "18m late", status: "Unreviewed", initials: "JC" },
  { employee: "Maria Santos", employeeId: "EMP-0002", department: "Human Resources", type: "Undertime (Early Out)", date: "May 15, 2026 Fri", time: "05:12 PM", duration: "48m undertime", status: "Reviewed", initials: "MS" },
  { employee: "Carlos Reyes", employeeId: "EMP-0003", department: "Finance", type: "Tardy (Late)", date: "May 15, 2026 Fri", time: "08:22 AM", duration: "22m late", status: "Unreviewed", initials: "CR" },
  { employee: "Anna Garcia", employeeId: "EMP-0004", department: "Operations", type: "Undertime (Early Out)", date: "May 14, 2026 Thu", time: "04:45 PM", duration: "1h 15m undertime", status: "Reviewed", initials: "AG" },
  { employee: "Michael Tan", employeeId: "EMP-0005", department: "Information Technology", type: "Insufficient Hours", date: "May 14, 2026 Thu", time: "09:05 AM - 03:20 PM", duration: "1h 35m shortage", status: "Unreviewed", initials: "MT" },
  { employee: "Jasmine Lee", employeeId: "EMP-0006", department: "Marketing", type: "Tardy (Late)", date: "May 14, 2026 Thu", time: "08:10 AM", duration: "10m late", status: "Reviewed", initials: "JL" },
  { employee: "Robert Lim", employeeId: "EMP-0007", department: "Customer Support", type: "Undertime (Early Out)", date: "May 14, 2026 Thu", time: "04:55 PM", duration: "1h 05m undertime", status: "Reviewed", initials: "RL" },
  { employee: "Kelly Uson", employeeId: "EMP-0008", department: "Finance", type: "Tardy (Late)", date: "May 13, 2026 Wed", time: "08:25 AM", duration: "25m late", status: "Unreviewed", initials: "KU" },
  { employee: "Victor Nardo", employeeId: "EMP-0009", department: "Logistics", type: "Insufficient Hours", date: "May 13, 2026 Wed", time: "09:00 AM - 05:10 PM", duration: "50m shortage", status: "Reviewed", initials: "VN" },
  { employee: "Patrick Dixon", employeeId: "EMP-0010", department: "Warehouse", type: "Undertime (Early Out)", date: "May 13, 2026 Wed", time: "05:00 PM", duration: "1h 00m undertime", status: "Reviewed", initials: "PD" },
] as const

export const TARDINESS_VIOLATION_SUMMARY_DATA = [
  { name: "Tardy (Late)", value: 128, note: "73.6%", fill: "#ef233c" },
  { name: "Undertime (Early Out)", value: 36, note: "20.7%", fill: "#2563eb" },
  { name: "Insufficient Hours", value: 10, note: "5.7%", fill: "#7c3aed" },
] as const

export const TARDINESS_DEPARTMENT_BREAKDOWN_DATA = [
  { name: "Information Technology", value: 38, note: "21.8%", fill: "#ef233c" },
  { name: "Operations", value: 32, note: "18.4%", fill: "#2563eb" },
  { name: "Finance", value: 28, note: "16.1%", fill: "#22c55e" },
  { name: "Human Resources", value: 26, note: "14.9%", fill: "#7c3aed" },
  { name: "Others", value: 50, note: "28.8%", fill: "#64748b" },
] as const

export const LEAVE_KPI_DATA = [
  { title: "Total Employees", value: "1,248", note: "Active employees", tone: "blue", icon: "Users" },
  { title: "On Leave Today", value: "36", note: "2.88% of total", tone: "violet", icon: "CalendarDays" },
  { title: "On Leave This Month", value: "112", note: "8.97% of total", tone: "orange", icon: "Palmtree" },
  { title: "Pending Requests", value: "24", note: "Requires approval", tone: "amber", icon: "Clock3" },
] as const

export const LEAVE_TYPE_SUMMARY_DATA = [
  { name: "Vacation Leave", value: 52, note: "46.43%", fill: "#22c55e" },
  { name: "Sick Leave", value: 28, note: "25.00%", fill: "#2563eb" },
  { name: "Emergency Leave", value: 12, note: "10.71%", fill: "#7c3aed" },
  { name: "Maternity Leave", value: 8, note: "7.14%", fill: "#f59e0b" },
  { name: "Paternity Leave", value: 6, note: "5.36%", fill: "#14b8a6" },
  { name: "Others", value: 6, note: "5.36%", fill: "#94a3b8" },
] as const

export const LEAVE_CALENDAR_DATA = [
  { day: "26", muted: true, dots: [] },
  { day: "27", muted: true, dots: [] },
  { day: "28", muted: true, dots: [] },
  { day: "29", muted: true, dots: [] },
  { day: "30", muted: true, dots: [] },
  { day: "1", dots: ["#f59e0b"] },
  { day: "2", dots: [] },
  { day: "3", dots: [] },
  { day: "4", dots: ["#2563eb", "#2563eb"] },
  { day: "5", dots: ["#22c55e", "#14b8a6"] },
  { day: "6", dots: ["#14b8a6"] },
  { day: "7", dots: ["#2563eb"] },
  { day: "8", dots: ["#64748b"] },
  { day: "9", dots: [] },
  { day: "10", dots: [] },
  { day: "11", dots: ["#38bdf8"] },
  { day: "12", dots: ["#2563eb", "#7c3aed"] },
  { day: "13", dots: ["#7c3aed"] },
  { day: "14", dots: ["#0ea5e9"] },
  { day: "15", today: true, dots: ["#22c55e", "#22c55e", "#2563eb", "#f59e0b"] },
  { day: "16", dots: [] },
  { day: "17", dots: [] },
  { day: "18", dots: [] },
  { day: "19", dots: [] },
  { day: "20", dots: ["#22c55e"] },
  { day: "21", dots: ["#2563eb", "#2563eb"] },
  { day: "22", dots: ["#f59e0b"] },
  { day: "23", dots: [] },
  { day: "24", dots: [] },
  { day: "25", dots: ["#22c55e", "#22c55e"] },
  { day: "26", dots: ["#2563eb", "#2563eb"] },
  { day: "27", dots: [] },
  { day: "28", dots: ["#64748b"] },
  { day: "29", dots: [] },
  { day: "30", dots: [] },
  { day: "31", dots: [] },
  { day: "1", muted: true, dots: [] },
  { day: "2", muted: true, dots: [] },
  { day: "3", muted: true, dots: [] },
  { day: "4", muted: true, dots: [] },
  { day: "5", muted: true, dots: [] },
  { day: "6", muted: true, dots: [] },
] as const

export const UPCOMING_LEAVE_DATA = [
  { name: "Maria Santos", type: "Vacation Leave", range: "May 18 - May 19, 2026", days: "2 days", initials: "MS" },
  { name: "Juan Dela Cruz", type: "Vacation Leave", range: "May 20 - May 22, 2026", days: "3 days", initials: "JC" },
  { name: "Anna Garcia", type: "Emergency Leave", range: "May 21, 2026", days: "1 day", initials: "AG" },
  { name: "Robert Navarro", type: "Sick Leave", range: "May 22, 2026", days: "1 day", initials: "RN" },
  { name: "Jane Lim", type: "Vacation Leave", range: "May 25 - May 27, 2026", days: "3 days", initials: "JL" },
] as const

export const LEAVE_BALANCE_SUMMARY_DATA = [
  { type: "Vacation Leave", entitlement: "15 days", used: "5 days", balance: "10 days", fill: "#22c55e" },
  { type: "Sick Leave", entitlement: "15 days", used: "2 days", balance: "13 days", fill: "#2563eb" },
  { type: "Emergency Leave", entitlement: "7 days", used: "1 day", balance: "6 days", fill: "#7c3aed" },
  { type: "Maternity Leave", entitlement: "105 days", used: "0 days", balance: "105 days", fill: "#f59e0b" },
  { type: "Paternity Leave", entitlement: "7 days", used: "0 days", balance: "7 days", fill: "#14b8a6" },
] as const

export const LEAVE_TREND_DATA = [
  { month: "Dec 2025", leaves: 32 },
  { month: "Jan 2026", leaves: 55 },
  { month: "Feb 2026", leaves: 53 },
  { month: "Mar 2026", leaves: 86 },
  { month: "Apr 2026", leaves: 55 },
  { month: "May 2026", leaves: 64 },
] as const

export const LEAVE_APPROVAL_STATUS_DATA = [
  { name: "Approved", value: 58, note: "63.74%", fill: "#22c55e" },
  { name: "Pending", value: 24, note: "26.37%", fill: "#f59e0b" },
  { name: "Rejected", value: 9, note: "9.89%", fill: "#ef4444" },
] as const

export const LEAVE_REQUEST_KPI_DATA = [
  { title: "Total Requests", value: "128", note: "All time", tone: "blue", icon: "ClipboardList" },
  { title: "Pending Approval", value: "24", note: "This requires your action", tone: "green", icon: "Clock3" },
  { title: "Approved", value: "89", note: "This year", tone: "orange", icon: "CheckCircle2" },
  { title: "Rejected", value: "15", note: "This year", tone: "red", icon: "XCircle" },
  { title: "On Leave Today", value: "36", note: "Employees", tone: "violet", icon: "CalendarDays" },
] as const

export const LEAVE_REQUEST_TAB_DATA = [
  { label: "All Requests", value: "all" },
  { label: "Pending Approval", value: "pending", count: "24" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
  { label: "Cancelled", value: "cancelled" },
] as const

export const LEAVE_REQUEST_TABLE_DATA = [
  { requestId: "LR-2026-0128", employee: "Juan Dela Cruz", position: "Software Developer", department: "Information Technology", type: "Vacation Leave", dates: "May 20 - May 22, 2026", dateNote: "3 days", duration: "3 days", reason: "Family vacation", status: "Pending", requestedOn: "May 15, 2026 09:15 AM", initials: "JC", fill: "#22c55e" },
  { requestId: "LR-2026-0127", employee: "Maria Santos", position: "HR Specialist", department: "Human Resources", type: "Vacation Leave", dates: "May 18 - May 19, 2026", dateNote: "2 days", duration: "2 days", reason: "Personal travel", status: "Pending", requestedOn: "May 14, 2026 04:30 PM", initials: "MS", fill: "#22c55e" },
  { requestId: "LR-2026-0126", employee: "Carlos Reyes", position: "Accountant", department: "Finance", type: "Sick Leave", dates: "May 15, 2026", dateNote: "1 day", duration: "1 day", reason: "Fever and rest", status: "Approved", requestedOn: "May 15, 2026 08:45 AM", initials: "CR", fill: "#2563eb" },
  { requestId: "LR-2026-0125", employee: "Anna Garcia", position: "Marketing Associate", department: "Marketing", type: "Emergency Leave", dates: "May 14, 2026", dateNote: "1 day", duration: "1 day", reason: "Family emergency", status: "Approved", requestedOn: "May 14, 2026 11:20 AM", initials: "AG", fill: "#7c3aed" },
  { requestId: "LR-2026-0124", employee: "Michael Tan", position: "System Analyst", department: "Information Technology", type: "Maternity Leave", dates: "May 1 - Aug 1, 2026", dateNote: "93 days", duration: "93 days", reason: "Maternity leave", status: "Approved", requestedOn: "Apr 20, 2026 02:10 PM", initials: "MT", fill: "#f59e0b" },
  { requestId: "LR-2026-0123", employee: "Jane Lim", position: "Executive Assistant", department: "Administration", type: "Vacation Leave", dates: "May 10 - May 12, 2026", dateNote: "3 days", duration: "3 days", reason: "Out of town", status: "Rejected", requestedOn: "May 10, 2026 09:05 AM", initials: "JL", fill: "#22c55e" },
  { requestId: "LR-2026-0122", employee: "Robert Navarro", position: "Operations Supervisor", department: "Operations", type: "Sick Leave", dates: "May 9, 2026", dateNote: "1 day", duration: "1 day", reason: "Medical check-up", status: "Rejected", requestedOn: "May 9, 2026 07:50 AM", initials: "RN", fill: "#2563eb" },
  { requestId: "LR-2026-0121", employee: "Patricia Cruz", position: "Sales Representative", department: "Sales", type: "Vacation Leave", dates: "Jun 2 - Jun 5, 2026", dateNote: "4 days", duration: "4 days", reason: "Vacation", status: "Pending", requestedOn: "May 8, 2026 03:40 PM", initials: "PC", fill: "#22c55e" },
] as const

export const ATTENDANCE_REPORT_KPI_DATA = [
  { title: "Total Employees", value: "248", note: "Active employees", tone: "blue", icon: "Users" },
  { title: "Average Attendance", value: "92.6%", note: "This month", change: "4.3% vs last month", trend: "up", tone: "green", icon: "CalendarCheck" },
  { title: "Total Work Hours", value: "5,324h 18m", note: "This month", change: "8.7% vs last month", trend: "up", tone: "orange", icon: "Clock3" },
  { title: "Late (Tardy)", value: "128", note: "This month", change: "14.1% vs last month", trend: "down", tone: "red", icon: "AlarmClock" },
  { title: "Undertime", value: "36", note: "This month", change: "8.2% vs last month", trend: "up", tone: "violet", icon: "TimerOff" },
] as const

export const ATTENDANCE_OVERVIEW_TREND_DATA = [
  { day: "May 1", present: 87, late: 18, undertime: 11, absent: 8 },
  { day: "May 3", present: 83, late: 21, undertime: 13, absent: 10 },
  { day: "May 5", present: 85, late: 17, undertime: 12, absent: 9 },
  { day: "May 7", present: 84, late: 16, undertime: 11, absent: 8 },
  { day: "May 9", present: 88, late: 19, undertime: 13, absent: 10 },
  { day: "May 11", present: 85, late: 17, undertime: 12, absent: 9 },
  { day: "May 13", present: 87, late: 18, undertime: 12, absent: 9 },
  { day: "May 15", present: 90, late: 17, undertime: 11, absent: 8 },
  { day: "May 17", present: 86, late: 21, undertime: 14, absent: 11 },
  { day: "May 19", present: 82, late: 18, undertime: 12, absent: 9 },
  { day: "May 21", present: 81, late: 17, undertime: 11, absent: 8 },
  { day: "May 23", present: 85, late: 18, undertime: 13, absent: 10 },
  { day: "May 25", present: 88, late: 18, undertime: 12, absent: 9 },
  { day: "May 27", present: 86, late: 19, undertime: 13, absent: 10 },
  { day: "May 29", present: 89, late: 17, undertime: 12, absent: 8 },
] as const

export const ATTENDANCE_DEPARTMENT_SUMMARY_DATA = [
  { department: "Information Technology", code: "IT", employees: 38, present: "95.4%", late: "3.2%", undertime: "1.0%", absent: "0.4%", totalHours: "1,024h 30m", avgHours: "26h 57m", fill: "#6d28d9" },
  { department: "Human Resources", code: "HR", employees: 32, present: "93.1%", late: "4.1%", undertime: "1.4%", absent: "1.4%", totalHours: "782h 10m", avgHours: "24h 26m", fill: "#f97316" },
  { department: "Finance", code: "FN", employees: 28, present: "90.3%", late: "5.7%", undertime: "2.2%", absent: "1.8%", totalHours: "693h 45m", avgHours: "24h 46m", fill: "#2563eb" },
  { department: "Operations", code: "OP", employees: 45, present: "89.2%", late: "6.3%", undertime: "2.8%", absent: "1.7%", totalHours: "1,056h 15m", avgHours: "23h 28m", fill: "#7c3aed" },
  { department: "Others", code: "OT", employees: 105, present: "91.0%", late: "4.8%", undertime: "1.9%", absent: "2.3%", totalHours: "1,767h 38m", avgHours: "24h 14m", fill: "#64748b" },
] as const

export const ATTENDANCE_DEPARTMENT_DONUT_DATA = [
  { name: "Information Technology", value: 95.4, fill: "#22c55e" },
  { name: "Human Resources", value: 93.1, fill: "#f59e0b" },
  { name: "Finance", value: 90.3, fill: "#2563eb" },
  { name: "Operations", value: 89.2, fill: "#7c3aed" },
  { name: "Others", value: 91.0, fill: "#94a3b8" },
] as const

export const ATTENDANCE_REPORT_TEMPLATE_DATA = [
  { title: "Daily Attendance Report", note: "Detailed daily attendance records" },
  { title: "Monthly Summary Report", note: "Monthly attendance summary" },
  { title: "Tardiness Report", note: "Employee tardiness report" },
  { title: "Undertime Report", note: "Employee undertime report" },
  { title: "Overtime Report", note: "Overtime hours and summary" },
] as const

export const RECENT_ATTENDANCE_REPORT_DATA = [
  { title: "Monthly Summary - May 2026", generated: "Generated on May 15, 2026 10:30 AM", type: "PDF" },
  { title: "Tardiness Report - May 2026", generated: "Generated on May 15, 2026 09:15 AM", type: "XLSX" },
  { title: "Daily Attendance - May 15, 2026", generated: "Generated on May 15, 2026 08:45 AM", type: "PDF" },
] as const

export const LEAVE_TYPE_KPI_DATA = [
  { title: "Total Leave Types", value: "6", note: "Types configured", tone: "blue", icon: "ClipboardList" },
  { title: "Active Types", value: "6", note: "100% active", tone: "green", icon: "BriefcaseBusiness" },
  { title: "Default Types", value: "3", note: "System defaults", tone: "violet", icon: "BadgeCheck" },
  { title: "Custom Types", value: "3", note: "Organization specific", tone: "orange", icon: "Settings" },
  { title: "Inactive Types", value: "0", note: "Currently inactive", tone: "slate", icon: "Archive" },
] as const

export const LEAVE_TYPE_LIST_DATA = [
  { id: "vacation-leave", name: "Vacation Leave", code: "VL", description: "For rest and personal time off", category: "Paid", creditBasis: "Monthly", creditNote: "Earned monthly", defaultCredits: "1.25 days", maxCarryForward: "15 days", encashable: "Yes", status: "Active", icon: "Plane", tone: "green", defaultType: true },
  { id: "sick-leave", name: "Sick Leave", code: "SL", description: "For illness and medical appointments", category: "Paid", creditBasis: "Monthly", creditNote: "Earned monthly", defaultCredits: "1.25 days", maxCarryForward: "15 days", encashable: "Yes", status: "Active", icon: "HeartPulse", tone: "violet", defaultType: true },
  { id: "emergency-leave", name: "Emergency Leave", code: "EL", description: "For urgent personal matters or emergencies", category: "Paid", creditBasis: "Annual", creditNote: "Credited yearly", defaultCredits: "7 days", maxCarryForward: "7 days", encashable: "No", status: "Active", icon: "Siren", tone: "red", defaultType: true },
  { id: "maternity-leave", name: "Maternity Leave", code: "ML", description: "For childbirth and recovery", category: "Paid", creditBasis: "Fixed", creditNote: "One-time entitlement", defaultCredits: "105 days", maxCarryForward: "0 days", encashable: "No", status: "Active", icon: "Baby", tone: "orange", defaultType: false },
  { id: "paternity-leave", name: "Paternity Leave", code: "PL", description: "For father's leave after childbirth", category: "Paid", creditBasis: "Fixed", creditNote: "One-time entitlement", defaultCredits: "7 days", maxCarryForward: "0 days", encashable: "No", status: "Active", icon: "UsersRound", tone: "cyan", defaultType: false },
  { id: "special-privilege-leave", name: "Special Privilege Leave", code: "SPL", description: "For special occasions and personal needs", category: "Paid", creditBasis: "Annual", creditNote: "Credited yearly", defaultCredits: "5 days", maxCarryForward: "5 days", encashable: "Yes", status: "Active", icon: "Sparkles", tone: "amber", defaultType: false },
] as const

export const LEAVE_TYPE_CATEGORY_DATA = [
  { name: "Paid Leave", value: 6, note: "100%", fill: "#22c55e" },
  { name: "Unpaid Leave", value: 0, note: "0%", fill: "#f59e0b" },
  { name: "Statutory Leave", value: 0, note: "0%", fill: "#7c3aed" },
  { name: "Special Leave", value: 0, note: "0%", fill: "#06b6d4" },
] as const

export const LEAVE_TYPE_FORM_OPTIONS = {
  categories: ["Paid", "Unpaid", "Statutory", "Special"],
  statuses: ["Active", "Inactive"],
  creditBases: ["Monthly", "Annual", "Fixed (One-time)"],
} as const

export const LEAVE_BALANCE_KPI_DATA = [
  { title: "Total Employees", value: "1,248", note: "Active employees", tone: "blue", icon: "Users" },
  { title: "Total Leave Credits", value: "7,856 days", note: "Total allocation", tone: "violet", icon: "CalendarDays" },
  { title: "Used Leave", value: "2,145 days", note: "27.3% of total credits", tone: "slate", icon: "UsersRound" },
  { title: "Remaining Balance", value: "5,711 days", note: "72.7% of total credits", tone: "green", icon: "BadgeCheck" },
  { title: "Expiring Soon (30 days)", value: "84 days", note: "Across 12 employees", tone: "orange", icon: "Hourglass" },
] as const

export const LEAVE_BALANCE_EMPLOYEE_DATA = [
  {
    employee: "Juan Dela Cruz",
    employeeId: "EMP-0001",
    department: "Information Technology",
    initials: "JC",
    balances: [
      { leaveType: "Vacation Leave", entitlement: 15, used: 5, pending: 1, balance: 9, status: "Good", fill: "#22c55e" },
      { leaveType: "Sick Leave", entitlement: 15, used: 2, pending: 0, balance: 13, status: "Good", fill: "#2563eb" },
      { leaveType: "Emergency Leave", entitlement: 7, used: 1, pending: 0, balance: 6, status: "Good", fill: "#ef4444" },
    ],
  },
  {
    employee: "Maria Santos",
    employeeId: "EMP-0002",
    department: "Human Resources",
    initials: "MS",
    balances: [
      { leaveType: "Vacation Leave", entitlement: 15, used: 10, pending: 0, balance: 5, status: "Low", fill: "#22c55e" },
      { leaveType: "Sick Leave", entitlement: 15, used: 4, pending: 1, balance: 10, status: "Good", fill: "#2563eb" },
      { leaveType: "Emergency Leave", entitlement: 7, used: 2, pending: 0, balance: 5, status: "Low", fill: "#ef4444" },
    ],
  },
  {
    employee: "Carlos Reyes",
    employeeId: "EMP-0003",
    department: "Finance",
    initials: "CR",
    balances: [
      { leaveType: "Vacation Leave", entitlement: 15, used: 6, pending: 0, balance: 9, status: "Good", fill: "#22c55e" },
      { leaveType: "Sick Leave", entitlement: 15, used: 1, pending: 0, balance: 14, status: "Good", fill: "#2563eb" },
      { leaveType: "Emergency Leave", entitlement: 7, used: 0, pending: 0, balance: 7, status: "Good", fill: "#ef4444" },
    ],
  },
  {
    employee: "Anna Garcia",
    employeeId: "EMP-0004",
    department: "Operations",
    initials: "AG",
    balances: [
      { leaveType: "Vacation Leave", entitlement: 15, used: 12, pending: 0, balance: 3, status: "Critical", fill: "#22c55e" },
      { leaveType: "Sick Leave", entitlement: 15, used: 6, pending: 0, balance: 9, status: "Good", fill: "#2563eb" },
      { leaveType: "Emergency Leave", entitlement: 7, used: 3, pending: 0, balance: 4, status: "Low", fill: "#ef4444" },
    ],
  },
  {
    employee: "Michael Tan",
    employeeId: "EMP-0005",
    department: "Information Technology",
    initials: "MT",
    balances: [
      { leaveType: "Vacation Leave", entitlement: 15, used: 3, pending: 1, balance: 11, status: "Good", fill: "#22c55e" },
      { leaveType: "Sick Leave", entitlement: 15, used: 0, pending: 0, balance: 15, status: "Excellent", fill: "#2563eb" },
      { leaveType: "Emergency Leave", entitlement: 7, used: 0, pending: 0, balance: 7, status: "Good", fill: "#ef4444" },
    ],
  },
] as const

export const LEAVE_BALANCE_OVERVIEW_DATA = [
  { name: "Vacation Leave", value: 2156, note: "37.8%", fill: "#22c55e" },
  { name: "Sick Leave", value: 2104, note: "36.9%", fill: "#7c3aed" },
  { name: "Emergency Leave", value: 876, note: "15.3%", fill: "#ef4444" },
  { name: "Maternity Leave", value: 375, note: "6.6%", fill: "#f59e0b" },
  { name: "Paternity Leave", value: 200, note: "3.4%", fill: "#06b6d4" },
] as const

export const LEAVE_BALANCE_STATUS_LEGEND_DATA = [
  { name: "Excellent", note: "More than 75% balance", fill: "#22c55e" },
  { name: "Good", note: "50% to 75% balance", fill: "#2563eb" },
  { name: "Low", note: "25% to 50% balance", fill: "#f59e0b" },
  { name: "Critical", note: "Less than 25% balance", fill: "#ef4444" },
] as const

export const LEAVE_CALENDAR_EVENT_DATA = [
  { day: "26", muted: true, events: [] },
  { day: "27", muted: true, events: [] },
  { day: "28", muted: true, events: [] },
  { day: "29", muted: true, events: [] },
  { day: "30", muted: true, events: [] },
  { day: "1", events: [{ type: "Vacation Leave", count: "3 people", tone: "green" }] },
  { day: "2", events: [] },
  { day: "3", events: [] },
  { day: "4", events: [{ type: "Sick Leave", count: "2 people", tone: "violet" }] },
  { day: "5", events: [{ type: "Vacation Leave", count: "1 person", tone: "green" }] },
  { day: "6", events: [{ type: "Maternity Leave", count: "1 person", tone: "orange" }] },
  { day: "7", events: [] },
  { day: "8", events: [{ type: "Sick Leave", count: "2 people", tone: "violet" }, { type: "+1 more", count: "", tone: "blue" }] },
  { day: "9", events: [] },
  { day: "10", events: [] },
  { day: "11", events: [{ type: "Vacation Leave", count: "4 people", tone: "green" }, { type: "+1 more", count: "", tone: "blue" }] },
  { day: "12", events: [] },
  { day: "13", events: [{ type: "Emergency Leave", count: "1 person", tone: "red" }] },
  { day: "14", events: [] },
  { day: "15", today: true, events: [{ type: "Vacation Leave", count: "2 people", tone: "green" }] },
  { day: "16", events: [] },
  { day: "17", events: [] },
  { day: "18", events: [{ type: "Paternity Leave", count: "1 person", tone: "orange" }, { type: "Special Privilege", count: "1 person", tone: "blue" }] },
  { day: "19", events: [] },
  { day: "20", events: [{ type: "Vacation Leave", count: "1 person", tone: "green" }] },
  { day: "21", events: [{ type: "Sick Leave", count: "1 person", tone: "violet" }] },
  { day: "22", events: [] },
  { day: "23", events: [] },
  { day: "24", events: [] },
  { day: "25", events: [{ type: "Vacation Leave", count: "3 people", tone: "green" }, { type: "+2 more", count: "", tone: "blue" }] },
  { day: "26", events: [] },
  { day: "27", events: [{ type: "Maternity Leave", count: "1 person", tone: "orange" }] },
  { day: "28", events: [] },
  { day: "29", events: [{ type: "Sick Leave", count: "1 person", tone: "violet" }] },
  { day: "30", events: [] },
  { day: "31", events: [] },
  { day: "1", muted: true, events: [] },
  { day: "2", muted: true, events: [] },
  { day: "3", muted: true, events: [] },
  { day: "4", muted: true, events: [] },
  { day: "5", muted: true, events: [] },
  { day: "6", muted: true, events: [] },
] as const

export const LEAVE_CALENDAR_OVERVIEW_DATA = [
  { title: "Total on Leave", value: "28", note: "employees", tone: "blue", icon: "Users" },
  { title: "Total Days", value: "96", note: "days", tone: "green", icon: "CalendarDays" },
  { title: "Departments Affected", value: "7", note: "departments", tone: "violet", icon: "Building2" },
  { title: "Upcoming Leaves", value: "12", note: "within 7 days", tone: "orange", icon: "Clock3" },
] as const

export const LEAVE_CALENDAR_UPCOMING_DATA = [
  { name: "Maria Santos", type: "Vacation Leave", range: "May 16 - May 20, 2026", days: "5 days", initials: "MS", tone: "green" },
  { name: "Carlos Reyes", type: "Sick Leave", range: "May 17 - May 18, 2026", days: "2 days", initials: "CR", tone: "violet" },
  { name: "Anna Garcia", type: "Maternity Leave", range: "May 18 - Aug 18, 2026", days: "93 days", initials: "AG", tone: "orange" },
  { name: "Michael Tan", type: "Vacation Leave", range: "May 19 - May 21, 2026", days: "3 days", initials: "MT", tone: "green" },
  { name: "Jasmine Lee", type: "Paternity Leave", range: "May 20 - May 27, 2026", days: "8 days", initials: "JL", tone: "cyan" },
] as const

export const PAYROLL_GENERATE_KPI_DATA = [
  { title: "Total Employees", value: "124", note: "Active employees", tone: "blue", icon: "Users" },
  { title: "Gross Payroll", value: "₱ 145,280.00", note: "Total gross pay", tone: "green", icon: "CircleDollarSign" },
  { title: "Total Deductions", value: "₱ 22,856.00", note: "Total deductions", tone: "orange", icon: "WalletCards" },
  { title: "Net Payroll", value: "₱ 122,424.00", note: "Total net pay", tone: "violet", icon: "Landmark" },
  { title: "Employer Cost", value: "₱ 156,980.00", note: "Incl. contributions", tone: "cyan", icon: "ReceiptText" },
] as const

export const PAYROLL_REVIEW_KPI_DATA = [
  { title: "Total Employees", value: "124", note: "Selected for payroll", tone: "blue", icon: "Users" },
  { title: "Included Employees", value: "120", note: "Will be paid", tone: "green", icon: "CheckCircle2" },
  { title: "Excluded Employees", value: "4", note: "Not included", tone: "red", icon: "MinusCircle" },
  { title: "Total Basic Salary", value: "₱1,348,000.00", note: "Total basic pay", tone: "blue", icon: "WalletCards" },
  { title: "Total Allowances", value: "₱64,150.00", note: "Total allowances", tone: "violet", icon: "CirclePlus" },
  { title: "Total Deductions", value: "₱152,876.00", note: "Total deductions", tone: "orange", icon: "ReceiptText" },
] as const

export const PAYROLL_EMPLOYEE_DATA = [
  { employee: "Juan Dela Cruz", position: "Software Developer", employeeId: "EMP-0001", department: "Information Technology", employmentType: "Regular", location: "Head Office", basicSalary: "₱35,000.00", allowances: "₱800.00", deductions: "₱550.00", netPay: "₱35,250.00", status: "Included", initials: "JC" },
  { employee: "Maria Santos", position: "HR Specialist", employeeId: "EMP-0002", department: "Human Resources", employmentType: "Regular", location: "Head Office", basicSalary: "₱28,000.00", allowances: "₱600.00", deductions: "₱420.00", netPay: "₱28,180.00", status: "Included", initials: "MS" },
  { employee: "Carlos Reyes", position: "Accountant", employeeId: "EMP-0003", department: "Finance", employmentType: "Regular", location: "Head Office", basicSalary: "₱30,000.00", allowances: "₱750.00", deductions: "₱480.00", netPay: "₱30,270.00", status: "Included", initials: "CR" },
  { employee: "Anna Garcia", position: "Marketing Associate", employeeId: "EMP-0004", department: "Marketing", employmentType: "Regular", location: "Branch Office", basicSalary: "₱26,000.00", allowances: "₱500.00", deductions: "₱390.00", netPay: "₱26,110.00", status: "Included", initials: "AG" },
  { employee: "Michael Tan", position: "System Analyst", employeeId: "EMP-0005", department: "Information Technology", employmentType: "Regular", location: "Branch Office", basicSalary: "₱32,000.00", allowances: "₱700.00", deductions: "₱510.00", netPay: "₱32,190.00", status: "Included", initials: "MT" },
  { employee: "Jasmine Lee", position: "HR Assistant", employeeId: "EMP-0006", department: "Human Resources", employmentType: "Probationary", location: "Head Office", basicSalary: "₱22,000.00", allowances: "₱400.00", deductions: "₱330.00", netPay: "₱22,070.00", status: "Included", initials: "JL" },
  { employee: "Robert Garcia", position: "Sales Representative", employeeId: "EMP-0007", department: "Sales", employmentType: "Regular", location: "Branch Office", basicSalary: "₱24,000.00", allowances: "₱1,200.00", deductions: "₱600.00", netPay: "₱24,600.00", status: "Included", initials: "RG" },
  { employee: "Elaine Cruz", position: "Finance Assistant", employeeId: "EMP-0008", department: "Finance", employmentType: "Regular", location: "Head Office", basicSalary: "₱20,000.00", allowances: "₱300.00", deductions: "₱280.00", netPay: "₱20,020.00", status: "Included", initials: "EC" },
] as const

export const PAYROLL_EXCLUDED_EMPLOYEE_DATA = [
  { employee: "Mark Villanueva", position: "IT Support", employeeId: "EMP-0012", department: "Information Technology", employmentType: "Regular", location: "Branch Office", basicSalary: "₱28,000.00", allowances: "₱500.00", deductions: "₱420.00", netPay: "-", status: "Excluded", initials: "MV" },
  { employee: "Liza Domingo", position: "HR Officer", employeeId: "EMP-0023", department: "Human Resources", employmentType: "Regular", location: "Head Office", basicSalary: "₱25,000.00", allowances: "₱450.00", deductions: "₱380.00", netPay: "-", status: "Excluded", initials: "LD" },
  { employee: "Paul Mendoza", position: "Accountant", employeeId: "EMP-0031", department: "Finance", employmentType: "Regular", location: "Branch Office", basicSalary: "₱27,000.00", allowances: "₱600.00", deductions: "₱450.00", netPay: "-", status: "Excluded", initials: "PM" },
  { employee: "Nina Aquino", position: "Marketing Officer", employeeId: "EMP-0038", department: "Marketing", employmentType: "Regular", location: "Branch Office", basicSalary: "₱23,000.00", allowances: "₱300.00", deductions: "₱350.00", netPay: "-", status: "Excluded", initials: "NA" },
] as const

export const PAYROLL_EARNINGS_DATA = [
  { label: "Basic Salary", amount: "₱1,230,000.00" },
  { label: "Overtime Pay", amount: "₱58,000.00" },
  { label: "Night Differential", amount: "₱18,500.00" },
  { label: "Holiday Pay", amount: "₱25,000.00" },
  { label: "Other Allowances", amount: "₱16,500.00" },
] as const

export const PAYROLL_DEDUCTIONS_DATA = [
  { label: "SSS Contribution", amount: "₱87,456.00" },
  { label: "PhilHealth Contribution", amount: "₱19,250.00" },
  { label: "Pag-IBIG Contribution", amount: "₱9,400.00" },
  { label: "Withholding Tax", amount: "₱24,770.00" },
  { label: "Cash Advance", amount: "₱12,000.00" },
] as const

export const PAYROLL_SUMMARY_DETAILS = [
  ["Payroll Name", "May 2026"],
  ["Pay Period", "May 1 - May 31, 2026"],
  ["Payment Date", "June 5, 2026"],
  ["Pay Type", "Regular Payroll"],
  ["Employees Included", "120"],
  ["Employees Excluded", "4"],
  ["Total Basic Salary", "₱1,348,000.00"],
  ["Total Allowances", "₱64,150.00"],
  ["Total Deductions", "₱152,876.00"],
  ["Total Net Pay", "₱1,195,124.00"],
] as const

export const PAYROLL_RUN_KPI_DATA = [
  { title: "Total Payroll Runs", value: "18", note: "This year", tone: "blue", icon: "CalendarDays" },
  { title: "Completed", value: "15", note: "83.33%", tone: "green", icon: "CheckCircle2" },
  { title: "Processing", value: "1", note: "5.56%", tone: "orange", icon: "Clock3" },
  { title: "Draft", value: "1", note: "5.56%", tone: "violet", icon: "FileText" },
  { title: "Cancelled", value: "1", note: "5.56%", tone: "red", icon: "XCircle" },
] as const

export const PAYROLL_RUN_TABLE_DATA = [
  { name: "Monthly Payroll - May 2026", runId: "PR-2026-00018", period: "May 1 - May 31, 2026", payDate: "Jun 5, 2026", type: "Regular Payroll", employees: 120, netPay: "₱1,195,124.00", status: "Completed", statusNote: "Jun 5, 2026 10:30 AM", generatedBy: "Admin", generatedRole: "System Administrator" },
  { name: "Bi-Weekly Payroll - May 2", runId: "PR-2026-00017", period: "May 16 - May 31, 2026", payDate: "Jun 2, 2026", type: "Regular Payroll", employees: 118, netPay: "₱587,450.00", status: "Completed", statusNote: "Jun 2, 2026 08:15 AM", generatedBy: "Admin", generatedRole: "System Administrator" },
  { name: "Bi-Weekly Payroll - May 1", runId: "PR-2026-00016", period: "May 1 - May 15, 2026", payDate: "May 16, 2026", type: "Regular Payroll", employees: 118, netPay: "₱576,210.00", status: "Completed", statusNote: "May 16, 2026 09:20 AM", generatedBy: "Admin", generatedRole: "System Administrator" },
  { name: "Monthly Payroll - April 2026", runId: "PR-2026-00015", period: "Apr 1 - Apr 30, 2026", payDate: "May 5, 2026", type: "Regular Payroll", employees: 120, netPay: "₱1,178,980.00", status: "Completed", statusNote: "May 5, 2026 10:40 AM", generatedBy: "Admin", generatedRole: "System Administrator" },
  { name: "Bi-Weekly Payroll - Apr 2", runId: "PR-2026-00014", period: "Apr 16 - Apr 30, 2026", payDate: "May 1, 2026", type: "Regular Payroll", employees: 119, netPay: "₱583,210.00", status: "Completed", statusNote: "May 1, 2026 09:10 AM", generatedBy: "Admin", generatedRole: "System Administrator" },
  { name: "Bi-Weekly Payroll - Apr 1", runId: "PR-2026-00013", period: "Apr 1 - Apr 15, 2026", payDate: "Apr 16, 2026", type: "Regular Payroll", employees: 119, netPay: "₱569,870.00", status: "Completed", statusNote: "Apr 16, 2026 06:05 AM", generatedBy: "Admin", generatedRole: "System Administrator" },
  { name: "Monthly Payroll - March 2026", runId: "PR-2026-00012", period: "Mar 1 - Mar 31, 2026", payDate: "Apr 5, 2026", type: "Regular Payroll", employees: 118, netPay: "₱1,152,360.00", status: "Completed", statusNote: "Apr 5, 2026 10:25 AM", generatedBy: "Admin", generatedRole: "System Administrator" },
  { name: "Monthly Payroll - February 2026", runId: "PR-2026-00011", period: "Feb 1 - Feb 28, 2026", payDate: "Mar 5, 2026", type: "Regular Payroll", employees: 118, netPay: "₱1,124,550.00", status: "Completed", statusNote: "Mar 5, 2026 10:18 AM", generatedBy: "Admin", generatedRole: "System Administrator" },
  { name: "Monthly Payroll - January 2026", runId: "PR-2026-00010", period: "Jan 1 - Jan 31, 2026", payDate: "Feb 5, 2026", type: "Regular Payroll", employees: 116, netPay: "₱1,098,760.00", status: "Completed", statusNote: "Feb 5, 2026 10:22 AM", generatedBy: "Admin", generatedRole: "System Administrator" },
  { name: "Monthly Payroll - June 2026", runId: "PR-2026-00019", period: "Jun 1 - Jun 30, 2026", payDate: "-", type: "Regular Payroll", employees: 120, netPay: "-", status: "Processing", statusNote: "Started Jun 10, 2026 02:15 PM", generatedBy: "Admin", generatedRole: "System Administrator" },
  { name: "Off-cycle Payroll - Bonus", runId: "PR-2026-00009", period: "May 15 - May 15, 2026", payDate: "May 15, 2026", type: "Bonus", employees: 15, netPay: "₱120,000.00", status: "Draft", statusNote: "", generatedBy: "Admin", generatedRole: "System Administrator" },
  { name: "Cancelled Payroll Run", runId: "PR-2026-00008", period: "Apr 10 - Apr 10, 2026", payDate: "Apr 10, 2026", type: "Regular Payroll", employees: 2, netPay: "₱0.00", status: "Cancelled", statusNote: "Apr 10, 2026 04:30 PM", generatedBy: "Admin", generatedRole: "System Administrator" },
] as const

export const PAYROLL_RUN_STATUS_DATA = [
  { name: "Completed", value: 15, note: "83.33%", fill: "#22c55e" },
  { name: "Processing", value: 1, note: "5.56%", fill: "#f59e0b" },
  { name: "Draft", value: 1, note: "5.56%", fill: "#7c3aed" },
  { name: "Cancelled", value: 1, note: "5.56%", fill: "#ef4444" },
] as const

export const PAYROLL_RUN_YEAR_SUMMARY = [
  ["Total Payroll", "₱16,250,604.00"],
  ["Total Employees Paid", "120"],
  ["Average Net Pay", "₱1,170,504.00"],
  ["Highest Net Pay", "₱1,250,000.00"],
  ["Lowest Net Pay", "₱22,450.00"],
] as const

export const PAYSLIP_KPI_DATA = [
  { title: "Total Payslips", value: "482", note: "This Year", tone: "violet", icon: "FileText" },
  { title: "Paid Payslips", value: "468", note: "97.09%", tone: "green", icon: "CheckCircle2" },
  { title: "Pending Payslips", value: "14", note: "2.91%", tone: "orange", icon: "ReceiptText" },
  { title: "Total Amount Paid", value: "₱16,250,604.00", note: "This Year", tone: "blue", icon: "WalletCards" },
] as const

export const PAYSLIP_TABLE_DATA = [
  { employee: "Juan Dela Cruz", employeeId: "EMP-0001", department: "Information Technology", payPeriod: "May 1 - May 31, 2026", payDate: "Jun 5, 2026", netPay: "₱35,250.00", status: "Paid", initials: "JC" },
  { employee: "Maria Santos", employeeId: "EMP-0002", department: "Human Resources", payPeriod: "May 1 - May 31, 2026", payDate: "Jun 5, 2026", netPay: "₱28,180.00", status: "Paid", initials: "MS" },
  { employee: "Carlos Reyes", employeeId: "EMP-0003", department: "Finance", payPeriod: "May 1 - May 31, 2026", payDate: "Jun 5, 2026", netPay: "₱30,270.00", status: "Paid", initials: "CR" },
  { employee: "Anna Garcia", employeeId: "EMP-0004", department: "Marketing", payPeriod: "May 1 - May 31, 2026", payDate: "Jun 5, 2026", netPay: "₱26,110.00", status: "Paid", initials: "AG" },
  { employee: "Michael Tan", employeeId: "EMP-0005", department: "Information Technology", payPeriod: "May 1 - May 31, 2026", payDate: "Jun 5, 2026", netPay: "₱32,190.00", status: "Paid", initials: "MT" },
  { employee: "Liza Cruz", employeeId: "EMP-0006", department: "Operations", payPeriod: "May 1 - May 31, 2026", payDate: "Jun 5, 2026", netPay: "₱24,560.00", status: "Pending", initials: "LC" },
  { employee: "Benjie Ramos", employeeId: "EMP-0007", department: "Sales", payPeriod: "May 1 - May 31, 2026", payDate: "Jun 5, 2026", netPay: "₱27,890.00", status: "Paid", initials: "BR" },
  { employee: "Jasmine Lee", employeeId: "EMP-0008", department: "Human Resources", payPeriod: "May 1 - May 31, 2026", payDate: "Jun 5, 2026", netPay: "₱25,450.00", status: "Pending", initials: "JL" },
  { employee: "Rafael Bautista", employeeId: "EMP-0009", department: "Finance", payPeriod: "May 1 - May 31, 2026", payDate: "Jun 5, 2026", netPay: "₱31,780.00", status: "Paid", initials: "RB" },
  { employee: "Patricia Gomez", employeeId: "EMP-0010", department: "Customer Support", payPeriod: "May 1 - May 31, 2026", payDate: "Jun 5, 2026", netPay: "₱23,640.00", status: "Paid", initials: "PG" },
] as const

export const PAYSLIP_SUMMARY_DATA = [
  ["Total Payslips", "482"],
  ["Paid Payslips", "468"],
  ["Pending Payslips", "14"],
  ["Total Amount Paid", "₱16,250,604.00"],
  ["Average Net Pay", "₱33,755.40"],
  ["Highest Net Pay", "₱125,000.00"],
  ["Lowest Net Pay", "₱12,450.00"],
] as const

export const PAYSLIP_STATUS_DATA = [
  { name: "Paid", value: 468, note: "97.09%", fill: "#22c55e" },
  { name: "Pending", value: 14, note: "2.91%", fill: "#f59e0b" },
] as const

export const LEAVE_ENCASHMENT_KPI_DATA = [
  { title: "Total Requests", value: "28", note: "This Year", tone: "blue", icon: "FileText" },
  { title: "Approved", value: "18", note: "64.29%", tone: "green", icon: "CheckCircle2" },
  { title: "Pending", value: "6", note: "21.43%", tone: "orange", icon: "Clock3" },
  { title: "Paid", value: "16", note: "57.14%", tone: "violet", icon: "BadgeDollarSign" },
  { title: "Rejected", value: "4", note: "14.29%", tone: "red", icon: "XCircle" },
  { title: "Total Amount Paid", value: "₱612,450.00", note: "This Year", tone: "blue", icon: "CircleDollarSign" },
] as const

export const LEAVE_ENCASHMENT_TABLE_DATA = [
  { employee: "Juan Dela Cruz", employeeId: "EMP-0001", department: "Information Technology", leaveType: "Vacation Leave", balance: "12.50", days: "5.00", amount: "12,500.00", status: "Approved", requestDate: "May 28, 2026", initials: "JC" },
  { employee: "Maria Santos", employeeId: "EMP-0002", department: "Human Resources", leaveType: "Vacation Leave", balance: "8.00", days: "3.00", amount: "7,200.00", status: "Pending", requestDate: "May 28, 2026", initials: "MS" },
  { employee: "Carlos Reyes", employeeId: "EMP-0003", department: "Finance", leaveType: "Sick Leave", balance: "15.00", days: "7.00", amount: "10,500.00", status: "Approved", requestDate: "May 27, 2026", initials: "CR" },
  { employee: "Anna Garcia", employeeId: "EMP-0004", department: "Marketing", leaveType: "Vacation Leave", balance: "6.50", days: "2.50", amount: "6,125.00", status: "Paid", requestDate: "May 26, 2026", initials: "AG" },
  { employee: "Michael Tan", employeeId: "EMP-0005", department: "Information Technology", leaveType: "Vacation Leave", balance: "10.00", days: "4.00", amount: "9,600.00", status: "Paid", requestDate: "May 25, 2026", initials: "MT" },
  { employee: "Liza Cruz", employeeId: "EMP-0006", department: "Operations", leaveType: "Sick Leave", balance: "20.00", days: "10.00", amount: "15,000.00", status: "Approved", requestDate: "May 24, 2026", initials: "LC" },
  { employee: "Benjie Ramos", employeeId: "EMP-0007", department: "Sales", leaveType: "Vacation Leave", balance: "4.00", days: "2.00", amount: "4,800.00", status: "Rejected", requestDate: "May 23, 2026", initials: "BR" },
  { employee: "Jasmine Lee", employeeId: "EMP-0008", department: "Human Resources", leaveType: "Maternity Leave", balance: "35.00", days: "5.00", amount: "8,750.00", status: "Pending", requestDate: "May 22, 2026", initials: "JL" },
  { employee: "Rafael Bautista", employeeId: "EMP-0009", department: "Finance", leaveType: "Vacation Leave", balance: "9.00", days: "3.00", amount: "7,200.00", status: "Paid", requestDate: "May 21, 2026", initials: "RB" },
  { employee: "Patricia Gomez", employeeId: "EMP-0010", department: "Customer Support", leaveType: "Sick Leave", balance: "12.00", days: "4.00", amount: "6,000.00", status: "Approved", requestDate: "May 20, 2026", initials: "PG" },
] as const

export const LEAVE_ENCASHMENT_SUMMARY_DATA = [
  ["Total Encashment Days", "68.50"],
  ["Total Amount Paid", "₱612,450.00"],
  ["Average Amount", "₱8,978.68"],
  ["Highest Encashment", "₱25,000.00"],
  ["Lowest Encashment", "₱2,400.00"],
] as const

export const LEAVE_ENCASHMENT_BREAKDOWN_DATA = [
  { name: "Vacation Leave", value: 42.5, note: "62.04%", fill: "#22c55e" },
  { name: "Sick Leave", value: 18, note: "26.28%", fill: "#2563eb" },
  { name: "Maternity Leave", value: 8, note: "11.68%", fill: "#f59e0b" },
] as const

export const PAYROLL_SETTINGS_SUMMARY_DATA = [
  ["Total Payroll Runs", "18"],
  ["Total Employees Paid", "120"],
  ["Total Amount Paid", "₱16,250,604.00"],
  ["Average Net Pay", "₱33,755.40"],
  ["Last Payroll Run", "May 1 - May 31, 2026"],
] as const

export const PAYROLL_SETTINGS_COMPONENT_DATA = [
  { name: "Basic Salary", description: "Monthly basic pay", category: "Earnings", type: "Fixed Amount", method: "Fixed amount", taxable: "Yes", status: "Active", tone: "green" },
  { name: "Overtime Pay", description: "Payment for overtime work", category: "Earnings", type: "Variable", method: "Rate x Hours", taxable: "Yes", status: "Active", tone: "green" },
  { name: "Night Differential", description: "Additional pay for night shift", category: "Earnings", type: "Percentage", method: "% of Basic Salary", taxable: "Yes", status: "Active", tone: "green" },
  { name: "Commission", description: "Sales commission", category: "Earnings", type: "Variable", method: "Fixed amount", taxable: "Yes", status: "Active", tone: "green" },
  { name: "Health Allowance", description: "Monthly health allowance", category: "Benefits", type: "Fixed Amount", method: "Fixed amount", taxable: "No", status: "Active", tone: "blue" },
  { name: "Meal Allowance", description: "Daily meal allowance", category: "Benefits", type: "Fixed Amount", method: "Per day", taxable: "No", status: "Active", tone: "blue" },
  { name: "Transportation Allowance", description: "Monthly transportation allowance", category: "Benefits", type: "Fixed Amount", method: "Fixed amount", taxable: "No", status: "Active", tone: "blue" },
  { name: "SSS Employee Share", description: "Social Security System contribution", category: "Deductions", type: "Percentage", method: "% of Basic Salary", taxable: "Yes", status: "Active", tone: "orange" },
  { name: "PhilHealth Employee Share", description: "PhilHealth contribution", category: "Deductions", type: "Percentage", method: "% of Basic Salary", taxable: "Yes", status: "Active", tone: "orange" },
  { name: "Pag-IBIG Employee Share", description: "Pag-IBIG Fund contribution", category: "Deductions", type: "Percentage", method: "% of Basic Salary", taxable: "Yes", status: "Active", tone: "orange" },
] as const

export const PAYROLL_SETTINGS_COMPONENT_CATEGORIES = [
  { name: "Earnings", value: 12, note: "50.0%", fill: "#22c55e" },
  { name: "Deductions", value: 8, note: "33.3%", fill: "#f59e0b" },
  { name: "Benefits", value: 3, note: "12.5%", fill: "#2563eb" },
  { name: "Loans", value: 1, note: "4.2%", fill: "#ef4444" },
] as const

export const PAYROLL_COMPONENT_CATEGORY_DATA = [
  { name: "Earnings", description: "Components that add to the employee's gross pay", type: "Earning", components: 12, status: "Active", tone: "green" },
  { name: "Deductions", description: "Components that deduct from employee's gross pay", type: "Deduction", components: 8, status: "Active", tone: "red" },
  { name: "Reimbursements", description: "Components for reimbursing employee expenses", type: "Reimbursement", components: 6, status: "Active", tone: "blue" },
  { name: "Benefits", description: "Non-cash benefits provided to employees", type: "Benefit", components: 5, status: "Active", tone: "violet" },
  { name: "Taxes", description: "Statutory and government taxes", type: "Tax", components: 7, status: "Active", tone: "orange" },
  { name: "Government Contributions", description: "Mandatory government contributions", type: "Gov. Contribution", components: 7, status: "Active", tone: "cyan" },
  { name: "Loans", description: "Employee loans and advances", type: "Deduction", components: 4, status: "Active", tone: "amber" },
  { name: "Other Income", description: "Other income not classified elsewhere", type: "Earning", components: 3, status: "Active", tone: "slate" },
] as const

export const PAYROLL_COMPONENT_CATEGORY_SUMMARY = [
  ["Total Categories", "8"],
  ["Earning Categories", "2"],
  ["Deduction Categories", "2"],
  ["Reimbursement Categories", "1"],
  ["Other Categories", "3"],
] as const

export const PAYROLL_COMPONENT_CATEGORY_BREAKDOWN = [
  { name: "Earnings", value: 12, note: "30%", fill: "#22c55e" },
  { name: "Deductions", value: 12, note: "30%", fill: "#ef4444" },
  { name: "Reimbursements", value: 6, note: "15%", fill: "#2563eb" },
  { name: "Benefits", value: 5, note: "12.5%", fill: "#7c3aed" },
  { name: "Taxes", value: 7, note: "17.5%", fill: "#f59e0b" },
  { name: "Gov. Contributions", value: 7, note: "17.5%", fill: "#06b6d4" },
] as const

export const PAYROLL_SETTINGS_DEDUCTION_DATA = [
  { name: "SSS Contribution", description: "Social Security System", category: "Statutory", type: "Percentage", method: "Based on Salary Bracket", cap: "No Limit", taxable: "No", status: "Active", tone: "blue" },
  { name: "PhilHealth Contribution", description: "Philippine Health Insurance", category: "Statutory", type: "Percentage", method: "Based on Salary Bracket", cap: "No Limit", taxable: "No", status: "Active", tone: "green" },
  { name: "Pag-IBIG Contribution", description: "Pag-IBIG Fund", category: "Statutory", type: "Percentage", method: "Based on Salary Bracket", cap: "No Limit", taxable: "No", status: "Active", tone: "red" },
  { name: "Withholding Tax (BIR)", description: "Income Tax Withheld", category: "Statutory", type: "Percentage", method: "Based on Tax Table", cap: "No Limit", taxable: "No", status: "Active", tone: "violet" },
  { name: "Salary Loan", description: "Company Salary Loan", category: "Loans", type: "Fixed Amount", method: "Fixed amount", cap: "No Limit", taxable: "No", status: "Active", tone: "orange" },
  { name: "Cash Advance", description: "Cash advance deduction", category: "Loans", type: "Fixed Amount", method: "Fixed amount", cap: "No Limit", taxable: "No", status: "Active", tone: "cyan" },
  { name: "Housing Loan", description: "Housing loan repayment", category: "Loans", type: "Percentage", method: "% of Basic Salary", cap: "No Limit", taxable: "No", status: "Active", tone: "brown" },
  { name: "Life Insurance", description: "Group life insurance premium", category: "Other", type: "Fixed Amount", method: "Fixed amount", cap: "No Limit", taxable: "No", status: "Active", tone: "pink" },
] as const

export const PAYROLL_SETTINGS_DEDUCTION_CATEGORIES = [
  { name: "Statutory", value: 4, note: "50.0%", fill: "#2563eb" },
  { name: "Loans", value: 3, note: "37.5%", fill: "#f59e0b" },
  { name: "Other", value: 1, note: "12.5%", fill: "#78716c" },
] as const

export const PAYROLL_SETTINGS_RULE_DATA = [
  { name: "Overtime Rule", description: "Calculate overtime pay for hours beyond regular hours", appliesTo: "All Employees\nAll Departments", condition: "Hours Worked > 8 per day\nMon - Fri", result: "1.25x hourly rate for overtime hours", priority: 1, status: "Active", tone: "violet" },
  { name: "Holiday Pay Rule", description: "Pay employees for holidays worked", appliesTo: "All Employees\nAll Departments", condition: "Work on company configured holiday", result: "2.00x daily rate", priority: 2, status: "Active", tone: "green" },
  { name: "Rest Day Rule", description: "Compensate work on rest days", appliesTo: "All Employees\nAll Departments", condition: "Work on rest day", result: "1.30x daily rate", priority: 3, status: "Active", tone: "orange" },
  { name: "Sick Leave Pay Rule", description: "Deduct sick leave based on daily rate", appliesTo: "All Employees", condition: "Sick leave approved", result: "Deduct from sick leave balance", priority: 4, status: "Active", tone: "blue" },
  { name: "Absent without Pay Rule", description: "Deduct pay for unpaid absences", appliesTo: "All Employees", condition: "Unapproved absence or AWOL", result: "Deduct daily rate", priority: 5, status: "Active", tone: "red" },
  { name: "Probationary Rule", description: "Exclude certain benefits for probationary employees", appliesTo: "Probationary Employees", condition: "Employee status = Probationary", result: "Remove allowances and bonuses", priority: 6, status: "Active", tone: "violet" },
  { name: "Salary Loan Deduction Rule", description: "Deduct salary loan payments", appliesTo: "Employees with Active Loans", condition: "Active loan exists", result: "Deduct scheduled loan amount", priority: 7, status: "Active", tone: "cyan" },
  { name: "Tax Bracket Rule", description: "Apply tax based on BIR salary brackets", appliesTo: "All Employees", condition: "Gross pay calculation", result: "Apply BIR tax table", priority: 8, status: "Active", tone: "orange" },
  { name: "PhilHealth Deduction Rule", description: "Calculate PhilHealth premium", appliesTo: "All Employees", condition: "Based on monthly basic salary", result: "Apply PhilHealth table", priority: 9, status: "Active", tone: "green" },
  { name: "Pag-IBIG Deduction Rule", description: "Calculate Pag-IBIG contribution", appliesTo: "All Employees", condition: "Based on monthly basic salary", result: "Apply Pag-IBIG table", priority: 10, status: "Active", tone: "pink" },
] as const

export const PAYROLL_SETTINGS_RULE_CATEGORIES = [
  { name: "Earnings Rules", value: 5, note: "33.3%", fill: "#22c55e" },
  { name: "Deduction Rules", value: 6, note: "40.0%", fill: "#2563eb" },
  { name: "Tax Rules", value: 2, note: "13.3%", fill: "#f59e0b" },
  { name: "Other Rules", value: 2, note: "13.3%", fill: "#7c3aed" },
] as const

export const PAYROLL_SETTINGS_TAX_DATA = [
  { name: "Withholding Tax (BIR)", description: "Income tax withholding", type: "Withholding", appliesTo: "All Employees", method: "Based on Tax Table", rate: "Progressive", status: "Active", tone: "green" },
  { name: "Percentage Tax", description: "For contractors and professionals", type: "Percentage", appliesTo: "Contractors", method: "% of Gross Payment", rate: "3.00%", status: "Active", tone: "violet" },
  { name: "Value Added Tax (VAT)", description: "12% value added tax", type: "Percentage", appliesTo: "Company (Output Tax)", method: "% of Sales / Services", rate: "12.00%", status: "Active", tone: "orange" },
  { name: "Expanded Withholding Tax", description: "Expanded withholding tax", type: "Withholding", appliesTo: "Suppliers / Vendors", method: "Based on EWT Table", rate: "Varies", status: "Active", tone: "pink" },
  { name: "Documentary Stamp Tax", description: "On loan and credit documents", type: "Fixed Amount", appliesTo: "Loans", method: "Fixed amount per tranche", rate: "₱1,500.00", status: "Active", tone: "blue" },
  { name: "Local Tax (Business Tax)", description: "Local business tax", type: "Fixed Amount", appliesTo: "Company", method: "Monthly Fixed Amount", rate: "₱500.00", status: "Active", tone: "cyan" },
  { name: "Real Property Tax", description: "Annual real property tax", type: "Fixed Amount", appliesTo: "Company", method: "Annual Fixed Amount", rate: "₱5,000.00", status: "Inactive", tone: "amber" },
  { name: "Other Tax", description: "Other applicable taxes", type: "Percentage", appliesTo: "All Employees", method: "% of Taxable Amount", rate: "1.50%", status: "Active", tone: "violet" },
] as const

export const PAYROLL_SETTINGS_TAX_DISTRIBUTION = [
  { name: "Withholding Taxes", value: 2, note: "25%", fill: "#22c55e" },
  { name: "Percentage Taxes", value: 3, note: "37.5%", fill: "#2563eb" },
  { name: "Fixed Amount Taxes", value: 3, note: "37.5%", fill: "#f59e0b" },
] as const

export const PAYROLL_SETTINGS_CONTRIBUTION_DATA = [
  { name: "SSS Contribution", description: "Social Security System", agency: "SSS", category: "Mandatory", employeeShare: "4.50%\nMaximum: ₱1,200.00", employerShare: "9.50%\nMaximum: ₱2,400.00", basis: "Monthly Salary\nCapped at ₱20,000.00", status: "Active", tone: "blue" },
  { name: "PhilHealth Contribution", description: "Philippine Health Insurance Corporation", agency: "PhilHealth", category: "Mandatory", employeeShare: "2.75%\nMaximum: ₱1,800.00", employerShare: "2.75%\nMaximum: ₱1,800.00", basis: "Monthly Salary\nNo upper limit", status: "Active", tone: "green" },
  { name: "Pag-IBIG Contribution", description: "Pag-IBIG Fund", agency: "Pag-IBIG", category: "Mandatory", employeeShare: "2.00%\nMaximum: ₱100.00", employerShare: "2.00%\nMaximum: ₱100.00", basis: "Monthly Salary\nCapped at ₱5,000.00", status: "Active", tone: "blue" },
  { name: "EC Contribution", description: "Employees Compensation Commission", agency: "ECC", category: "Optional", employeeShare: "-", employerShare: "Varies\nBased on risk class", basis: "Monthly Salary\nBased on risk classification", status: "Active", tone: "green" },
  { name: "SSS Salary Loan", description: "Salary loan program", agency: "SSS", category: "Optional", employeeShare: "Varies\nDepends on loan", employerShare: "-", basis: "Loan Amount\nFixed deduction", status: "Active", tone: "blue" },
  { name: "HDMF (Additional)", description: "Housing Development Mutual Fund", agency: "Pag-IBIG", category: "Optional", employeeShare: "Up to 2.00%\nEmployee voluntary", employerShare: "-", basis: "Monthly Salary\nCapped at ₱5,000.00", status: "Inactive", tone: "blue" },
  { name: "WISP Plus", description: "Workers' Investment and Savings Program", agency: "SSS", category: "Optional", employeeShare: "Varies\nEmployee voluntary", employerShare: "-", basis: "Monthly Salary\nEmployee voluntary", status: "Inactive", tone: "slate" },
] as const

export const PAYROLL_SETTINGS_CONTRIBUTION_BREAKDOWN = [
  { name: "SSS", value: 55.8, fill: "#2563eb" },
  { name: "PhilHealth", value: 20.9, fill: "#22c55e" },
  { name: "Pag-IBIG", value: 18.6, fill: "#f59e0b" },
  { name: "Others", value: 4.7, fill: "#7c3aed" },
] as const

export const CONTRIBUTIONS_PAGE_TABS = [
  "Active Contributions",
  "Rate History",
  "Exemptions",
  "Settings",
] as const

export const CONTRIBUTIONS_PAGE_DATA = [
  {
    name: "SSS",
    description: "Social Security System",
    agency: "SSS",
    employeeRate: "4.50%",
    employeeBasis: "of taxable salary",
    employerRate: "9.50%",
    employerBasis: "of taxable salary",
    frequency: "Monthly",
    status: "Active",
    tone: "blue",
  },
  {
    name: "PhilHealth",
    description: "Philippine Health Insurance Corporation",
    agency: "PhilHealth",
    employeeRate: "2.75%",
    employeeBasis: "of taxable salary",
    employerRate: "2.75%",
    employerBasis: "of taxable salary",
    frequency: "Monthly",
    status: "Active",
    tone: "green",
  },
  {
    name: "Pag-IBIG",
    description: "Home Development Mutual Fund",
    agency: "Pag-IBIG",
    employeeRate: "2.00%",
    employeeBasis: "of monthly salary",
    employerRate: "2.00%",
    employerBasis: "of monthly salary",
    frequency: "Monthly",
    status: "Active",
    tone: "blue",
  },
  {
    name: "ECC",
    description: "Employees' Compensation Commission",
    agency: "ECC",
    employeeRate: "0.30%",
    employeeBasis: "of basic salary",
    employerRate: "0.30%",
    employerBasis: "of basic salary",
    frequency: "Monthly",
    status: "Active",
    tone: "orange",
  },
  {
    name: "HDMF Additional",
    description: "Additional Pag-IBIG Contribution (Voluntary)",
    agency: "Pag-IBIG",
    employeeRate: "1.00%",
    employeeBasis: "of monthly salary",
    employerRate: "0.00%",
    employerBasis: "-",
    frequency: "Monthly",
    status: "Inactive",
    tone: "violet",
  },
] as const

export const CONTRIBUTIONS_PAGE_SUMMARY = [
  { label: "Active Contributions", value: "4", note: "", tone: "green" },
  { label: "Inactive Contributions", value: "1", note: "", tone: "orange" },
  { label: "Total Employee Rate", value: "9.55%", note: "of salary", tone: "violet" },
  { label: "Total Employer Rate", value: "14.55%", note: "of salary", tone: "blue" },
] as const

export const CONTRIBUTIONS_PAGE_QUICK_ACTIONS = [
  { title: "Add Contribution", description: "Add a new government contribution" },
  { title: "Update Rates", description: "Update all contribution rates" },
  { title: "View Reports", description: "View contribution reports" },
  { title: "Rate History", description: "View rate change history" },
] as const

export const USER_MANAGEMENT_STATS = [
  { title: "Total Users", value: "28", tone: "blue", icon: "Users" },
  { title: "Active Users", value: "24", tone: "green", icon: "Activity" },
  { title: "Inactive Users", value: "4", tone: "orange", icon: "PauseCircle" },
  { title: "Administrators", value: "5", tone: "violet", icon: "ShieldCheck" },
] as const

export const USER_MANAGEMENT_USERS = [
  { id: "USR-0001", name: "Juan Dela Cruz", email: "juan.delacruz@itps.com", initials: "JD", role: "Administrator", department: "IT Department", status: "Active", lastLogin: "May 24, 2025\n10:30 AM", tone: "violet" },
  { id: "USR-0002", name: "Maria Santos", email: "maria.santos@itps.com", initials: "MS", role: "Payroll Officer", department: "Finance Department", status: "Active", lastLogin: "May 24, 2025\n9:15 AM", tone: "blue" },
  { id: "USR-0003", name: "Robert Garcia", email: "robert.garcia@itps.com", initials: "RG", role: "HR Manager", department: "HR Department", status: "Active", lastLogin: "May 23, 2025\n4:45 PM", tone: "green" },
  { id: "USR-0004", name: "Anna Reyes", email: "anna.reyes@itps.com", initials: "AR", role: "Timekeeper", department: "Operations", status: "Active", lastLogin: "May 23, 2025\n2:20 PM", tone: "orange" },
  { id: "USR-0005", name: "Michael Tan", email: "michael.tan@itps.com", initials: "MT", role: "Payroll Officer", department: "Finance Department", status: "Inactive", lastLogin: "May 20, 2025\n11:05 AM", tone: "blue" },
  { id: "USR-0006", name: "Liza Salvador", email: "liza.salvador@itps.com", initials: "LS", role: "Department Head", department: "Sales Department", status: "Active", lastLogin: "May 24, 2025\n8:50 AM", tone: "cyan" },
  { id: "USR-0007", name: "James Pineda", email: "james.pineda@itps.com", initials: "JP", role: "Employee", department: "Marketing Department", status: "Pending", lastLogin: "-", tone: "slate" },
  { id: "USR-0008", name: "Catherine Cruz", email: "catherine.cruz@itps.com", initials: "CC", role: "Timekeeper", department: "Operations", status: "Inactive", lastLogin: "May 18, 2025\n5:30 PM", tone: "orange" },
] as const

export const USER_ROLE_DISTRIBUTION = [
  { label: "Administrator", value: 5, note: "18%", fill: "#7c3aed" },
  { label: "Payroll Officer", value: 6, note: "21%", fill: "#2563eb" },
  { label: "HR Manager", value: 3, note: "11%", fill: "#22c55e" },
  { label: "Timekeeper", value: 4, note: "14%", fill: "#f59e0b" },
  { label: "Department Head", value: 4, note: "14%", fill: "#06b6d4" },
  { label: "Employee", value: 6, note: "21%", fill: "#94a3b8" },
] as const

export const USER_STATUS_SUMMARY = [
  { label: "Active", value: "24", note: "86%", fill: "#22c55e" },
  { label: "Inactive", value: "4", note: "14%", fill: "#ef4444" },
  { label: "Pending", value: "2", note: "7%", fill: "#f59e0b" },
] as const

export const USER_QUICK_ACTIONS = [
  { title: "Add New User", description: "Create a new system user" },
  { title: "Roles & Permissions", description: "Manage user roles and permissions" },
  { title: "Activity Logs", description: "View user activity and audit logs" },
  { title: "Import Users", description: "Bulk import users from CSV file" },
] as const

export const USER_AVAILABLE_ROLES = [
  { name: "Administrator", description: "Full access to all modules and system settings", tone: "violet" },
  { name: "Payroll Officer", description: "Manage payroll, runs, payslips and reports", tone: "blue" },
  { name: "HR Manager", description: "Manage employees, attendance, leaves and HR data", tone: "green" },
  { name: "Timekeeper", description: "Manage attendance records and timekeeping", tone: "orange" },
  { name: "Department Head", description: "View department data and generate reports", tone: "cyan" },
  { name: "Employee", description: "View own records and payslips only", tone: "slate" },
] as const

export const ROLE_MANAGEMENT_ROLES = [
  { id: "administrator", name: "Administrator", users: 5, status: "Active", description: "Full access to all modules and system settings.", tone: "violet" },
  { id: "payroll-officer", name: "Payroll Officer", users: 6, status: "Active", description: "Manage payroll runs, payslips, and payroll reports.", tone: "blue" },
  { id: "hr-manager", name: "HR Manager", users: 3, status: "Active", description: "Manage employees, attendance, leaves, and HR records.", tone: "green" },
  { id: "timekeeper", name: "Timekeeper", users: 4, status: "Active", description: "Manage attendance records and timekeeping.", tone: "orange" },
  { id: "department-head", name: "Department Head", users: 4, status: "Active", description: "View department records and generate reports.", tone: "cyan" },
  { id: "employee", name: "Employee", users: 6, status: "Active", description: "View own records and payslips only.", tone: "slate" },
  { id: "viewer", name: "Viewer", users: 2, status: "Inactive", description: "Read-only access to selected reports.", tone: "slate" },
] as const

export const ROLE_QUICK_ACTIONS = [
  { title: "Add Role", description: "Create a new role" },
  { title: "Permission Groups", description: "Manage permission groups" },
  { title: "Bulk Assign Roles", description: "Assign roles to multiple users" },
  { title: "Import Roles", description: "Import roles from JSON file" },
  { title: "Audit Log", description: "View role change history" },
] as const

export const ROLE_PERMISSION_MODULES = [
  {
    module: "Dashboard",
    rows: [
      { permission: "View Dashboard", view: true, add: false, edit: false, delete: false, export: false },
    ],
  },
  {
    module: "Employee Management",
    rows: [
      { permission: "View Employees", view: true, add: true, edit: true, delete: false, export: false },
      { permission: "Add Employee", view: true, add: false, edit: true, delete: true, export: false },
      { permission: "Edit Employee", view: true, add: true, edit: true, delete: true, export: true },
      { permission: "Delete Employee", view: true, add: false, edit: false, delete: true, export: false },
      { permission: "Export Employee Data", view: true, add: false, edit: false, delete: true, export: false },
    ],
  },
  {
    module: "Attendance Management",
    rows: [
      { permission: "View Attendance", view: true, add: true, edit: false, delete: false, export: false },
      { permission: "Edit Attendance", view: true, add: true, edit: false, delete: true, export: false },
      { permission: "Approve Attendance", view: true, add: false, edit: false, delete: true, export: false },
      { permission: "Export Attendance", view: true, add: false, edit: true, delete: false, export: false },
    ],
  },
] as const

export const ROLE_COLLAPSED_MODULES = [
  "Leave Management",
  "Payroll Management",
  "Reports",
  "Government Contributions",
  "System Settings",
] as const

export const ROLE_PERMISSION_SUMMARY = [
  { label: "Total Permissions", value: "0", tone: "cyan" },
  { label: "View Permissions", value: "0", tone: "green" },
  { label: "Add Permissions", value: "0", tone: "violet" },
  { label: "Edit Permissions", value: "0", tone: "blue" },
  { label: "Delete Permissions", value: "0", tone: "red" },
  { label: "Export Permissions", value: "0", tone: "orange" },
] as const

export const ACTIVITY_LOG_DATA = [
  { date: "May 24, 2025\n10:30:15 AM", user: "Admin", email: "admin@itps.com", initials: "AD", action: "Login", module: "Authentication", description: "User logged in to the system", ip: "192.168.1.10", tone: "green" },
  { date: "May 24, 2025\n10:25:42 AM", user: "Maria Santos", email: "maria.santos@itps.com", initials: "MS", action: "Create", module: "Employee", description: "Created new employee record\n(EMP-2025-0482)", ip: "192.168.1.15", tone: "blue" },
  { date: "May 24, 2025\n10:20:11 AM", user: "Payroll Officer", email: "payroll@itps.com", initials: "PO", action: "Update", module: "Payroll Run", description: "Updated payroll run\nPR-2025-05-001", ip: "192.168.1.20", tone: "orange" },
  { date: "May 24, 2025\n10:15:33 AM", user: "HR Manager", email: "hr@itps.com", initials: "HR", action: "Delete", module: "Leave Request", description: "Deleted leave request\n(LR-2025-0311)", ip: "192.168.1.18", tone: "red" },
  { date: "May 24, 2025\n10:12:08 AM", user: "Timekeeper", email: "timekeeper@itps.com", initials: "TK", action: "Update", module: "Attendance", description: "Updated attendance records\nfor May 24, 2025", ip: "192.168.1.12", tone: "orange" },
  { date: "May 24, 2025\n09:58:44 AM", user: "Department Head", email: "dept.head@itps.com", initials: "DH", action: "Export", module: "Reports", description: "Exported Employee Summary\nReport", ip: "192.168.1.22", tone: "violet" },
  { date: "May 24, 2025\n09:45:21 AM", user: "Admin", email: "admin@itps.com", initials: "AD", action: "Update", module: "User Management", description: "Updated user role for\nJuan Dela Cruz", ip: "192.168.1.10", tone: "orange" },
  { date: "May 24, 2025\n09:30:05 AM", user: "Payroll Officer", email: "payroll@itps.com", initials: "PO", action: "Create", module: "Payslip", description: "Generated payslips for\nMay 2025", ip: "192.168.1.20", tone: "blue" },
  { date: "May 24, 2025\n09:15:48 AM", user: "Maria Santos", email: "maria.santos@itps.com", initials: "MS", action: "Login", module: "Authentication", description: "User logged in to the system", ip: "192.168.1.15", tone: "green" },
  { date: "May 24, 2025\n09:02:17 AM", user: "HR Manager", email: "hr@itps.com", initials: "HR", action: "Create", module: "Employee", description: "Added new employee\n(EMP-2025-0481)", ip: "192.168.1.18", tone: "blue" },
] as const

export const ACTIVITY_LOG_SUMMARY = [
  { label: "Total Activities", value: "245", tone: "blue" },
  { label: "Logins", value: "52", tone: "green" },
  { label: "Data Changes", value: "118", tone: "orange" },
  { label: "Data Deletions", value: "28", tone: "red" },
  { label: "Exports", value: "22", tone: "violet" },
  { label: "Security Events", value: "25", tone: "cyan" },
] as const

export const ACTIVITY_LOG_DETAILS = [
  ["Action", "Login"],
  ["Date", "May 24, 2025 10:30:15 AM"],
  ["User", "Admin (admin@itps.com)"],
  ["Module", "Authentication"],
  ["IP Address", "192.168.1.10"],
  ["User Agent", "Chrome 125.0.0.0 / Windows 11"],
  ["Status", "Success"],
] as const

export const ACTIVITY_QUICK_ACTIONS = [
  { title: "Export Logs", description: "Download activity logs" },
  { title: "Clear Old Logs", description: "Archive logs older than 1 year" },
  { title: "Audit Trail Report", description: "Generate audit trail report" },
] as const

export const SYSTEM_SETTINGS_NAV = [
  { label: "General Settings", icon: "Settings" },
  { label: "Payroll Settings", icon: "Banknote" },
  { label: "Pay Period Settings", icon: "CalendarDays" },
  { label: "Working Schedules", icon: "Clock" },
  { label: "Overtime Settings", icon: "Timer" },
  { label: "Leave Settings", icon: "Plane" },
  { label: "Deduction Settings", icon: "ReceiptText" },
  { label: "Email Settings", icon: "Mail" },
  { label: "Notifications", icon: "Bell" },
  { label: "Security Settings", icon: "ShieldCheck" },
  { label: "Backup & Restore", icon: "DatabaseBackup" },
  { label: "System Preferences", icon: "SlidersHorizontal" },
] as const

export const SYSTEM_SETTINGS_COMPANY_INFO = [
  { label: "Email", value: "info@nadit.com", icon: "Mail" },
  { label: "Phone", value: "(+63) 912 345 6789", icon: "Phone" },
  { label: "Address", value: "123 Business Park,\nCity of Manila, Metro Manila,\nPhilippines", icon: "MapPin" },
] as const

export const SYSTEM_SETTINGS_SHORTCUTS = [
  { title: "Pay Periods", description: "Manage pay periods" },
  { title: "Working Schedules", description: "Manage work schedules" },
  { title: "Email Templates", description: "Manage email templates" },
  { title: "Backup & Restore", description: "Manage system backups" },
  { title: "System Preferences", description: "Configure system behavior" },
] as const
