import { Recipe, Source } from "@/generated/prisma";
import { cn } from "@/lib/helpers";

interface SourceStepsProps {
  source: Source;
  recipes: Recipe[];
}

export default function SourceSteps({ source, recipes }: SourceStepsProps) {
  return (
    <ul className="steps steps-horizontal md:steps-vertical">
      <li className={cn("step", source.url && "step-success")}>
        <a href="#url">Add</a>
      </li>

      <li className={cn("step", source.fullHtml && "step-success")}>
        <a href="#fullHtml">Fetch</a>
      </li>

      <li className={cn("step", source.processedHtml && "step-success")}>
        <a href="#processedHtml">Process</a>
      </li>

      <li className={cn("step", source.extractedRecipe && "step-success")}>
        <a href="#extractedRecipe">Extract</a>
      </li>

      <li className={cn("step", recipes.length > 0 && "step-success")}>
        <a href="#createRecipe">Create</a>
      </li>
    </ul>
  );
}
