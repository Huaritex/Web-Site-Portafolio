# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Portfolio_Huaritex** is a personal portfolio project. Update this section once the project direction is established (e.g., "A web-based portfolio showcasing full-stack projects," "A Next.js portfolio with 3D components," etc.).

## Development Setup

Once you initialize the project, add the following sections:

### Build Commands
```bash
# Add your project's build commands here
# Example for Next.js:
# npm run dev          # Start development server
# npm run build        # Build for production
# npm run start        # Run production build
```

### Testing
```bash
# Add your test commands here
# Example:
# npm test             # Run all tests
# npm test -- --watch # Run tests in watch mode
# npm run test:e2e     # Run E2E tests
```

### Linting & Formatting
```bash
# Add your linting/formatting commands here
# Example:
# npm run lint         # Run ESLint
# npm run format       # Run Prettier
# npm run type-check   # Run TypeScript type checking
```

## Architecture Overview

Update this section with high-level architecture decisions. Include:

- **Tech Stack**: What frameworks, libraries, and tools are used?
- **Project Structure**: How are the main directories organized? (e.g., `/src/components`, `/src/pages`, `/src/utils`)
- **Key Architectural Patterns**: Any significant patterns or design decisions (e.g., component composition patterns, state management approach, API integration strategy)
- **Data Flow**: How does data move through the application? (e.g., React hooks → API → Database)

## Development Workflow

When developing features in this repository:

1. **Research & Planning**: Before implementing, search for existing patterns in the codebase or relevant libraries
2. **Test First**: Write tests before implementing new features (see [global rules](~/.claude/rules/common/testing.md))
3. **Code Review**: After implementation, request a code review using appropriate agents
4. **Git Workflow**: Follow conventional commits format per [global rules](~/.claude/rules/common/git-workflow.md)

## Common Patterns in This Project

Document patterns you establish:

- Component organization and naming conventions
- How to structure API endpoints or data fetching
- Common utility functions or helpers
- State management patterns
- Testing approach

## Global Rules

This project adheres to global rules defined in `~/.claude/rules/`:

- **Web-specific**: `/web/` (coding style, performance, testing, security)
- **Common**: `/common/` (git workflow, testing requirements, code review standards)

Key requirements:
- **Test coverage**: Minimum 80%
- **Code quality**: Functions < 50 lines, files < 800 lines
- **Security**: Validate user input, no hardcoded secrets, use environment variables
- **Performance**: Monitor Core Web Vitals, follow bundle budgets per [rules/web/performance.md](~/.claude/rules/web/performance.md)

## Key Files & Configuration

Update as project grows:

- `package.json` — Project dependencies and scripts
- `.env.example` — Environment variables template (update when adding new ones)
- `tsconfig.json` / `.eslintrc` — Language and linting configuration
- `.gitignore` — Version control exclusions

## Future Considerations

- [ ] Define deployment strategy (Vercel, GitHub Pages, Docker, etc.)
- [ ] Set up CI/CD pipeline (.github/workflows)
- [ ] Document API endpoints (if building a backend)
- [ ] Establish design system or component library structure
- [ ] Plan for monitoring/analytics

---

**Last Updated**: [Date the structure was established]
