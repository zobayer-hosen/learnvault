import {
  Brain,
  Braces,
  Cloud,
  Cpu,
  Database,
  Network,
  PanelsTopLeft,
  Server,
  ShieldCheck,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { CategoryIconKey } from "@/types";

const icons: Record<CategoryIconKey, LucideIcon> = {
  languages: Braces,
  frontend: PanelsTopLeft,
  backend: Server,
  database: Database,
  cloud: Cloud,
  ai: Brain,
  security: ShieldCheck,
  "system-design": Network,
  fundamentals: Cpu,
  engineering: Workflow,
  tools: Wrench,
};

export function CategoryIcon({ icon, className }: { icon: CategoryIconKey; className?: string }) {
  const Icon = icons[icon];
  return <Icon aria-hidden className={className} />;
}
