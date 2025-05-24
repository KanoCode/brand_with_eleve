import HeroSection from "./components/heroSection";

import HeroCategories from "./components/heroCategories";

export default async function Home() {
  return (
    <main>
      <HeroSection />

      <HeroCategories />
    </main>
  );
}
