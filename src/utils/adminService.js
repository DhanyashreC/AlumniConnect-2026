// Centralized mock data to simulate a database
export const getAdminStats = () => ({
  students: 1250, alumni: 850, companies: 45, drives: 12, applications: 3400, placementRate: 88
});

export const mockStudents = [
  { id: 1, name: "Arjun K", usn: "1RV21AI001", dept: "AIML", cgpa: 9.2, status: "Placed" },
  { id: 2, name: "Sneha R", usn: "1RV21AI045", dept: "CSE", cgpa: 8.5, status: "Pending" },
];

export const mockDrives = [
  { id: 101, company: "TCS", role: "Ninja", ctc: "3.5 LPA", eligibility: 7.0, status: "Active" },
  { id: 102, company: "Google", role: "SDE-1", ctc: "32 LPA", eligibility: 8.5, status: "Closed" },
];