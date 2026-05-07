import React from "react";

type StackDirection = "row" | "column";
type StackAlign = "start" | "center" | "end" | "stretch" | "baseline";
type StackJustify = "start" | "center" | "end" | "between" | "around" | "evenly";
type SpaceKey = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16;

const justifyMap: Record<StackJustify, string> = {
  start: "flex-start", center: "center", end: "flex-end",
  between: "space-between", around: "space-around", evenly: "space-evenly",
};

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: StackDirection;
  gap?: SpaceKey;
  align?: StackAlign;
  justify?: StackJustify;
  wrap?: boolean;
  as?: React.ElementType;
}

export function Stack({
  direction = "column",
  gap = 4,
  align = "stretch",
  justify = "start",
  wrap = false,
  as: Tag = "div",
  style,
  children,
  ...props
}: StackProps) {
  return (
    <Tag
      style={{
        display: "flex",
        flexDirection: direction,
        gap: `var(--ds-space-${gap})`,
        alignItems: align,
        justifyContent: justifyMap[justify],
        flexWrap: wrap ? "wrap" : "nowrap",
        ...style,
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function HStack(props: Omit<StackProps, "direction">) {
  return <Stack direction="row" align="center" {...props} />;
}

export function VStack(props: Omit<StackProps, "direction">) {
  return <Stack direction="column" {...props} />;
}

export function Box({
  as: Tag = "div",
  children,
  ...props
}: { as?: React.ElementType; children?: React.ReactNode } & React.HTMLAttributes<HTMLElement>) {
  return <Tag {...props}>{children}</Tag>;
}
