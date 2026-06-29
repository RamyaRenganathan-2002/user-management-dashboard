import { SORT_FIELDS } from "../utils/constants";

const UserRow = ({ user, onEdit, onDelete }) => {
    return (
        <tr className="user-row">
            <td className="td-id">{user.id}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td className="td-email">{user.email}</td>
            <td>
                <span className={`badge badge-${user.department.toLowerCase()}`}>
                    {user.department}
                </span>
            </td>
            <td className="td-actions">
                <button
                    className="btn btn-sm btn-outline"
                    onClick={() => onEdit(user)}
                    aria-label={`Edit ${user.firstName}`}
                >
                    Edit
                </button>
                <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(user)}
                    aria-label={`Delete ${user.firstName}`}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default UserRow;