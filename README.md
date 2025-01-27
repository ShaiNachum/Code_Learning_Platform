# Code Learning Platform

A real-time collaborative coding platform designed to facilitate interactive learning between mentors and students. This platform enables mentors to guide students through coding exercises while providing immediate feedback and support.

## Features

### Real-time Collaboration
- Live code sharing between mentors and students
- Instant code synchronization across all participants
- Real-time presence indicators showing active mentors and students

### Interactive Learning Environment
- Pre-configured coding exercises with clear objectives
- Built-in solution validation
- Celebration animations upon successful completion
- Option to reveal solutions with confirmation dialog

### User Experience
- Syntax highlighting with CodeMirror editor
- Dracula theme for optimal code readability
- Responsive design that works across devices
- Clean and intuitive user interface with DaisyUI components

## Technology Stack

### Frontend
- **React 18.3** - Core UI framework
- **Vite 6.0** - Build tool and development server
- **React Router DOM 7.1** - Client-side routing
- **Zustand 5.0** - State management
- **Socket.IO Client 4.8** - Real-time communication
- **CodeMirror (@uiw/react-codemirror)** - Code editor component
- **TailwindCSS 3.4** - Utility-first CSS framework
- **DaisyUI 4.12** - Tailwind CSS component library

### Backend
- **Node.js with Express 4.21** - Server framework
- **Socket.IO 4.8** - WebSocket server implementation
- **MongoDB with Mongoose 8.9** - Database and ODM
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment configuration

## Project Structure

```
Code_Learning_Platform/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── lib/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
└── backend/
    ├── src/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── lib/
    │   └── index.js
    ├── .env
    └── package.json
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB
- npm or yarn


## Features in Detail

### Code Block Management
- Each code block contains:
  - Initial starter code
  - Solution code
  - Current working code
  - Title and description
  - Student count and mentor presence indicators

### Real-time Collaboration Features
- Mentors can observe student code in real-time
- Students receive immediate feedback on their progress
- Automatic solution validation
- Room-based collaboration system

### User Roles
- **Mentors**: Can observe multiple students, cannot modify code
- **Students**: Can edit code, receive real-time feedback

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the ISC License - see the LICENSE file for details.
