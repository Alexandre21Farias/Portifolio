import { useEffect, useState } from "react";
import PageWeb from "./PageWeb/PageWeb";
import HelloLoading from "./hooks/HelloLoadin";

export default function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, [loading]);

  return <>{loading ? <HelloLoading /> : <PageWeb />}</>;
}
