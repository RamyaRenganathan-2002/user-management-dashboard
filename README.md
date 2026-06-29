# User Management Dashboard

A responsive React + Vite web application for managing users via the JSONPlaceholder mock REST API. Supports full CRUD operations with search, filter, sort, and pagination.

## Live Demo
[Add your Vercel URL here]

## GitHub Repository
[Add your GitHub repo URL here]

---

## Features

- View all users in a structured table
- Add new users with form validation
- Edit existing users with pre-populated form
- Delete users with confirmation modal
- Real-time search by first name, last name, or email
- Filter popup by first name, last name, email, and department
- Sort by any column with ascending, descending, and reset options
- Pagination with 10, 25, 50, 100 rows per page
- localStorage persistence (survives page refresh)
- Responsive design for mobile, tablet, and desktop
- Error handling with user-friendly messages
- Toast notifications for success actions
- 11 unit tests covering all core utility functions

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React 18 + Vite |
| Language | JavaScript ES6+ |
| HTTP Client | Axios |
| Styling | CSS3 with custom properties |
| Testing | Vitest |
| API | JSONPlaceholder `/users` |
| Persistence | localStorage |
| Deployment | Vercel |

---

## Installation & Setup

```bash
# Clone the repository
git clone https://github.com/RamyaRenganathan-2002/user-management-dashboard.git

# Navigate into the project
cd user-management-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build locally
npx vitest        # Run unit tests
```

---

## Folder Structure
user-management-dashboard/

├── public/

├── src/

│   ├── api/

│   │   └── userService.js        # Axios API calls (GET, POST, PUT, DELETE)

│   ├── components/

│   │   ├── Header.jsx            # Top bar with Add User button

│   │   ├── SearchBar.jsx         # Real-time search input

│   │   ├── FilterPopup.jsx       # Multi-field filter modal

│   │   ├── UserTable.jsx         # Table with sortable columns

│   │   ├── UserRow.jsx           # Individual table row

│   │   ├── UserForm.jsx          # Add / Edit user modal form

│   │   ├── Pagination.jsx        # Page controls and size selector

│   │   └── ConfirmDelete.jsx     # Delete confirmation modal

│   ├── hooks/

│   │   └── useUsers.js           # Custom hook for fetch + localStorage

│   ├── utils/

│   │   ├── constants.js          # API URL, departments, page sizes

│   │   ├── validators.js         # Form validation logic

│   │   ├── helpers.js            # Search, filter, sort, paginate, ID gen

│   │   └── helpers.test.js       # Vitest unit tests

│   ├── styles/

│   │   └── index.css             # Global styles and dark theme

│   ├── App.jsx                   # Root component with all state

│   └── main.jsx                  # Entry point

├── index.html

├── vite.config.js

└── README.md

---

## Engineering Assumptions

- **Name splitting:** The JSONPlaceholder API returns a full `name` field. This is split on the first space into `firstName` and `lastName` (e.g. `"Leanne Graham"` → `"Leanne"` / `"Graham"`).
- **Department assignment:** The API has no department field. Departments are assigned deterministically from a predefined map by user ID. New users select from a dropdown of: IT, Engineering, Sales, Marketing, HR, Finance.
- **Persistence:** JSONPlaceholder is a read-only mock API — POST, PUT, and DELETE requests are simulated. All changes are persisted in `localStorage` so the UI state survives page refresh.
- **ID generation:** Since JSONPlaceholder always returns `id: 11` for POST requests, newly added users receive a locally generated ID (max existing ID + 1).
- **Newly added users** appear at the end of the list to reflect append order.

---

## Challenges Faced

- **JSONPlaceholder read-only limitation:** POST/PUT/DELETE return simulated responses without actually modifying data. Solved by maintaining local state and syncing to `localStorage` for persistence across sessions.
- **ID collision on POST:** The API always returns `id: 11` for new users. Solved by generating a unique local ID using `Math.max(...ids) + 1`.
- **Vite cache issues on Windows:** Stale module cache caused `onReset is not a function` errors. Solved by clearing `node_modules/.vite` with `Remove-Item -Recurse -Force node_modules/.vite`.

---

## Future Improvements

- Replace JSONPlaceholder with a real backend (Express + PostgreSQL or Supabase)
- Add JWT-based authentication with admin role protection
- Implement infinite scrolling as an alternative to pagination
- Add column visibility toggle for the table
- Export users to CSV
- Dark / light theme toggle
- Virtualized list rendering for very large datasets

---

## Unit Tests

Tests cover all core utility functions in `src/utils/helpers.js`:

```bash
npx vitest
```
✓ applySearch (4 tests)

✓ applyFilters (2 tests)

✓ applySorting (2 tests)

✓ paginateUsers (1 test)

✓ generateNextId (2 tests)
Tests: 11 passed

---

## Author

Ramya Renganathan  
[GitHub](https://github.com/RamyaRenganathan-2002)
