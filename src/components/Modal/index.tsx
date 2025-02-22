"use client";

import { createPortal } from "react-dom";
import ModalContainer from "./ModalContainer";
import ModalWrapper from "./ModalWrapper";
import ModalButton from "./ModalButton";

export default function Modal({
  title,
  width,
  height,
  isClose,
  children,
}: modalProp & { isClose: (val: boolean) => void }) {
  return createPortal(
    <ModalWrapper>
      <ModalContainer
        title={title}
        width={width}
        height={height}
        isClose={isClose}
      >
        {children}
        <ModalButton isClose={isClose} />
      </ModalContainer>
    </ModalWrapper>,
    document.body
  );
}
