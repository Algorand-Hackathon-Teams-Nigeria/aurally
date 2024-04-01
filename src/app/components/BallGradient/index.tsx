type Prop = {
  topOrBottom:
  | `top-${string}`
  | `bottom-${string}`
  | `-top-${string}`
  | `-bottom-${string}`;
  leftOrRight:
  | `left-${string}`
  | `right-${string}`
  | `-right-${string}`
  | `-left-${string}`;
};

const BallGradient = ({
  topOrBottom,
  leftOrRight,
}: Prop) => {
  return (
    <div
      className={`gradient-ball ${leftOrRight} ${topOrBottom}`}
    />
  );
};

export default BallGradient;
