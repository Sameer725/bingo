import React from "react";
import { Header, HeaderProps } from "./Header";

interface WrapperProps extends HeaderProps {
  children: React.ReactNode;
}

export const Card = (props: WrapperProps) => {
  const { children, title } = props;

  return (
    <section className="card">
      <Header title={title} />
      {children}
    </section>
  );
};
