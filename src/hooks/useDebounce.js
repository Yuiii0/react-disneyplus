import { useState, useEffect } from "react";

export const useDebounce = (value, delay) => {
  const [debounceValue, setdebounceValue] = useState(value);

  //timeout호출 도중에 value가 바뀌어 다시 호출되면 clearTimeout으로 없애준다.
  useEffect(() => {
    //delay초 후에 value을 setdebounceValue로 설정
    const handler = setTimeout(() => {
      setdebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceValue;
};
