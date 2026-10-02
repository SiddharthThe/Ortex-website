import { createFileRoute } from "@tanstack/react-router";
import { Navigation } from "@/components/ortex/Navigation";
import { Hero } from "@/components/ortex/Hero";
import { SystemDepth } from "@/components/ortex/SystemDepth";
import { ProblemFlow } from "@/components/ortex/ProblemFlow";
import { HowItWorks } from "@/components/ortex/HowItWorks";
import { ArchitectureDiagram } from "@/components/ortex/ArchitectureDiagram";
import { Platforms } from "@/components/ortex/Platforms";
import { LocalFirst } from "@/components/ortex/LocalFirst";
import { FeatureList } from "@/components/ortex/FeatureList";
import { TechSpec } from "@/components/ortex/TechSpec";
import { WorkflowDemo } from "@/components/ortex/WorkflowDemo";
import { FinalCTA, Footer } from "@/components/ortex/FinalCTA";

const title = "Ortex — Move context, not copy-paste";
const description = "Ortex keeps your LLM workflow connected when you move between ChatGPT, Claude, Gemini and other AI interfaces. A local-first browser extension.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <SystemDepth />
        <ProblemFlow />
        <HowItWorks />
        <ArchitectureDiagram />
        <Platforms />
        <LocalFirst />
        <FeatureList />
        <TechSpec />
        <WorkflowDemo />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
