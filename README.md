# CareNow - Healthcare Management System

## Project Overview
CareNow is a comprehensive healthcare management system that connects patients with doctors and administrators. The project is built using React for the frontend and Node.js for the backend, with separate portals for patients, doctors, and administrators.

## Project Structure
```
CareNow/
├── admin/          # Admin portal
├── client/         # Patient portal
├── doctor/         # Doctor portal
└── server/         # Backend API
```

## Features

### Patient Portal
- User authentication (Email & Google Sign-in)
- Book appointments
- View medical history
- Read health blogs
- Profile management

### Doctor Portal
- Manage appointments
- View patient records
- Update availability
- Profile management

### Admin Portal
- Doctor management
- Patient oversight
- System statistics
- Emergency contact management
- User verification

## Tech Stack

### Frontend
- React.js
- Redux Toolkit (State Management)
- React Router DOM
- Axios
- Tailwind CSS
- Shadcn UI Components

### Backend
- Node.js
- Express.js
- MongoDB
- Passport.js (Authentication)
- Cloudinary (Image Storage)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/CareNow.git
```

2. Install dependencies for all services
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Install admin dependencies
cd ../admin
npm install

# Install doctor portal dependencies
cd ../doctor
npm install
```

3. Environment Setup
Create `.env` files in server and client directories with necessary configurations:

```env
# Server .env
PORT=8000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

4. Start the development servers
```bash
# Start backend server
cd server
npm run dev

# Start client application
cd client
npm run dev

# Start admin portal
cd admin
npm run dev

# Start doctor portal
cd doctor
npm run dev
```

## Project Status
🚀 In Development

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
