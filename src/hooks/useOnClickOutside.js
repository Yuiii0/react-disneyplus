//ref: modal (DOM 요소)

import { useEffect } from "react";

//handler: ()=>setModalOpen(false) : 닫기
export default function useOnClickOutSide(ref, handler) {
  //event 등록 (mouse,touch)
  useEffect(() => {
    const listener = (event) => {
      // console.log(ref.current); //modal 요소
      if (!ref.current || ref.current.contains(event.target)) {
        return; //modal안쪽을 클릭한 경우
      }
      handler();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
