import React, { ReactNode, useState } from "react";
import NewTabs from "../../Tabs/NewTabs";
import "./Modal.css";

interface ModalLType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
}

export default function Modal(props: ModalLType) {
  return (
    <>
      {props.isOpen && (
        <div className="modal-over">
          <div className="modal-box">
            <NewTabs />
            {props.children}
          </div>
        </div>
      )}
    </>
  );
}

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return {
    isOpen,
    toggle,
  };
}
