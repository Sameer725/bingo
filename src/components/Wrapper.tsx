import React from "react";

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = (props: WrapperProps) => {
  const { children } = props;

  return <div className="wrapper">{children}</div>;
};
