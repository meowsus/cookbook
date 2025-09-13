import "@/app/globals.css";
import type { Preview } from "@storybook/nextjs-vite";

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    layout: "centered",

    backgrounds: {
      options: {
        shadcn: { name: "Shadcn", value: "hsl(var(--background))" },
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
  initialGlobals: {
    backgrounds: { value: "shadcn" },
  },
};

export default preview;
