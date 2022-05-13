import React, { useCallback, useMemo } from "react";

interface TileProps {
  columnIndex: number;
  isCalled: boolean;
  isFree?: boolean;
  isWobble: boolean;
  onToggle(rowIndex: number, columnIndex: number): void;
  rowIndex: number;
  title: string;
}

const TileComponent: React.FC<TileProps> = (props) => {
  const { columnIndex, rowIndex, isCalled, isWobble, isFree, onToggle, title } =
    props;

  const onClick = useCallback(
    () => !isFree && onToggle(rowIndex, columnIndex),
    [rowIndex, columnIndex, onToggle, isFree]
  );

  const style = useMemo(
    () => ({
      "--i": columnIndex + rowIndex,
    }),
    [columnIndex, rowIndex]
  ) as React.CSSProperties;

  const className = useMemo(() => {
    return `tile ${isWobble ? "wobble" : ""}  ${
      isCalled || isFree ? `tile--set ` : ""
    }

    `;
  }, [isCalled, isFree, isWobble]);

  return (
    <>
      <div style={style} className={className} onClick={onClick}>
        {isFree ? <span className="free">Free</span> : null}
        {title}
      </div>
    </>
  );
};

export const Tile = React.memo(TileComponent);
