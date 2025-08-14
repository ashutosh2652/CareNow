import { useCallback, useState } from "react";

const UseDebounce = (callback, delay) => {
  const [timer, settimer] = useState(null);
  return useCallback(
    (...args) => {
      if (timer) clearInterval(timer);
      const newTimer = setTimeout(() => {
        callback(...args);
      }, delay);
      settimer(newTimer);
    },
    [callback, delay, timer]
  );
};
export default UseDebounce;
