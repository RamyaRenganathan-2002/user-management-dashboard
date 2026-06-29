import { DEPARTMENT_MAP, DEPARTMENTS } from "./constants";

/**
 * Maps raw API user object → app's internal user shape.
 * Assumption: full name split on first space for firstName/lastName.
 * Assumption: department assigned from DEPARTMENT_MAP by ID, else round-robin.
 */
export const mapApiUser = (apiUser) => {
    const nameParts = apiUser.name.split(" ");
    return {
        id: apiUser.id,
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        email: apiUser.email,
        department: DEPARTMENT_MAP[apiUser.id] || DEPARTMENTS[apiUser.id % DEPARTMENTS.length],
    };
};

/**
 * Applies search query across firstName, lastName, and email fields.
 */
export const applySearch = (users, query) => {
    if (!query.trim()) return users;
    const q = query.toLowerCase();
    return users.filter(
        (u) =>
            u.firstName.toLowerCase().includes(q) ||
            u.lastName.toLowerCase().includes(q) ||
            u.email.toLowerCase().includes(q)
    );
};

/**
 * Applies filter criteria object — only non-empty fields are used.
 */
export const applyFilters = (users, filters) => {
    return users.filter((u) => {
        return (
            (!filters.firstName || u.firstName.toLowerCase().includes(filters.firstName.toLowerCase())) &&
            (!filters.lastName || u.lastName.toLowerCase().includes(filters.lastName.toLowerCase())) &&
            (!filters.email || u.email.toLowerCase().includes(filters.email.toLowerCase())) &&
            (!filters.department || u.department === filters.department)
        );
    });
};

/**
 * Sorts users by a given field, ascending or descending.
 */
export const applySorting = (users, sortField, sortOrder) => {
    if (!sortField) return users;
    return [...users].sort((a, b) => {
        const valA = (a[sortField] || "").toString().toLowerCase();
        const valB = (b[sortField] || "").toString().toLowerCase();
        return sortOrder === "asc" ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
};

/**
 * Slices the sorted/filtered list to the current page window.
 */
export const paginateUsers = (users, currentPage, pageSize) => {
    const start = (currentPage - 1) * pageSize;
    return users.slice(start, start + pageSize);
};

/**
 * Generates the next available numeric ID (max existing ID + 1).
 */
export const generateNextId = (users) => {
    if (!users.length) return 1;
    return Math.max(...users.map((u) => u.id)) + 1;
};