import type { Category } from "@/types";

/**
 * SAMPLE DATA — the initial category taxonomy.
 * Replace with a database-backed source in the API phase.
 */
export const categories: Category[] = [
  {
    slug: "programming-languages",
    name: "Programming Languages",
    description: "Core languages, their syntax, idioms, and standard libraries.",
    icon: "languages",
    subcategories: [
      { slug: "javascript-typescript", name: "JavaScript & TypeScript" },
      { slug: "python", name: "Python" },
      { slug: "systems-languages", name: "Go & Rust" },
    ],
  },
  {
    slug: "frontend-development",
    name: "Frontend Development",
    description: "Building fast, accessible, and maintainable user interfaces for the web.",
    icon: "frontend",
    subcategories: [
      { slug: "frameworks", name: "Frameworks" },
      { slug: "css-styling", name: "CSS & Styling" },
      { slug: "accessibility", name: "Accessibility" },
    ],
  },
  {
    slug: "backend-development",
    name: "Backend Development",
    description: "Servers, APIs, and the frameworks that power application logic.",
    icon: "backend",
    subcategories: [
      { slug: "nodejs", name: "Node.js" },
      { slug: "python-frameworks", name: "Python Frameworks" },
      { slug: "jvm", name: "Java & Spring" },
    ],
  },
  {
    slug: "database-management",
    name: "Database Management",
    description: "Relational and non-relational data modeling, querying, and performance.",
    icon: "database",
    subcategories: [
      { slug: "sql", name: "SQL" },
      { slug: "postgresql", name: "PostgreSQL" },
      { slug: "nosql", name: "NoSQL & Caching" },
    ],
  },
  {
    slug: "devops-cloud",
    name: "DevOps & Cloud",
    description: "Containers, orchestration, automation, and infrastructure as code.",
    icon: "cloud",
    subcategories: [
      { slug: "containers", name: "Containers" },
      { slug: "ci-cd", name: "CI/CD" },
      { slug: "infrastructure-as-code", name: "Infrastructure as Code" },
    ],
  },
  {
    slug: "ai-machine-learning",
    name: "AI & Machine Learning",
    description: "Foundations of machine learning, deep learning, and modern AI tooling.",
    icon: "ai",
    subcategories: [
      { slug: "ml-foundations", name: "ML Foundations" },
      { slug: "deep-learning", name: "Deep Learning" },
      { slug: "llms", name: "LLMs & NLP" },
    ],
  },
  {
    slug: "cybersecurity",
    name: "Cybersecurity",
    description: "Secure coding, common vulnerabilities, and defensive practices.",
    icon: "security",
    subcategories: [
      { slug: "web-security", name: "Web Security" },
      { slug: "secure-coding", name: "Secure Coding" },
    ],
  },
  {
    slug: "system-design",
    name: "System Design",
    description: "Designing scalable, reliable, and maintainable distributed systems.",
    icon: "system-design",
    subcategories: [
      { slug: "fundamentals", name: "Fundamentals" },
      { slug: "distributed-systems", name: "Distributed Systems" },
      { slug: "cloud-architecture", name: "Cloud Architecture" },
    ],
  },
  {
    slug: "cs-fundamentals",
    name: "Computer Science Fundamentals",
    description: "Algorithms, data structures, operating systems, and how computers work.",
    icon: "fundamentals",
    subcategories: [
      { slug: "algorithms", name: "Algorithms & Data Structures" },
      { slug: "operating-systems", name: "Operating Systems" },
      { slug: "curricula", name: "Curricula" },
    ],
  },
  {
    slug: "software-engineering",
    name: "Software Engineering",
    description: "Design patterns, code quality, architecture, and engineering practices.",
    icon: "engineering",
    subcategories: [
      { slug: "design-patterns", name: "Design Patterns" },
      { slug: "practices", name: "Engineering Practices" },
      { slug: "architecture", name: "Architecture" },
    ],
  },
  {
    slug: "tools-technologies",
    name: "Tools & Technologies",
    description: "Version control, editors, and the everyday tools of the trade.",
    icon: "tools",
    subcategories: [
      { slug: "version-control", name: "Version Control" },
      { slug: "editors", name: "Editors & Terminals" },
      { slug: "utilities", name: "Utilities" },
    ],
  },
];
