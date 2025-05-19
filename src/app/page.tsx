import Clock from "@/components/Clock";
import Today from "@/components/Today";

export default function Home() {
  return (
    <div className="h-screen w-screen justify-center min-h-screen p-8 overflow-hidden sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <Clock />
    </div>
  );
}
