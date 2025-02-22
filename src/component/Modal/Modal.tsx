"use client";

import { createPortal } from "react-dom";
import ModalContainer from "./ModalContainer";
import ModalWrapper from "./ModalWrapper";

export default function Modal({ title, width, height, children }: modalProp) {
  return createPortal(
    <ModalWrapper>
      <ModalContainer title={title} width={width} height={height}>
        {children}
      </ModalContainer>
    </ModalWrapper>,
    document.body
  );
}
