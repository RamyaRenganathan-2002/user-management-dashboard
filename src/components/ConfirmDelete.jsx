const ConfirmDelete = ({ user, onConfirm, onCancel, isDeleting }) => {
    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal confirm-modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Confirm Delete</h2>
                    <button className="modal-close" onClick={onCancel}>✕</button>
                </div>

                <p className="confirm-message">
                    Are you sure you want to delete{" "}
                    <strong>{user.firstName} {user.lastName}</strong>?
                    This action cannot be undone.
                </p>

                <div className="modal-actions">
                    <button className="btn btn-ghost" onClick={onCancel} disabled={isDeleting}>
                        Cancel
                    </button>
                    <button className="btn btn-danger" onClick={onConfirm} disabled={isDeleting}>
                        {isDeleting ? "Deleting..." : "Delete User"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDelete;