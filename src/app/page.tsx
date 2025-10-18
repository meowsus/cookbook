import Hero from "@/app/Hero";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  if (session?.user?.id) {
    return (
      <Hero
        title="Heck yeah!"
        description="Are you ready to start cooking? I bet you are, you hungry little scamp you!"
        buttonText="Get started"
        buttonLink="/sources"
        backgroundImage="/images/dad-helped.jpg"
      />
    );
  }

  return (
    <Hero
      title="We got this!"
      description="Don't worry, buddy. All you have to do is sign in and we'll start cooking, together."
      buttonText="Sign In"
      buttonLink="/api/auth/signin"
      backgroundImage="/images/help-dad.jpg"
    />
  );
}
