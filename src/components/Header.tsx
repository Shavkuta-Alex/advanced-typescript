import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="relative text-center py-20 px-8 bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white mb-12">
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>
      <h1 className="text-5xl font-bold mb-2 max-md:text-4xl max-[480px]:text-3xl">
        Advanced TypeScript
      </h1>
      <p className="text-3xl font-light opacity-90 mb-8 max-md:text-2xl max-[480px]:text-xl">
        Learning Guide
      </p>
      <p className="text-lg opacity-70 max-w-[600px] mx-auto">
        20 essential topics ordered for optimal learning — each building on
        previous concepts
      </p>
    </header>
  );
}
