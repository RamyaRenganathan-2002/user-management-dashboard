// Validates the Add/Edit user form fields
export const validateUserForm = (formData) => {
    const errors = {};

    if (!formData.firstName.trim()) {
        errors.firstName = "First name is required.";
    } else if (formData.firstName.trim().length < 2) {
        errors.firstName = "First name must be at least 2 characters.";
    }

    if (!formData.lastName.trim()) {
        errors.lastName = "Last name is required.";
    } else if (formData.lastName.trim().length < 2) {
        errors.lastName = "Last name must be at least 2 characters.";
    }

    if (!formData.email.trim()) {
        errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Enter a valid email address.";
    }

    if (!formData.department.trim()) {
        errors.department = "Department is required.";
    }

    return errors; // empty object = no errors
};