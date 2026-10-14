import { Header } from "../widgets/Header";
import { MainSection } from "../widgets/MainSection";

export function MainPage() {
  return (
    <div className="min-h-screen bg-neutral-900">
      <Header />
      <MainSection />
    </div>
  );
}
