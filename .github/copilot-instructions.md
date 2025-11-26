# Copilot Instructions for 1dxrkk.github.io

## Project Overview
This is a Vite-based React project using TypeScript. The main application code is in `1dxrkk.github.io/`, with source files under `src/`. The project is organized by feature and UI component type.

## Key Structure
- **src/components/**: UI components, split into `gui` (general UI) and `ui` (atomic UI elements like buttons, modals)
- **src/pages/**: Top-level pages, e.g., `home/`
- **src/context/**: React context providers (if present)
- **src/types/**: TypeScript type definitions
- **src/css/**: CSS modules for global and component styles
- **vite.config.ts**: Vite configuration
- **tsconfig*.json**: TypeScript configuration

## Developer Workflows
- **Install dependencies:**
  ```bash
  npm install
  ```
- **Start dev server:**
  ```bash
  npm run dev
  ```
- **Build for production:**
  ```bash
  npm run build
  ```
- **Preview production build:**
  ```bash
  npm run preview
  ```

## Patterns & Conventions
- **Component Structure:**
  - Use folder-per-component (e.g., `button/`, `modal/`)
  - CSS files are colocated with components
  - Prefer functional components and hooks
- **TypeScript:**
  - Types are defined in `src/types/`
  - Use explicit types for props and state
- **Styling:**
  - Use CSS modules for component styles
  - Global styles in `src/css/`
- **Imports:**
  - Use relative imports within `src/`

## Integration Points
- No backend integration is present by default
- Add API clients or context providers in `src/context/` as needed

## Examples
- See `src/components/ui/button/` for atomic component pattern
- See `src/pages/home/` for page-level structure

## Additional Notes
- Keep new components and pages consistent with existing folder and naming conventions
- Update TypeScript types in `src/types/` when introducing new data models

---
For questions or unclear patterns, review existing components or ask for clarification.




please add account functionality and context to the project, including login, logout, and user profile management. Ensure secure handling of user data and authentication states. 