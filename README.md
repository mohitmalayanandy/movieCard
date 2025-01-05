# React.js Overview

## Introduction
React.js is a JavaScript library used for building user interfaces (UIs) and single-page applications (SPAs). It was created by Jordan Walke at Facebook and is currently one of the most popular JavaScript libraries for frontend development. The latest version is React.js v19.

---

## History
1. Initially created in 2011 as an internal tool for Facebook.
2. Open-sourced in 2013 by Jordan Walke and Tom Occhino at JSConf US.
3. Initially faced criticism for combining HTML and JavaScript (JSX).
4. Now widely adopted, with over 40 million developers using it worldwide.

---

## Prerequisites
1. **Node.js**: Required for managing JavaScript dependencies.
2. **Code Editor**: Recommended editor is Visual Studio Code (VS Code).
3. **React Extensions**: Install ES7 React/Redux/GraphQL Snippets for productivity.

---

## Ways to Create a React.js Project

### 1. Create-React-App (CRA)
- **Installation**:
  ```bash
  npx create-react-app project_name
  ```
- **Execution**:
  ```bash
  npm start
  ```

### 2. React + Vite (Faster Alternative)
- **Installation**:
  ```bash
  npm create vite@latest
  ```
- **Execution**:
  ```bash
  npm run dev
  ```

---

## File and Folder Structure

### 1. **node_modules**
- Contains all libraries and dependencies. Can be ignored during development.

### 2. **public**
- Contains static files like images, videos, and icons.

### 3. **index.html**
- Entry point for the React application in the web browser.

### 4. **src**
- Contains all the source code, including components, JavaScript, and CSS.

### 5. **.gitignore**
- Lists files/folders to exclude from version control and deployment.

### 6. **package.json**
- Contains project metadata, dependencies, scripts, and configurations.

### 7. **package-lock.json**
- Tracks dependencies of dependencies for consistent builds.

---

## Tools in React.js
1. **NPM**: Node Package Manager for global usage.
2. **NPX**: Executes packages locally, project-specific.

---

## Naming Conventions
1. **camelCase**: Used for variables, functions, and file names (e.g., `currentState`).
2. **PascalCase**: Used for component and class names (e.g., `CurrentState`).
3. **snake_case**: Rare in JavaScript, common in Python (e.g., `current_state`).
4. **kebab-case**: Used for file names, CSS classes, and IDs (e.g., `current-state`).

---

## JSX (JavaScript XML)
- Combines JavaScript and HTML syntax.
- **Key Rules**:
  1. JSX must have a single parent element.
  2. Use self-closing tags where applicable (`<img />`).

---

## React Components

### 1. Class-Based Components
- Traditional approach, less common now.
```javascript
import React, { Component } from 'react';

export class Welcome extends Component {
  render() {
    return <h1>Hello Raj</h1>;
  }
}
```

### 2. Functional Components
- Modern and recommended.
```javascript
export function Welcome() {
  return <h1>Hello Raj</h1>;
}
```

**Shortcuts:**
- **RAFCE**: React Arrow Functional Component.
- **RFCE**: React Functional Component.

---

## Fragments
- Return multiple elements without extra HTML nodes.
```javascript
import { Fragment } from 'react';

return (
  <Fragment>
    <p>Text 1</p>
    <p>Text 2</p>
  </Fragment>
);

// Or shorthand:
return (
  <>
    <p>Text 1</p>
    <p>Text 2</p>
  </>
);
```

---

## Dynamic Values in JSX
1. **Variables**: Embed using `{}`.
   ```javascript
   const value = "Hello";
   return <p>{value}</p>;
   ```
2. **Expressions**: Perform operations inside `{}`.
3. **Function Calls**: Call functions directly in JSX.

---

## Conditional Rendering
1. Using Ternary Operator:
   ```javascript
   return <p>{age >= 18 ? "Adult" : "Minor"}</p>;
   ```

2. Using Logical AND:
   ```javascript
   return <p>{age >= 18 && "Eligible to vote"}</p>;
   ```

3. Encapsulating logic in functions for complex cases.

---

## Import & Export

### 1. Default Export & Import
- A file can have one default export.
- Import using any name.
```javascript
export default MyComponent;
import MyComponent from './MyComponent';
```

### 2. Named Export & Import
- A file can have multiple named exports.
- Import using exact names in `{}`.
```javascript
export const ComponentA = () => {};
import { ComponentA } from './MyComponent';
```

### 3. Mixed Export & Import
- Use both default and named exports.
```javascript
export default MyComponent;
export const ComponentA = () => {};
import MyComponent, { ComponentA } from './MyComponent';
```

---

## Looping in JSX
- Use `.map()` for rendering lists.
```javascript
const students = ['Raj', 'Mohan', 'Sita'];

return (
  <ul>
    {students.map((student, index) => (
      <li key={index}>{student}</li>
    ))}
  </ul>
);
```

---

## Props
- Used for passing data from parent to child components.
- **Immutable**: Cannot be modified by the child.

---

## Styling in React
1. **Global CSS**: Styles applied in `index.css`.
2. **Component-specific CSS**: Use `App.css` or scoped CSS modules.
