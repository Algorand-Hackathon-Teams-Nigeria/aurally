interface Props {
  children?: React.ReactNode;
}

const PrimaryCirclesCard: React.FC<Props> = ({ children }) => {
  return (
    <div className="bg-primary rounded-3xl py-[70px] px-4 overflow-hidden relative">
      <div className="absolute -top-20 -left-20 h-56 w-56 rounded-full bg-[#6500764D]" />
      <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-[#6500764D]" />
      {children}
    </div>
  );
};

export default PrimaryCirclesCard;
