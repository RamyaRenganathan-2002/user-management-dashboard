const Header = ({ onAddUser }) => {
    return (
        <header className="header">
            <div className="header-brand">
                <h1 className="header-title">User Management</h1>
            </div>
            <button className="btn btn-primary" onClick={onAddUser}>
                + Add User
            </button>
        </header>
    );
};

export default Header;