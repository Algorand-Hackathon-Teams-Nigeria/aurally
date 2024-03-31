type Prop = {
  w?: `w-${string}`;
  h?: `h-${string}`;
  blur?: `blur-${string}`;
  topOrBottom: `top-${string}` | `bottom-${string}`;
  leftOrRight: `left-${string}` | `right-${string}`;
  rounded?: `rounded-${string}`;
};

const BallGradient = ({
  w = "w-[412px] lg:w-[555px]",
  h = "h-[412px] lg:h-[555px]",
  blur = "blur-[247px]",
  topOrBottom,
  leftOrRight,
  rounded = "rounded-full",
}: Prop) => {
  return (
    <div
      className={`gradient-ball ${leftOrRight} ${topOrBottom}`}
    />
  );
};

export default BallGradient;
