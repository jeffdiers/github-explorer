# GitHub Repository Explorer

This project is a simple React + Next.js application that allows users to search for repositories by entering a GitHub username or organization. The results are displayed in a paginated, sortable table.

Author: [Jeff Diers](https://github.com/jeffdiers)

---

### Features

- Search for GitHub repositories by entering a username or organization.
- Fast search - ths search state is stored in the url and fetched on the server.
- Pagination to navigate through repository results.
- Sorting by repository fields.
- Clean and responsive UI components built with shadcn/ui

---

### Tech Stack

- React
- Next.js
- TypeScript
- shadcn/ui (Tailwind + Radix)

---

### Getting Started

##### Prerequisites

- Node.js
- npm

##### Installation

```bash
git clone https://github.com/jeffdiers/github-explorer.git
cd github-explorer
npm install
npm run dev
```

visiit http://localhost:3000

---

### Future Improvements

- Search Filters for more precise results
- Improved error handeling with user-friendly messages
- Improved loading state using skeletons
- Dev tools like ESLint, Prettier, Git Hooks
- Visual testing with Chromatic
- Storybook for component library
