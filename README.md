# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


Testing the App (Manual Testing)
Since the app is built without external testing libraries, manual testing can be done using the following guidance:

✅ Add Task
Type a task (under 100 characters) in the input box and click "Add Todo".

Check that it appears in the task list.

❌ Add Invalid Task
Try adding an empty task → alert should show.

Try adding a task > 100 characters → alert should show.

✅ Mark as Complete / Incomplete
Click "Mark as Complete" → task should turn green with strikethrough.

Click again → should revert to incomplete.

✅ Delete Task
Click "Delete" → the corresponding task should be removed.

✅ Sort Tasks
Click “Sort: Recent First / Oldest First” → observe the task order change.

✅ Filter Tasks
Click "Completed Tasks" → only completed tasks show.

Click "Incomplete Tasks" → only incomplete tasks show.

Click "All Tasks" → all tasks are shown.

✅ Local Storage Toggle
Click "Disable Storage" → localStorage is cleared.

Add tasks → reload → tasks will not persist.

Click "Enable Storage" → new tasks are saved.

Reload → tasks remain intact.

Tech Stack
React

Vite

Tailwind CSS (for styling)

LocalStorage API (for persistence)

Note
This app was built as part of an internship assignment with focus on:

React state management

Custom validation logic

Clean, responsive UI without third-party form libraries
