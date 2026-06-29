import { useState, useRef, useEffect } from "react";
import UserRow from "./UserRow";
import { SORT_FIELDS, SORT_ORDER } from "../utils/constants";

const COLUMNS = [
    { label: "ID", field: null },
    { label: "First Name", field: SORT_FIELDS.FIRST_NAME },
    { label: "Last Name", field: SORT_FIELDS.LAST_NAME },
    { label: "Email", field: SORT_FIELDS.EMAIL },
    { label: "Department", field: SORT_FIELDS.DEPARTMENT },
    { label: "Actions", field: null },
];

const SortDropdown = ({ field, sortField, sortOrder, onSort, onReset }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const isActive = sortField === field;

    const getIcon = () => {
        if (!isActive) return "↕";
        return sortOrder === SORT_ORDER.ASC ? "↑" : "↓";
    };

    const handleOption = (action) => {
        if (action === "reset") {
            onReset();
        } else {
            onSort(field, action);
        }
        setOpen(false);
    };

    return (
        <div className="sort-dropdown-wrapper" ref={ref}>
            <button
                className={`sort-toggle-btn ${isActive ? "sort-active" : ""}`}
                onClick={() => setOpen((prev) => !prev)}
                aria-label={`Sort by ${field}`}
            >
                {getIcon()}
            </button>

            {open && (
                <div className="sort-dropdown">
                    <button
                        className={`sort-option ${isActive && sortOrder === SORT_ORDER.ASC ? "sort-option-selected" : ""}`}
                        onClick={() => handleOption(SORT_ORDER.ASC)}
                    >
                        <span>↑</span> Ascending
                    </button>
                    <button
                        className={`sort-option ${isActive && sortOrder === SORT_ORDER.DESC ? "sort-option-selected" : ""}`}
                        onClick={() => handleOption(SORT_ORDER.DESC)}
                    >
                        <span>↓</span> Descending
                    </button>
                    <div className="sort-divider" />
                    <button className="sort-option sort-option-reset" onClick={() => handleOption("reset")}>
                        <span>↺</span> Reset Order
                    </button>
                </div>
            )}
        </div>
    );
};

const UserTable = ({ users, sortField, sortOrder, onSort, onReset, onEdit, onDelete }) => {
    if (!users.length) {
        return (
            <div className="empty-state">
                <p>No users match your search or filter criteria.</p>
            </div>
        );
    }

    return (
        <div className="table-wrapper">
            <table className="user-table">
                <thead>
                    <tr>
                        {COLUMNS.map(({ label, field }) => (
                            <th key={label}>
                                <div className="th-inner">
                                    {label}
                                    {field && (
                                        <SortDropdown
                                            field={field}
                                            sortField={sortField}
                                            sortOrder={sortOrder}
                                            onSort={onSort}
                                            onReset={onReset}
                                        />
                                    )}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <UserRow key={user.id} user={user} onEdit={onEdit} onDelete={onDelete} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;