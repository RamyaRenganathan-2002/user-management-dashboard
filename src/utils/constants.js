export const API_URL = "https://jsonplaceholder.typicode.com/users";

export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export const DEFAULT_PAGE_SIZE = 10;

export const DEPARTMENTS = ["IT", "Engineering", "Sales", "Marketing", "HR", "Finance"];

// Maps user ID (1–10) to a department for consistent assignment
export const DEPARTMENT_MAP = {
  1: "Engineering",
  2: "Sales",
  3: "Marketing",
  4: "IT",
  5: "HR",
  6: "Finance",
  7: "Engineering",
  8: "Sales",
  9: "IT",
  10: "Marketing",
};

export const SORT_FIELDS = {
  FIRST_NAME: "firstName",
  LAST_NAME: "lastName",
  EMAIL: "email",
  DEPARTMENT: "department",
};

export const SORT_ORDER = {
  ASC: "asc",
  DESC: "desc",
};