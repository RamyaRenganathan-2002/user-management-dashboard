import { useState } from "react";
import { DEPARTMENTS } from "../utils/constants";

const EMPTY_FILTERS = { firstName: "", lastName: "", email: "", department: "" };

const FilterPopup = ({ activeFilters, onApply, onClose }) => {
    const [filters, setFilters] = useState(activeFilters || EMPTY_FILTERS);

    const handleChange = (field, value) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
    };

    const handleApply = () => {
        onApply(filters);
        onClose();
    };

    const handleReset = () => {
        setFilters(EMPTY_FILTERS);
        onApply(EMPTY_FILTERS);
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal filter-popup" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Filter Users</h2>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>

                <div className="form-group">
                    <label>First Name</label>
                    <input
                        type="text"
                        value={filters.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        placeholder="Filter by first name"
                    />
                </div>

                <div className="form-group">
                    <label>Last Name</label>
                    <input
                        type="text"
                        value={filters.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                        placeholder="Filter by last name"
                    />
                </div>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="text"
                        value={filters.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="Filter by email"
                    />
                </div>

                <div className="form-group">
                    <label>Department</label>
                    <select
                        value={filters.department}
                        onChange={(e) => handleChange("department", e.target.value)}
                    >
                        <option value="">All Departments</option>
                        {DEPARTMENTS.map((d) => (
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
                </div>

                <div className="modal-actions">
                    <button className="btn btn-ghost" onClick={handleReset}>Reset</button>
                    <button className="btn btn-primary" onClick={handleApply}>Apply Filters</button>
                </div>
            </div>
        </div>
    );
};

export default FilterPopup;