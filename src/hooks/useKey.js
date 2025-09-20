import { useEffect } from "react";

export const useKey = (keyCode, actionFn) => {
  useEffect(() => {
    const callBack = (e) => {
      if (e.code.toLowerCase() === keyCode.toLowerCase()) {
        actionFn();
      }
    };
    document.addEventListener("keydown", callBack);
    return () => document.removeEventListener("keydown", callBack);
  }, [keyCode, actionFn]);
};
