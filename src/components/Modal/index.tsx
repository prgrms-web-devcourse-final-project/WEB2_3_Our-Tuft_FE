"use client";

import { modalProp } from "../../types/modalType";
import { createPortal } from "react-dom";
import ModalContainer from "./ModalContainer";
import ModalButton from "./ModalButton";

export default function Modal({
  title,
  width,
  height,
  setIsClose,
  setIsComplete,
  children,
  className,
  showCancelButton,
}: modalProp & {
  setIsClose?: (val: boolean) => void;
  setIsComplete?: <T>(val?: T) => void;
}) {
  return createPortal(
    <ModalContainer
      title={title}
      width={width}
      height={height}
      setIsClose={setIsClose}
      className={className}
    >
      {children}
      <ModalButton
        isVisible={showCancelButton}
        setIsClose={setIsClose}
        setIsComplete={setIsComplete}
      />
    </ModalContainer>,
    document.body
  );
}
