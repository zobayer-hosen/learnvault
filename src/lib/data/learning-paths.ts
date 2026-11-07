import type { LearningPath } from "@/types";

/**
 * SAMPLE DATA — curated learning paths built from the starter catalog.
 * Durations are suggested paces, not guarantees.
 */
export const learningPaths: LearningPath[] = [
  {
    slug: "complete-web-development",
    title: "Complete Web Development Roadmap",
    summary: "From your first line of HTML to shipping a modern React application.",
    description:
      "A structured route through the foundations of the web: the languages browsers speak, how to style and lay out interfaces, how to build with a modern framework, and how to make it accessible to everyone.",
    difficulty: "beginner",
    duration: "12–16 weeks",
    outcomes: [
      "Write modern JavaScript and TypeScript with confidence",
      "Build responsive layouts with modern CSS",
      "Create component-driven apps with React and Next.js",
      "Apply accessibility fundamentals from day one",
    ],
    featured: true,
    steps: [
      {
        title: "Get the big picture",
        description: "Understand what a frontend developer learns and in what order.",
        resourceSlugs: ["frontend-roadmap"],
      },
      {
        title: "Learn JavaScript properly",
        description: "Build a solid grasp of the language before reaching for frameworks.",
        resourceSlugs: ["mdn-javascript-guide", "eloquent-javascript"],
      },
      {
        title: "Master CSS layout",
        description: "Learn the box model, flexbox, grid, and how the cascade really works.",
        resourceSlugs: ["web-dev-learn-css", "tailwind-docs"],
      },
      {
        title: "Add types with TypeScript",
        description: "Catch mistakes earlier and make larger codebases easier to change.",
        resourceSlugs: ["typescript-handbook"],
      },
      {
        title: "Build with React and Next.js",
        description: "Think in components, manage state, and render on the server.",
        resourceSlugs: ["react-learn", "nextjs-docs"],
      },
      {
        title: "Make it accessible",
        description: "Ensure everything you build works for keyboard and screen reader users.",
        resourceSlugs: ["mdn-accessibility"],
      },
    ],
  },
  {
    slug: "full-stack-development",
    title: "Full-Stack Development",
    summary: "Connect polished frontends to reliable APIs and a real database.",
    description:
      "Combine frontend and backend skills into a single workflow: build typed UIs, design APIs, model data in PostgreSQL, containerize the result, and ship it with confidence.",
    difficulty: "intermediate",
    duration: "14–18 weeks",
    outcomes: [
      "Build a typed React frontend backed by your own API",
      "Design relational schemas and write efficient SQL",
      "Containerize and deploy a full-stack application",
      "Follow twelve-factor principles for portable apps",
    ],
    featured: true,
    steps: [
      {
        title: "Frontend foundations",
        description: "React and TypeScript as the base of your UI layer.",
        resourceSlugs: ["react-learn", "typescript-handbook"],
      },
      {
        title: "Server-side runtime",
        description: "Learn how Node.js runs JavaScript on the server.",
        resourceSlugs: ["nodejs-learn"],
      },
      {
        title: "Full-stack framework",
        description: "Use Next.js to unify routing, rendering, and data fetching.",
        resourceSlugs: ["nextjs-docs"],
      },
      {
        title: "Relational data",
        description: "Learn SQL, then go deep on PostgreSQL.",
        resourceSlugs: ["sqlbolt", "postgresql-docs"],
      },
      {
        title: "Ship it",
        description: "Package your app consistently and follow deployment best practices.",
        resourceSlugs: ["docker-get-started", "twelve-factor-app"],
      },
    ],
  },
  {
    slug: "backend-engineering",
    title: "Backend Engineering",
    summary: "Design APIs, model data, and build services that stay up under load.",
    description:
      "Learn to build robust server-side systems: pick a backend stack, design APIs, work with relational and in-memory stores, secure your services, and reason about scale.",
    difficulty: "intermediate",
    duration: "12–16 weeks",
    outcomes: [
      "Build production-grade REST APIs",
      "Use caching and indexing to improve performance",
      "Defend against the most common web vulnerabilities",
      "Reason about scalability trade-offs",
    ],
    steps: [
      {
        title: "Chart the territory",
        description: "Survey the skills that backend engineers rely on.",
        resourceSlugs: ["backend-roadmap"],
      },
      {
        title: "Build an API",
        description: "Use a modern, typed framework to build your first service.",
        resourceSlugs: ["fastapi-tutorial", "spring-guides"],
      },
      {
        title: "Data and performance",
        description: "Understand how databases use indexes, and when to add a cache.",
        resourceSlugs: ["use-the-index-luke", "redis-docs"],
      },
      {
        title: "Secure your services",
        description: "Learn the most critical risks and how to prevent them.",
        resourceSlugs: ["owasp-top-ten", "owasp-cheat-sheets"],
      },
      {
        title: "Design for scale",
        description: "Study the building blocks of large-scale systems.",
        resourceSlugs: ["system-design-primer"],
      },
    ],
  },
  {
    slug: "devops-engineering",
    title: "DevOps Engineering",
    summary: "Automate everything from commit to production.",
    description:
      "Bridge development and operations: containerize applications, orchestrate them at scale, automate delivery pipelines, and manage infrastructure as code.",
    difficulty: "intermediate",
    duration: "10–14 weeks",
    outcomes: [
      "Containerize services and run them with Kubernetes",
      "Build CI/CD pipelines that test and deploy automatically",
      "Provision cloud infrastructure as code",
    ],
    featured: true,
    steps: [
      {
        title: "Know the landscape",
        description: "See how DevOps skills fit together.",
        resourceSlugs: ["devops-roadmap"],
      },
      {
        title: "Command-line fluency",
        description: "Get comfortable with the shell and version control.",
        resourceSlugs: ["missing-semester", "pro-git"],
      },
      {
        title: "Containers",
        description: "Package applications into portable images.",
        resourceSlugs: ["docker-get-started"],
      },
      {
        title: "Orchestration",
        description: "Run and scale containers across a cluster.",
        resourceSlugs: ["kubernetes-docs"],
      },
      {
        title: "Automation and infrastructure",
        description: "Automate pipelines and manage infrastructure declaratively.",
        resourceSlugs: ["github-actions-docs", "terraform-tutorials"],
      },
    ],
  },
  {
    slug: "ai-ml-engineering",
    title: "AI/ML Engineering",
    summary: "Go from intuition to training and shipping your own models.",
    description:
      "Develop a working understanding of machine learning: build intuition for neural networks, learn classical techniques, train deep learning models, and work with large language models.",
    difficulty: "intermediate",
    duration: "16–20 weeks",
    outcomes: [
      "Explain how neural networks learn",
      "Train and evaluate classical ML models",
      "Build deep learning models with PyTorch",
      "Work with transformers and LLMs",
    ],
    steps: [
      {
        title: "Python foundations",
        description: "Python is the lingua franca of machine learning.",
        resourceSlugs: ["python-tutorial"],
      },
      {
        title: "Build intuition",
        description: "See visually how neural networks and gradient descent work.",
        resourceSlugs: ["3b1b-neural-networks"],
      },
      {
        title: "Classical machine learning",
        description: "Learn regression, classification, clustering, and evaluation.",
        resourceSlugs: ["scikit-learn-user-guide"],
      },
      {
        title: "Deep learning",
        description: "Train real models end-to-end.",
        resourceSlugs: ["fastai-course", "pytorch-tutorials"],
      },
      {
        title: "Language models",
        description: "Work with transformers and open-source LLMs.",
        resourceSlugs: ["hugging-face-learn"],
      },
    ],
  },
  {
    slug: "database-engineering",
    title: "Database Engineering",
    summary: "Query, model, tune, and scale data systems.",
    description:
      "Develop deep database expertise: write fluent SQL, master PostgreSQL, understand indexing and query plans, and learn how data systems behave when distributed.",
    difficulty: "advanced",
    duration: "10–12 weeks",
    outcomes: [
      "Write and optimize complex SQL queries",
      "Operate and tune PostgreSQL",
      "Understand replication, partitioning, and consistency",
    ],
    steps: [
      {
        title: "SQL fluency",
        description: "Get comfortable with queries, joins, and aggregations.",
        resourceSlugs: ["sqlbolt"],
      },
      {
        title: "PostgreSQL in depth",
        description: "Learn data types, transactions, and administration.",
        resourceSlugs: ["postgresql-docs"],
      },
      {
        title: "Indexing and performance",
        description: "Understand what makes queries fast — or slow.",
        resourceSlugs: ["use-the-index-luke"],
      },
      {
        title: "Beyond a single node",
        description: "Caching, replication, and distributed data.",
        resourceSlugs: ["redis-docs", "designing-data-intensive-applications"],
      },
    ],
  },
];
