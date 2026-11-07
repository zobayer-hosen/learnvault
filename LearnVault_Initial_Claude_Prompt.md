# Project: LearnVault — Learning Resource Management Platform

Act as a Senior Full-Stack Developer, UI/UX Designer, and Software Architect.

I want to build a modern, premium, and scalable web application named **LearnVault**.

**Tagline:** Your Knowledge, One Place.

## 1. Project Overview

LearnVault is a centralized learning resource platform where users can discover, organize, save, and access learning materials from different technology and educational domains.

The main goal is to create one organized place for learning resources instead of searching across multiple websites and platforms.

Initially, focus on Software Engineering and Technology learning resources.

## 2. Technology Stack

Use the following technologies:

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Modern reusable React components
- Lucide React for icons
- PostgreSQL (database integration can be planned for the next phase)
- Proper form validation with Zod
- Clean and scalable project architecture

Use the latest stable compatible versions of these technologies.

## 3. Claude Skills — Mandatory

Before starting development:

1. Check all available Claude Code skills and installed plugins.
2. Identify relevant skills for:
   - Next.js development
   - React and TypeScript
   - Frontend architecture
   - UI/UX design
   - Tailwind CSS
   - Accessibility
   - Responsive web design
   - Code quality and optimization
3. Use relevant available skills throughout the development process.
4. If a required skill is unavailable, do not pretend it is installed. Explain what is missing and continue using established best practices.
5. If useful skills are available in the project, follow their instructions before writing code.

Also inspect the existing project structure before making changes. Do not overwrite or delete existing work without understanding it.

## 4. Main Features

### A. Dashboard

- Overview of learning resources.
- Recently added resources.
- Popular resources.
- Featured learning paths.
- Resource categories.
- Quick access to saved resources.

### B. Learning Categories

Create organized categories such as:

- Programming Languages
- Frontend Development
- Backend Development
- Database Management
- DevOps & Cloud
- AI & Machine Learning
- Cybersecurity
- System Design
- Computer Science Fundamentals
- Software Engineering
- Tools & Technologies

Each category should support subcategories.

### C. Resource Management

Each learning resource should support:

- Resource title
- Short description
- Thumbnail or cover image
- Resource URL
- Category and subcategory
- Resource type
- Difficulty level (Beginner, Intermediate, Advanced)
- Tags
- Author or source
- Date added

Resource types can include:

- Documentation
- Official Guides
- Courses
- Tutorials
- Articles
- YouTube Videos
- GitHub Repositories
- Books
- Roadmaps
- Tools

### D. Search and Filtering

Implement a powerful resource discovery experience:

- Search by title and description.
- Filter by category.
- Filter by resource type.
- Filter by difficulty.
- Filter by tags.
- Sort by newest and most popular.

### E. Resource Details

Every resource should have a dedicated detail page containing its information, tags, category, difficulty, and an external link to the original resource.

### F. Saved Resources

Design a bookmark/favorites feature so users can save useful resources for later.

### G. Learning Paths

Create structured learning paths, for example:

- Complete Web Development Roadmap
- Full-Stack Development
- Backend Engineering
- DevOps Engineering
- AI/ML Engineering
- Database Engineering

Each learning path should contain an ordered list of resources and learning steps.

## 5. UI/UX Design Direction

I want LearnVault to look like a premium SaaS product mixed with a modern documentation and knowledge-management platform.

Design principles:

- Minimal and clean interface.
- Professional typography.
- Consistent spacing.
- Excellent visual hierarchy.
- Smooth micro-interactions.
- Subtle animations.
- Responsive layouts.
- Modern cards and navigation.
- Beautiful empty states.
- Proper loading states.
- Accessible color contrast.

Avoid:

- Generic AI-generated dashboard designs.
- Excessive gradients.
- Too many colors.
- Unnecessary animations.
- Overcrowded layouts.
- Unnecessary components.

Create a consistent design system with reusable colors, typography, spacing, buttons, cards, badges, and input components.

## 6. Initial Pages

Build these pages initially:

1. `/` — Home / Dashboard
2. `/explore` — Browse all learning resources
3. `/categories` — All categories
4. `/categories/[slug]` — Category details
5. `/resources/[slug]` — Resource details
6. `/learning-paths` — Learning paths
7. `/learning-paths/[slug]` — Learning path details
8. `/bookmarks` — Saved resources
9. `/about` — About LearnVault

## 7. Project Architecture

Follow a modular and maintainable architecture.

Requirements:

- Use reusable components.
- Keep business logic separate from UI components.
- Use TypeScript types and interfaces.
- Avoid unnecessary code duplication.
- Use clear naming conventions.
- Keep components small and focused.
- Use proper error handling.
- Follow Next.js best practices.
- Avoid unnecessary client components.
- Prefer Server Components where possible.
- Use mock data initially, but structure it so that a real API and database can be integrated later.

## 8. Development Approach

Do not try to build everything in one huge component.

Follow these steps:

### Phase 1 — Project Analysis

- Inspect the existing repository.
- Check installed dependencies.
- Review available Claude skills.
- Identify missing dependencies.

### Phase 2 — Foundation

- Set up the project structure.
- Configure the design system.
- Create the global layout.
- Build the navigation and responsive sidebar/header.

### Phase 3 — Core UI

- Build the dashboard.
- Build resource cards.
- Build category pages.
- Build the explore page.
- Build resource details.

### Phase 4 — Learning Features

- Build learning paths.
- Build bookmarks.
- Implement search and filtering using mock data.

### Phase 5 — Quality

- Check responsive behavior.
- Check accessibility.
- Fix TypeScript errors.
- Fix build errors.
- Optimize performance.
- Remove unused code.

## 9. Important Development Rules

- Do not add unnecessary dependencies.
- Do not use placeholder sections without a clear purpose.
- Do not generate fake external URLs and present them as real resources.
- Use clearly identified sample data for the initial UI.
- Do not implement authentication or database integration in this first phase.
- Keep the project ready for future authentication, API, and PostgreSQL integration.
- Do not sacrifice code quality for visual appearance.
- Do not change existing project configurations without a reason.

## 10. First Task

Start by analyzing the project and available Claude skills.

Then propose:

1. Recommended project architecture.
2. Required dependencies.
3. Design system and color palette.
4. Main dashboard layout.
5. Development implementation plan.

After presenting the plan, start implementing the project step by step.

The final result should feel like a real, production-quality learning platform — not a basic student project.

**Project Name:** LearnVault  
**Tagline:** Your Knowledge, One Place.
