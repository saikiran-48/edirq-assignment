# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community


---

# Project Documentation

## Overview

This project is a modern React Native application, leveraging Expo for rapid development and Tailwind CSS for utility-first styling. The codebase is organized for scalability, maintainability, and ease of collaboration.

---

## Folder Structure

```
.
├── app.json
├── eslint.config.js
├── expo-env.d.ts
├── global.css
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.json
├── app/
│   ├── _layout.tsx
│   ├── modal.tsx
│   └── (tabs)/
│       ├── _layout.tsx
│       ├── add.tsx
│       ├── index.tsx
│       ├── message.tsx
│       ├── profile.tsx
│       ├── search.tsx
├── assets/
│   ├── plusButton.tsx
│   └── images/
├── components/
│   ├── external-link.tsx
│   ├── haptic-tab.tsx
│   ├── hello-wave.tsx
│   ├── parallax-scroll-view.tsx
│   ├── themed-text.tsx
│   ├── themed-view.tsx
│   └── ui/
│       ├── collapsible.tsx
│       ├── icon-symbol.ios.tsx
│       └── icon-symbol.tsx
├── constants/
│   ├── colors.ts
│   ├── data.ts
│   └── theme.ts
├── hooks/
│   ├── use-color-scheme.ts
│   ├── use-color-scheme.web.ts
│   └── use-theme-color.ts
├── scripts/
│   └── reset-project.js
```

### Key Folders

- **app/**  
   Contains the main application logic and screens.  
   - `_layout.tsx`: Root layout for navigation.
   - `modal.tsx`: Modal screen logic.
   - `(tabs)/`: Tabbed navigation screens (add, index, message, profile, search).

- **assets/**  
   Static assets such as images and icons.  
   - `plusButton.tsx`: Custom icon component.
   - `images/`: Image resources.

- **components/**  
   Reusable UI components.  
   - `external-link.tsx`, `haptic-tab.tsx`, etc.: Custom components for interactivity and UI.
   - `ui/`: Specialized UI elements (collapsible, icons).

- **constants/**  
   Centralized configuration for colors, data, and themes.

- **hooks/**  
   Custom React hooks for color scheme and theming.

- **scripts/**  
   Utility scripts for project maintenance.

---

## Design Aspects

### 1. Modular Architecture

- **Separation of Concerns:**  
   Screens, components, hooks, and constants are separated for clarity and reusability.

- **Scalability:**  
   The structure supports easy addition of new screens, components, and features.

### 2. Navigation

- **Tab Navigation:**  
   The `(tabs)` folder implements a tabbed interface, enhancing user experience and accessibility.

- **Layout Components:**  
   `_layout.tsx` files manage navigation structure, ensuring consistent UI across screens.

### 3. Styling

- **Tailwind CSS:**  
   Utility-first CSS framework for rapid, consistent styling.  
   - `global.css`, `tailwind.config.js`, and `postcss.config.js` configure styling.

- **Theming:**  
   Theme and color management via hooks and constants for light/dark mode support.

### 4. Reusability

- **Component Library:**  
   The `components/` folder provides reusable building blocks, reducing code duplication.

- **Hooks:**  
   Custom hooks encapsulate logic for color schemes and theming, promoting DRY principles.

### 5. Type Safety

- **TypeScript:**  
   The project uses TypeScript (`tsconfig.json`, `.ts` files) for type safety and better developer experience.

### 6. Code Quality

- **Linting:**  
   ESLint configuration (`eslint.config.js`) enforces code standards.

- **Scripts:**  
   Utility scripts (e.g., `reset-project.js`) streamline development workflows.

---

## Summary

This project demonstrates best practices in React Native development, with a clear folder structure, modular design, reusable components, and robust theming. The use of TypeScript, Tailwind CSS, and custom hooks ensures maintainability and scalability, making it an excellent foundation for commercial or academic applications.

---

If you need a more detailed explanation for any specific folder or file, let me know!
