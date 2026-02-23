# Mihai Cosmin Danaila - Personal Portfolio

This is a personal portfolio showcasing my career journey, skills, education, and projects as a Full-Stack Software Developer.

## Overview
Built to represent an intersection of modern design and robust software engineering, the site employs progressive disclosure logic ("Scrollytelling") to create an engaging experience. 

## Technology Stack
- **Framework**: React 19 + TypeScript
- **Tooling**: Vite for fast bundling and hot-module replacement
- **Styling**: Tailwind CSS 4 with custom variables / animations
- **Interactions**: Framer Motion for scroll-bound animations
- **Deployment**: Configured for GitHub Actions via `gh-pages`

## Getting Started

### Prerequisites
- Node.js installed

### Local Development
To run the portfolio locally:

```bash
# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

### Deployment
To build and deploy the project to GitHub Pages:

```bash
npm run deploy
```

This will run `tsc -b && vite build` and then automatically push the `dist` folder to the `gh-pages` branch.

## Data Source
The static text data for the portfolio (Career, Education, Projects, and the interactive About Section) is fully decoupled and driven by the `src/data/portfolio.json` file.
