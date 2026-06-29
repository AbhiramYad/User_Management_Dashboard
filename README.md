# User Management Dashboard

A responsive, high-fidelity web application built with **React** and **Vanilla CSS** that interacts with a mock REST API (**JSONPlaceholder**) to view, add, edit, and delete user details. It features real-time search, multi-field column sorting, advanced filter controls, and customizable pagination.

---

## 🚀 Live Demo & Video Walkthrough

- **Deployed URL:** *(User to fill if deployed, otherwise ready for local preview)*
- **Loom/Walkthrough Video:** *(User to add link to recording)*

---

## 🛠️ Features

- **Responsive View Grid:** High-end glassmorphic UI displaying users in a tabular format on desktop screens, transitioning smoothly to individual detailed cards on mobile screen formats.
- **Real-Time Search:** Search bar that filters users instantly by matching input terms against First Name, Last Name, and Email attributes.
- **Column-based Sorting:** Clickable table headers to sort rows lexicographically in ascending/descending order based on First Name, Last Name, Email, or Department.
- **Advanced Filter Popup:** Custom absolute overlay menu with select controls to query users by specific attributes. Includes dismissible active filter tag badges.
- **Custom Pagination:** Bottom navigation panel supporting page size selections of `10`, `25`, `50`, or `100` elements with active/disabled state page selection routing.
- **Validated User Form (Add & Edit):** Entry form modal with client-side verification engine checking required name lengths and enforcing standard RFC 5322 email syntax rules.
- **Delete Confirmation:** safety double-check prompt blocking accidental deletion clicks.
- **Exception & Error Handling System:** Centralized loading shimmers, spinner submittals, and a toast banner notification system handling successful executions and connection faults.

---

## 🗺️ Project Directory Map

```text
user-management-dashboard/
│
├── public/
│    └── icons.svg             # SVG iconography
│
├── src/
│    ├── api/
│    │    └── userService.js    # Axios CRUD service layer
│    │
│    ├── components/
│    │    ├── ConfirmDelete.jsx # Verification delete overlay modal
│    │    ├── ErrorBanner.jsx   # Dissmissable warning and success toast notification banner
│    │    ├── FilterPopup.jsx   # Advanced dropdown filters panel
│    │    ├── Header.jsx        # Branding and user statistic panel
│    │    ├── Pagination.jsx    # Numeric page navigation and limit selectors
│    │    ├── SearchBar.jsx     # Text search input, active badges, and toggles
│    │    ├── UserForm.jsx      # Dynamic form modal matching ADD and EDIT lifecycles
│    │    ├── UserRow.jsx       # Individual table row templates and mobile card views
│    │    └── UserTable.jsx     # Main layout grid and headers
│    │
│    ├── utils/
│    │    ├── constants.js      # App wide constants (API endpoint, dept list)
│    │    ├── helpers.js        # Name splitting and department mock mappers
│    │    ├── helpers.test.js   # Unit testing suite for mapping functions
│    │    ├── validators.js     # Form field validations (email regex, required name lengths)
│    │    └── validators.test.js# Unit testing suite for input fields
│    │
│    ├── App.css               # Empty CSS boilerplate overrides
│    ├── App.jsx               # Centralized root state management and layout container
│    ├── index.css             # Design token stylesheet (colors, variables, styles)
│    └── main.jsx              # React mounting file
│
├── package.json
└── vite.config.js
```

---

## 📖 Engineering Assumptions

1. **First & Last Name Extraction:** The mock API (`JSONPlaceholder`) returns user entities with a single full name `name` field (e.g. `"Leanne Graham"`). To satisfy layout parameters:
   - Names are split on the first blank space.
   - Example: `"Ervin Howell Ledger"` resolves to First Name: `"Ervin"`, Last Name: `"Howell Ledger"`.
   - Single words (e.g. `"Clementina"`) resolve to First Name: `"Clementina"`, Last Name: `""`.
2. **Department Assignment:** JSONPlaceholder does not provide user department data. 
   - A mock list of standard departments (`Engineering`, `Product`, `Design`, `Marketing`, `Sales`, `HR`, `Finance`, `Operations`) is defined.
   - Upon initial fetch, departments are assigned deterministically to each record in a round-robin format using the array indices. This ensures layout consistency on reload.
3. **Simulated State Modification:** JSONPlaceholder is a read-only endpoint (CRUD actions are simulated but not persisted).
   - In additions (`POST`) and edits (`PUT`), state transformations are synced immediately into the local state array.
   - To prevent list duplicate key conflicts on mock appends (where the server returns ID `11` for every POST), a unique local ID is calculated (`Math.max(...ids) + 1`).

---

## 📦 Packages & Libraries Used

| Library | Purpose |
| --- | --- |
| **Vite** | Fast dev server and compilation environment |
| **React** | Component architectural layout and state hooks |
| **Axios** | Promised-based HTTP request lifecycle handling |
| **Vitest** | Highly responsive testing runner for assertion checks |

---

## 🚀 Setup & Installation Instructions

### Prerequisites
Make sure you have Node.js (version 18+) installed.

### Steps
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/AbhiramYad/User_Management_Dashboard.git
   cd User_Management_Dashboard
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Start Development Server:**
   ```bash
   npm run dev
   ```
   Open your browser to the local path displayed (usually `http://localhost:5173`).

4. **Run Unit Test Cases:**
   ```bash
   npm run test
   ```

5. **Build for Production:**
   ```bash
   npm run build
   ```

---

## 🧠 Challenges Faced & Resolutions

- **Duplicate Keys on Mock Additions:** The mock API endpoint generates ID `11` for every successful `POST` request. In React, rendering keys must be unique. Appending multiple users caused browser rendering issues.
  - *Resolution:* Calculated a local incrementing counter (`Math.max(id) + 1`) to assign unique, deterministic IDs for newly added users in local state.
- **Responsive Layout for Large Relational Data Tables:** Wide tables look squished or break layouts on narrow mobile screen sizes.
  - *Resolution:* Designed a CSS responsive overlay. On screens smaller than `768px`, the HTML table (`.table-container`) is hidden, and elements are rendered as glassmorphic grid cards (`.user-cards-grid`).
- **Single Page CRUD Errors vs Global Reload State:** Handling API errors during PUT/POST requests by replacing the main dashboard with a full-page error block ruins the user experience.
  - *Resolution:* Configured a non-blocking toast banner alert (`ErrorBanner`) that slides in, displays warnings or success notifications, and automatically dismisses itself after 5 seconds, keeping the dashboard visible.

---

## 🔮 Future Architectural Improvements

If given more time, the following features would be implemented:
- **Authentication & Roles:** Integrate JWT authorization (e.g. Firebase or Auth0) to limit CRUD write options to authorized administrators.
- **Database Integration:** Connect the React frontend to a custom Node/Express backend paired with MongoDB or PostgreSQL to persist data.
- **Query Debouncing:** Implement debouncing hooks for search queries to save network resource consumption during keypresses on large datasets.
- **Framer Motion Transitions:** Add smooth animations during table sorting changes, list additions, and modal toggles.
