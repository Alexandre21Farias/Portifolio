import { useEffect, useState } from "react";
import PageWeb from "./PageWeb/PageWeb";
import HelloLoading from "./hooks/HelloLoading";

export default function App() {
  // reduced motion skips the greeting sequence entirely
  const [loading, setLoading] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [loading]);

  return <>{loading ? <HelloLoading /> : <PageWeb />}</>;
}
