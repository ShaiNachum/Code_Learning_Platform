# Code Learning Platform

A real-time collaborative code learning platform that enables students to practice coding while receiving guidance from mentors. The platform features live code synchronization, instant feedback, and a mentor-student interaction system.

## Features

- **Real-time Code Collaboration**: Students and mentors can work together in real-time using a shared code editor
- **Role-Based Access**: Distinct roles for mentors and students with appropriate permissions
- **Live Code Validation**: Automatic validation of code against predefined solutions
- **Interactive UI**: Modern, responsive interface with real-time updates
- **Success Celebration**: Visual feedback when students successfully complete challenges
- **Code Block Management**: Organized system for managing different coding challenges
- **User Count Tracking**: Live tracking of students and mentor presence in each session

## Tech Stack

### Frontend
- **React** (v18.3.1): Modern UI library for building interactive interfaces
- **Vite** (v6.0.5): Next-generation frontend tooling for faster development
- **React Router DOM** (v7.1.3): Client-side routing for single-page applications
- **Zustand** (v5.0.3): Lightweight state management solution
- **Socket.IO Client** (v4.8.1): Real-time bidirectional event-based communication
- **CodeMirror** (@uiw/react-codemirror v4.23.7): Advanced code editor component
- **TailwindCSS** (v3.4.13): Utility-first CSS framework
- **DaisyUI** (v4.12.23): Tailwind CSS component library

### Backend
- **Node.js**: JavaScript runtime environment
- **Express** (v4.21.2): Web application framework
- **MongoDB**: NoSQL database for storing code blocks and session data
- **Mongoose** (v8.9.5): MongoDB object modeling tool
- **Socket.IO** (v4.8.1): Real-time server-side event handling
- **Cors**: Cross-Origin Resource Sharing middleware
- **dotenv**: Environment variable management

## Project Structure

```
Code_Learning_Platform/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── lib/
│   │   └── assets/
│   ├── public/
│   └── package.json
└── backend/
    ├── src/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── lib/
    │   └── middleware/
    ├── .env
    └── package.json
```

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB installed and running locally
- npm or yarn package manager


## Usage

1. **Lobby**: Browse available code challenges from the main page
2. **Code Block**: Select a challenge to enter the coding environment
3. **Roles**:
   - First user to join becomes the mentor (read-only access)
   - Subsequent users join as students (can edit code)
4. **Real-time Collaboration**: 
   - Students can write and edit code
   - Mentors can observe and guide students
   - All participants see changes in real-time

## License

This project is licensed under the ISC License - see the LICENSE file for details.
