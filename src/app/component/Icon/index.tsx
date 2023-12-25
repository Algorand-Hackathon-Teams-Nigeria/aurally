"use client";
import { Icon, IconProps } from "@iconify/react";

const IconWrapper = (props: IconProps & { wrapperClassName?: string }) => {
  const numVal = Number(props.width);
  const width = isNaN(numVal) ? props.width : numVal;
  return (
    <div
      style={{
        width: width || props.fontSize || "1em",
        height: width || props.fontSize || "1em",
      }}
      className={props.wrapperClassName}
    >
      <Icon {...props} />
    </div>
  );
};

export { Icon, IconWrapper };
