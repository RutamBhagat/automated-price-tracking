# FireCrawl - Automated Amazon Price Tracking

Every time you choose to apply a rule(s), explicitly state the rule(s) in the output. You can abbreviate the rule description to a single word or phrase.

## Project Context

FireCrawl is an automated price tracking system for Amazon products that:

- Scrapes and monitors Amazon product prices automatically
- Notifies users when prices drop below their target
- Provides historical price tracking and analysis
- Features a modern web interface for managing tracked products
- Implements automated background price checking

## Code Style and Structure

- Write clean, maintainable Python code for the backend
- Use modern React/Next.js patterns for the frontend
- Implement proper error handling for web scraping
- Use descriptive variable names
- Structure repository files as follows:

```
.
├── .github
│   ├── .copilot-instructions.md
│   ├── blog.md
│   ├── firecrawl.md
│   ├── motion-ui.md
│   └── workflows
│       └── check_prices.yml
├── .vscode
│   └── settings.json
├── backend
│   ├── .env.example
│   ├── .gitignore
│   ├── .python-version
│   ├── .ruff_cache
│   ├── README.md
│   ├── pyproject.toml
│   ├── requirements.txt
│   ├── src
│   │   ├── __pycache__
│   │   ├── check_prices.py
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── notifications.py
│   │   ├── output.json
│   │   ├── scraper.py
│   │   ├── ui.py
│   │   └── utils.py
│   └── uv.lock
├── cursor
│   └── cursorrules.md
├── frontend
│   ├── .env.example
│   ├── .gitignore
│   ├── README.md
│   ├── bun.lockb
│   ├── components.json
│   ├── eslint.json
│   ├── next.config.js
│   ├── package.json
│   ├── postcss.config.js
│   ├── prettier.config.js
│   ├── prisma
│   │   └── schema.prisma
│   ├── public
│   │   ├── 1.jpg
│   │   ├── 2.jpg
│   │   ├── 3.jpg
│   │   ├── favicon.ico
│   │   ├── google.svg
│   │   ├── placeholder_testimonial.png
│   │   └── price-drop.jpg
│   ├── src
│   │   ├── app
│   │   │   ├── api
│   │   │   │   ├── auth
│   │   │   │   │   └── [...nextauth]
│   │   │   │   │       └── route.ts
│   │   │   │   └── v1
│   │   │   │       └── products
│   │   │   │           ├── delete
│   │   │   │           │   └── route.ts
│   │   │   │           ├── details
│   │   │   │           │   └── route.ts
│   │   │   │           ├── price-history
│   │   │   │           │   └── route.ts
│   │   │   │           ├── route.ts
│   │   │   │           ├── scraper
│   │   │   │           │   ├── index.ts
│   │   │   │           │   └── types.ts
│   │   │   │           ├── services
│   │   │   │           │   ├── index.ts
│   │   │   │           │   └── types.ts
│   │   │   │           └── types.ts
│   │   │   ├── dashboard
│   │   │   │   └── page.tsx
│   │   │   ├── layout.tsx
│   │   │   ├── login
│   │   │   │   └── page.tsx
│   │   │   └── page.tsx
│   │   ├── components
│   │   │   ├── landing-page
│   │   │   │   ├── animated-gradient-stats.tsx
│   │   │   │   ├── footer.tsx
│   │   │   │   └── hero-with-images.tsx
│   │   │   ├── login-page
│   │   │   │   └── google-button.tsx
│   │   │   ├── navbar.tsx
│   │   │   ├── providers.tsx
│   │   │   └── ui
│   │   │       ├── animated-gradient-with-svg.tsx
│   │   │       ├── animated-number.tsx
│   │   │       ├── badge.tsx
│   │   │       ├── border-trail.tsx
│   │   │       ├── button.tsx
│   │   │       ├── card.tsx
│   │   │       ├── in-view.tsx
│   │   │       ├── lamp.tsx
│   │   │       ├── sheet.tsx
│   │   │       ├── sonner.tsx
│   │   │       ├── text-effect.tsx
│   │   │       └── text-shimmer.tsx
│   │   ├── env.js
│   │   ├── hooks
│   │   │   └── use-debounced-dimensions.tsx
│   │   ├── lib
│   │   │   └── utils.ts
│   │   ├── middleware.ts
│   │   ├── server
│   │   │   ├── auth
│   │   │   │   ├── config.ts
│   │   │   │   └── index.ts
│   │   │   └── db.ts
│   │   └── styles
│   │       └── globals.css
│   ├── start-database.sh
│   ├── tailwind.config.ts
│   └── tsconfig.json
└── public
    └── google.svg

36 directories, 84 files
```

## Tech Stack

- Python (Backend)
- Next.js 14 (Frontend)
- PostgreSQL (Database)
- Prisma (ORM)
- Tailwind CSS
- NextAuth.js
- Beautiful Soup (Web Scraping)

## Naming Conventions

- Use snake_case for Python files and functions
- Use camelCase for JavaScript/TypeScript
- Use PascalCase for React components
- Use descriptive names for scraping functions

## Python Backend

- Use type hints for all functions
- Implement proper error handling for scraping
- Use async functions for concurrent price checks
- Implement proper rate limiting for Amazon requests
- Use environment variables for configuration
- Follow PEP 8 style guidelines

## Frontend Development

- Use TypeScript for type safety
- Implement proper loading states
- Show meaningful error messages
- Use proper form validation
- Implement responsive design
- Use Tailwind for styling

## State Management

- Use React Context where needed
- Implement proper data caching
- Handle loading and error states
- Implement proper form state management

## Database Management

- Use Prisma migrations
- Implement proper indexing
- Handle concurrent operations
- Implement proper data validation
- Use transactions where necessary

## Error Handling

- Implement proper scraping error handling
- Log errors appropriately
- Provide user-friendly error messages
- Handle network failures gracefully
- Implement retry mechanisms for failed scrapes

## Testing

- Write unit tests for scraping logic
- Test price tracking accuracy
- Implement API endpoint tests
- Test notification system
- Monitor scraping reliability

## Security

- Implement proper authentication
- Sanitize scraped data
- Rate limit API endpoints
- Handle user data securely
- Implement proper CORS policies

## Git Usage

Commit Message Prefixes:

- "fix:" for bug fixes
- "feat:" for new features
- "scraper:" for scraping logic changes
- "ui:" for frontend changes
- "db:" for database changes
- "test:" for adding tests
- "docs:" for documentation

Rules:

- Use descriptive commit messages
- Reference issues when applicable
- Keep commits focused and atomic

## Documentation

- Maintain clear setup instructions
- Document scraping logic
- Document API endpoints
- Keep configuration examples updated
- Document price tracking logic

## Development Workflow

- Use proper version control
- Test scraping thoroughly
- Monitor scraping performance
- Follow semantic versioning
- Maintain changelog
