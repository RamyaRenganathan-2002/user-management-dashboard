import { useState, useMemo } from "react";
import useUsers from "./hooks/useUsers";
import { createUser, updateUser, deleteUser } from "./api/userService";
import { applySearch, applyFilters, applySorting, paginateUsers, generateNextId } from "./utils/helpers";
import { DEFAULT_PAGE_SIZE, SORT_ORDER } from "./utils/constants";

import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import FilterPopup from "./components/FilterPopup";
import UserTable from "./components/UserTable";
import Pagination from "./components/Pagination";
import UserForm from "./components/UserForm";
import ConfirmDelete from "./components/ConfirmDelete";

const EMPTY_FILTERS = { firstName: "", lastName: "", email: "", department: "" };

function App() {
    const { users, setUsers, loading, error, setError } = useUsers();

    // UI State
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilters, setActiveFilters] = useState(EMPTY_FILTERS);
    const [sortField, setSortField] = useState("");
    const [sortOrder, setSortOrder] = useState(SORT_ORDER.ASC);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

    // Modal State
    const [showForm, setShowForm] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [deletingUser, setDeletingUser] = useState(null);
    const [showFilterPopup, setShowFilterPopup] = useState(false);

    // Async loading flags
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    // Success toast
    const [toast, setToast] = useState(null);

    const showToast = (message) => {
        setToast(message);
        setTimeout(() => setToast(null), 3000);
    };

    // Derive processed list via memoization to avoid redundant recalculation
    const processedUsers = useMemo(() => {
        let result = applySearch(users, searchQuery);
        result = applyFilters(result, activeFilters);
        result = applySorting(result, sortField, sortOrder);
        return result;
    }, [users, searchQuery, activeFilters, sortField, sortOrder]);

    const paginatedUsers = useMemo(
        () => paginateUsers(processedUsers, currentPage, pageSize),
        [processedUsers, currentPage, pageSize]
    );

    // Change handleSort to accept explicit order instead of toggling
    const handleSort = (field, order) => {
        setSortField(field);
        setSortOrder(order);
        setCurrentPage(1);
    };

    // Add this new handler right after handleSort
    const handleReset = () => {
        setSortField("");
        setSortOrder(SORT_ORDER.ASC);
        setCurrentPage(1);
    };

    const handleSearchChange = (value) => {
        setSearchQuery(value);
        setCurrentPage(1);
    };

    const handleApplyFilters = (filters) => {
        setActiveFilters(filters);
        setCurrentPage(1);
    };

    // ADD USER
    const handleAddUser = async (formData) => {
        setIsSubmitting(true);
        setError(null);
        try {
            await createUser(formData);
            // JSONPlaceholder returns id:11 for all POSTs; generate a unique local ID
            const newUser = { ...formData, id: generateNextId(users) };
            setUsers((prev) => [...prev, newUser]);
            setShowForm(false);
            showToast("User added successfully.");
        } catch {
            setError("Failed to add user. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // EDIT USER
    const handleEditUser = async (formData) => {
        setIsSubmitting(true);
        setError(null);
        try {
            // JSONPlaceholder only supports PUT for IDs 1-10.
            // Locally-created users (id > 10) are updated in state only.
            if (editingUser.id <= 10) {
                await updateUser(editingUser.id, formData);
            }
            setUsers((prev) =>
                prev.map((u) => (u.id === editingUser.id ? { ...u, ...formData } : u))
            );
            setShowForm(false);
            setEditingUser(null);
            showToast("User updated successfully.");
        } catch {
            setError("Failed to update user. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // DELETE USER
    const handleDeleteConfirm = async () => {
        setIsDeleting(true);
        setError(null);
        try {
            // JSONPlaceholder only supports DELETE for IDs 1-10.
            // Locally-created users (id > 10) are removed from state only.
            if (deletingUser.id <= 10) {
                await deleteUser(deletingUser.id);
            }
            setUsers((prev) => prev.filter((u) => u.id !== deletingUser.id));
            setShowDeleteConfirm(false);
            setDeletingUser(null);
            showToast("User deleted successfully.");
        } catch {
            setError("Failed to delete user. Please try again.");
        } finally {
            setIsDeleting(false);
        }
    };

    const openAddForm = () => {
        setEditingUser(null);
        setShowForm(true);
    };

    const openEditForm = (user) => {
        setEditingUser(user);
        setShowForm(true);
    };

    const openDeleteConfirm = (user) => {
        setDeletingUser(user);
        setShowDeleteConfirm(true);
    };

    const hasActiveFilters = Object.values(activeFilters).some((v) => v !== "");

    return (
        <div className="app">
            <Header onAddUser={openAddForm} />

            <main className="main-content">
                {/* Error Banner */}
                {error && (
                    <div className="alert alert-error">
                        <span>⚠️ {error}</span>
                        <button onClick={() => setError(null)}>✕</button>
                    </div>
                )}

                {/* Toast Notification */}
                {toast && <div className="toast">{toast}</div>}

                {/* Toolbar: Search + Filter */}
                <div className="toolbar">
                    <SearchBar value={searchQuery} onChange={handleSearchChange} />
                    <button
                        className={`btn ${hasActiveFilters ? "btn-primary" : "btn-outline"}`}
                        onClick={() => setShowFilterPopup(true)}
                    >
                        🔧 Filters{hasActiveFilters ? " (active)" : ""}
                    </button>
                </div>

                {/* Results summary */}
                <p className="results-summary">
                    {loading ? "Loading users..." : `${processedUsers.length} user(s) found`}
                </p>

                {/* Loading skeleton */}
                {loading ? (
                    <div className="loading-state">
                        <div className="spinner" />
                        <p>Fetching users from the API...</p>
                    </div>
                ) : (
                    <>
                        <UserTable
                            users={paginatedUsers}
                            sortField={sortField}
                            sortOrder={sortOrder}
                            onSort={handleSort}
                            onReset={handleReset}
                            onEdit={openEditForm}
                            onDelete={openDeleteConfirm}
                        />
                        <Pagination
                            currentPage={currentPage}
                            pageSize={pageSize}
                            totalCount={processedUsers.length}
                            onPageChange={setCurrentPage}
                            onPageSizeChange={(size) => {
                                setPageSize(size);
                                setCurrentPage(1);
                            }}
                        />
                    </>
                )}
            </main>

            {/* Modals */}
            {showForm && (
                <UserForm
                    editingUser={editingUser}
                    onSubmit={editingUser ? handleEditUser : handleAddUser}
                    onClose={() => { setShowForm(false); setEditingUser(null); }}
                    isSubmitting={isSubmitting}
                />
            )}

            {showDeleteConfirm && deletingUser && (
                <ConfirmDelete
                    user={deletingUser}
                    onConfirm={handleDeleteConfirm}
                    onCancel={() => { setShowDeleteConfirm(false); setDeletingUser(null); }}
                    isDeleting={isDeleting}
                />
            )}

            {showFilterPopup && (
                <FilterPopup
                    activeFilters={activeFilters}
                    onApply={handleApplyFilters}
                    onClose={() => setShowFilterPopup(false)}
                />
            )}
        </div>
    );
}

export default App;