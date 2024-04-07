import { useEffect, useState } from "react";
import { useMedia } from "use-media";

function useResponsive() {
  const isWide = useMedia({ minWidth: "768px" });

  const [showSidebar, setShowSidebar] = useState<boolean | undefined>(
    isWide || true
  );

  useEffect(() => {
    if (isWide) {
      setShowSidebar(true);
    } else {
      setShowSidebar(false);
    }
  }, [isWide]);

  return { showSidebar };
}

export default useResponsive;
