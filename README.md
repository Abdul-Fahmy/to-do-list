## To-Do-List

This is a multi-user To-Do List application built with React and TypeScript, designed to help users manage their tasks efficiently. Each user can create multiple to-do lists, and each list contains its own set of tasks. The app supports user authentication and dynamic task management. It’s structured to be scalable and easy to maintain.

## Features

### Authentication

- User login with email and password
- Authentication using users.json
- "Remember Me" checkbox for persistent login

### Home Screen

- Display all to-do lists for the logged-in user
- Show percentage completion of each to-do list
- Create new to-do lists
- User badge with sign-out option
- Progress bar for list completion

### To-Do List View

- View tasks within a specific to-do list
- Add new tasks
- Edit task text
- Mark tasks as completed
- Delete tasks

### Keyboard Shortcuts

- **Ctrl/Cmd + N**: Add new task
- **Arrow Up/Down**: Navigate tasks
- **Space**: Mark task as complete
- **E or Enter**: Edit task
- **Delete**: Delete task

### Data Management

- Save to-do lists in browser storage (LocalStorage and SessionStorage)

### Tech Stack

- React
- TypeScript
- Tailwind CSS
- react-hot-toast
- react-router-dom

## Folder Structure

/src
/assets
/components
/data
/pages
/types
index.css
App.tsx
index.tsx

## Contributing

Contributions are welcome! Please open issues and submit pull requests.

## Contact

Abdulrahman Fahmy – @Abdul-Fahmy – abdelrhmanfahmy69@gmail.com

## License

This project is licensed under the MIT License – see the [LICENSE](./LICENSE) file for details.
