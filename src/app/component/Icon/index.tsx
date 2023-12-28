"use client";
import { Icon, IconProps } from "@iconify/react";

const IconWrapper = (props: IconProps & { wrapperClassName?: string }) => {
  const numVal = Number(props.width);
  const width = isNaN(numVal) ? props.width : numVal;
  const {wrapperClassName,...p} = props
  return (
    <div
      style={{
        width: width || props.fontSize || "1em",
        height: width || props.fontSize || "1em",
      }}
      className={wrapperClassName}
    >
      <Icon {...p} />
    </div>
  );
};

export { Icon, IconWrapper };
