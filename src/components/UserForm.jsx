import { useState, useEffect } from "react";
import { validateUserForm } from "../utils/validators";
import { DEPARTMENTS } from "../utils/constants";

const EMPTY_FORM = { firstName: "", lastName: "", email: "", department: "" };

const UserForm = ({ editingUser, onSubmit, onClose, isSubmitting }) => {
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});

    // Pre-populate form when editing an existing user
    useEffect(() => {
        if (editingUser) {
            setFormData({
                firstName: editingUser.firstName,
                lastName: editingUser.lastName,
                email: editingUser.email,
                department: editingUser.department,
            });
        } else {
            setFormData(EMPTY_FORM);
        }
        setErrors({});
    }, [editingUser]);

    const handleChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        // Clear error for the field being edited
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    };

    const handleSubmit = () => {
        const validationErrors = validateUserForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        onSubmit(formData);
    };

    const title = editingUser ? "Edit User" : "Add New User";

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal user-form-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button className="modal-close" onClick={onClose}>✕</button>
                </div>

                <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                        id="firstName"
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                        className={errors.firstName ? "input-error" : ""}
                        placeholder="Enter first name"
                    />
                    {errors.firstName && <span className="error-msg">{errors.firstName}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">Last Name *</label>
                    <input
                        id="lastName"
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                        className={errors.lastName ? "input-error" : ""}
                        placeholder="Enter last name"
                    />
                    {errors.lastName && <span className="error-msg">{errors.lastName}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className={errors.email ? "input-error" : ""}
                        placeholder="Enter email address"
                    />
                    {errors.email && <span className="error-msg">{errors.email}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="department">Department *</label>
                    <select
                        id="department"
                        value={formData.department}
                        onChange={(e) => handleChange("department", e.target.value)}
                        className={errors.department ? "input-error" : ""}
                    >
                        <option value="">Select department</option>
                        {DEPARTMENTS.map((d) => (
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
                    {errors.department && <span className="error-msg">{errors.department}</span>}
                </div>

                <div className="modal-actions">
                    <button className="btn btn-ghost" onClick={onClose} disabled={isSubmitting}>
                        Cancel
                    </button>
                    <button className="btn btn-primary" onClick={handleSubmit} disabled={isSubmitting}>
                        {isSubmitting ? "Saving..." : editingUser ? "Update User" : "Add User"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserForm;