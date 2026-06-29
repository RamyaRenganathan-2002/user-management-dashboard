import { describe, it, expect } from "vitest";
import { applySearch, applyFilters, applySorting, paginateUsers, generateNextId } from "./helpers";

const mockUsers = [
    { id: 1, firstName: "Alice", lastName: "Smith", email: "alice@test.com", department: "IT" },
    { id: 2, firstName: "Bob", lastName: "Jones", email: "bob@test.com", department: "Sales" },
    { id: 3, firstName: "Carol", lastName: "White", email: "carol@test.com", department: "IT" },
];

describe("applySearch", () => {
    it("returns all users when query is empty", () => {
        expect(applySearch(mockUsers, "")).toHaveLength(3);
    });
    it("filters by firstName case-insensitively", () => {
        expect(applySearch(mockUsers, "alice")).toHaveLength(1);
    });
    it("filters by email", () => {
        expect(applySearch(mockUsers, "bob@test")).toHaveLength(1);
    });
    it("returns empty array when no match", () => {
        expect(applySearch(mockUsers, "xyz")).toHaveLength(0);
    });
});

describe("applyFilters", () => {
    it("filters by department", () => {
        const result = applyFilters(mockUsers, { firstName: "", lastName: "", email: "", department: "IT" });
        expect(result).toHaveLength(2);
    });
    it("ignores empty filter fields", () => {
        const result = applyFilters(mockUsers, { firstName: "", lastName: "", email: "", department: "" });
        expect(result).toHaveLength(3);
    });
});

describe("applySorting", () => {
    it("sorts by firstName ascending", () => {
        const sorted = applySorting(mockUsers, "firstName", "asc");
        expect(sorted[0].firstName).toBe("Alice");
        expect(sorted[2].firstName).toBe("Carol");
    });
    it("sorts by firstName descending", () => {
        const sorted = applySorting(mockUsers, "firstName", "desc");
        expect(sorted[0].firstName).toBe("Carol");
    });
});

describe("paginateUsers", () => {
    it("returns correct page slice", () => {
        expect(paginateUsers(mockUsers, 1, 2)).toHaveLength(2);
        expect(paginateUsers(mockUsers, 2, 2)).toHaveLength(1);
    });
});

describe("generateNextId", () => {
    it("returns max id + 1", () => {
        expect(generateNextId(mockUsers)).toBe(4);
    });
    it("returns 1 for empty list", () => {
        expect(generateNextId([])).toBe(1);
    });
});