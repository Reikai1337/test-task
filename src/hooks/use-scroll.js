import { useEffect } from "react";

const useScroll = (func) => {
    useEffect(() => {
        document.addEventListener("scroll", func);
        return function () {
          document.removeEventListener("scroll", func);
        };
      }, [func]);
}

export default useScroll