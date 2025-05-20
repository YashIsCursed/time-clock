import Stopwatch from "@/components/Stopwatch/Stopwatch";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Stop-Watch",
    description: "A Stop Watch App",
  };
  
export default function Home() {
  return (
    <div className="h-screen w-screen justify-center min-h-screen p-8 overflow-hidden sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <Stopwatch/>
    </div>
  );
}
