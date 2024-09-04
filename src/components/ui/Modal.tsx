import React, { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";

import { useOutsideClick } from "@/hooks/useOutsideClick";
import { cn } from "@/lib/utils";

type ModalContextType = {
  openedModal: string;
  close: () => void;
  open: (name: string) => void;
};

const ModalContext = createContext({} as ModalContextType);

type ModalProps = {
  children: React.ReactNode;
};

function Modal({ children }: ModalProps) {
  const [openedModal, setOpenedModal] = useState("");
  const close = () => setOpenedModal("");
  const open = (name: string) => setOpenedModal(name);
  return (
    <>
      <ModalContext.Provider value={{ openedModal, close, open }}>{children}</ModalContext.Provider>
    </>
  );
}
type OpenProps = {
  children: React.ReactElement;
  opens: string;
};

function Open({ children, opens: ModalWindowName }: OpenProps) {
  const { open } = useContext(ModalContext);
  return <>{cloneElement(children, { onClick: () => open(ModalWindowName) })}</>;
}

type WindowProps = {
  children: React.ReactElement;
  name: string;
  className?: string;
};

function Window({ children, name: ModalWindowName, className = "" }: WindowProps) {
  const { openedModal, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (openedModal !== ModalWindowName) return null;

  return createPortal(
    <div className="fixed inset-0 top-0 left-0 h-dvh w-full z-[1000] transition-all duration-500 bg-gray-700/40 ">
      <main
        ref={ref}
        className={cn(
          "modal fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 overflow-auto max-h-dvh bg-white rounded-2xl py-10 px-12 shadow-lg max-w-full  ",
          className
        )}
      >
        <button
          onClick={close}
          className=" absolute top-3 right-3 p-2 bg-gray-200 text-gray-500 rounded-full transition-colors duration-300 hover:bg-gray-300"
        >
          <HiXMark size={22} className=" stroke-1" />
        </button>
        {cloneElement(children, { onCloseModal: close })}
      </main>
    </div>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
