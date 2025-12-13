# Mobile Recharge Web Application

A modern React-based mobile recharge application built with Vite, featuring user authentication, recharge plans, and responsive design.

## 🚀 Features

- **User Authentication**: Login/Register with form validation
- **Mobile Recharge**: Browse and select recharge plans
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Modern UI**: Styled with Tailwind CSS and Framer Motion animations
- **Form Validation**: React Hook Form with Yup validation
- **State Management**: Context API for global state
- **Routing**: React Router v6 for navigation

## 🛠️ Technologies Used

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **Forms**: React Hook Form + Yup
- **State**: Context API + useState
- **Icons**: React Icons

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.js
│   ├── Footer.js
│   ├── Navbar.jsx
│   └── Sidebar.jsx
├── pages/
│   ├── HomePage.js
│   ├── LoginPage.js
│   ├── RegisterPage.js
│   └── Dashboard.js
├── context/
│   └── AuthContext.js
├── styles/
│   ├── App.css
│   └── index.css
├── App.js
└── index.js
```

## 🎯 Assignment Requirements Completed

### Day 6: React Project Setup & Component Architecture
- ✅ Set up React project using Vite
- ✅ Created reusable components (Navbar, Footer, Sidebar)
- ✅ Implemented functional components with JSX
- ✅ Proper folder structuring

### Day 7: Tailwind CSS & State Management
- ✅ Integrated Tailwind CSS for styling
- ✅ Used props for dynamic components
- ✅ Implemented useState for interactivity
- ✅ Context API for global state management

### Day 8: React Routing & Authentication
- ✅ React Router v6 implementation
- ✅ Landing Page, Login, Signup pages
- ✅ Navigation with proper routing
- ✅ Authentication state management

### Day 9: Form Handling & Validation
- ✅ React Hook Form integration
- ✅ Yup validation schemas
- ✅ Form validation on Login/Register pages
- ✅ Error handling and user feedback

### Day 10: Final Frontend Completion
- ✅ Responsive design for all devices
- ✅ Complete user flow from landing to dashboard
- ✅ Smooth animations and transitions
- ✅ Loading states and user feedback

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/SECE-24-28/classroom-project-[your-repo]
   cd mobile-recharge-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📱 Core React Concepts Demonstrated

### JSX
JSX allows us to write HTML-like syntax in JavaScript, making component creation intuitive and readable.

### Virtual DOM
React's Virtual DOM efficiently updates only changed elements, improving performance compared to direct DOM manipulation.

### Functional Components
Modern React uses functional components with hooks, providing cleaner code and better performance than class components.

### Props & State
Props pass data between components while state manages component-specific data that can change over time.

### Component Hierarchy
Components are organized in a tree structure where parent components pass data to children through props.

### Folder Structuring
Organized code structure with separate folders for components, pages, context, and styles improves maintainability.

## 🎨 UI/UX Features

- Modern gradient backgrounds with transparency
- Smooth animations using Framer Motion
- Responsive grid layouts
- Interactive hover effects
- Form validation with real-time feedback
- Loading states and error handling

## 🔐 Authentication Flow

1. User visits landing page
2. Can register for new account or login
3. Form validation ensures data integrity
4. Successful authentication redirects to dashboard
5. Context API maintains login state across app

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

This project was created as part of the React learning curriculum. Feel free to explore the code and suggest improvements.

## 📄 License

This project is created for educational purposes.