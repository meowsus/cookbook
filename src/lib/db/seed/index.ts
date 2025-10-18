import { createDefaultRecipeName } from "@/lib/helpers/recipe";
import { prisma } from "@/lib/prisma";
import { readFileSync, readdirSync } from "fs";
import { join, parse } from "path";

const fixturesDir = join(__dirname, "fixtures");
const fixtures = readdirSync(fixturesDir).reduce(
  (acc, filename) => {
    const { name } = parse(filename);
    acc[name] = readFileSync(join(fixturesDir, filename), "utf-8");
    return acc;
  },
  {} as Record<string, string>,
);

const sampleSources = [
  {
    url: "https://www.example.com/recipe/12345/casserole/",
    fullHtml: fixtures.casseroleFull,
    processedHtml: fixtures.casseroleProcessed,
    extractedRecipe: fixtures.casseroleExtracted,
  },
  {
    url: "https://www.example.com/recipes/crammy-doglington/cookie-12345",
    fullHtml: fixtures.cookieFull,
    processedHtml: fixtures.cookieProcessed,
    extractedRecipe: fixtures.cookieExtracted,
  },
];

async function main() {
  console.log("🌱 Starting database seed...");

  try {
    // Clear existing data
    console.log("🧹 Clearing existing recipes...");
    await prisma.recipe.deleteMany({});
    console.log("✅ Existing recipes cleared");

    console.log("🧹 Clearing existing sources...");
    await prisma.source.deleteMany({});
    console.log("✅ Existing sources cleared");

    // Create or find default user
    console.log("👤 Creating default user...");
    const defaultUser = await prisma.user.upsert({
      where: { email: "admin@example.com" },
      update: {},
      create: {
        id: "default-user-id",
        email: "admin@example.com",
        name: "Default User",
      },
    });
    console.log(`✅ Default user ready: ${defaultUser.email}`);

    // Create sample sources
    console.log("📝 Creating sample sources and recipes...");
    for (const source of sampleSources) {
      const created = await prisma.source.create({
        data: {
          ...source,
          user: {
            connect: { id: defaultUser.id },
          },
        },
      });
      console.log(`✅ Created source: ${created.url}`);

      console.log(`📝 Creating recipe for source ${created.id}`);
      const createdRecipe = await prisma.recipe.create({
        data: {
          name: createDefaultRecipeName(created.extractedRecipe),
          source: { connect: { id: created.id } },
          content: created.extractedRecipe,
          user: {
            connect: { id: defaultUser.id },
          },
        },
      });
      console.log(`✅ Created Recipe: ${createdRecipe.name}`);
    }

    console.log(`🎉 Seed completed! Created ${sampleSources.length} sources.`);
  } catch (error) {
    console.error("❌ Error during seed:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(() => {
    console.log("🏁 Seed script finished successfully");
    process.exit(0);
  })
  .catch((error) => {
    console.error("💥 Seed script failed:", error);
    process.exit(1);
  });
