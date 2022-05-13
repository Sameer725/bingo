import React from "react";

export interface HeaderProps {
  title: string;
}

export const Header = (props: HeaderProps) => {
  const { title } = props;
  const titleArray = title.split("");
  return (
    <h1 className="header">
      {titleArray.map((item, index) => {
        return <span key={item}>{item}</span>;
      })}
    </h1>
  );
};
