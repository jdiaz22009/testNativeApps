import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  title: string;
}

const CardFlight = ({ children, title }: IProps) => {
  return (
    <div className="card border-info mb-3">
      <div className="card-header">{title}</div>
      {children}
    </div>
  );
};

export default CardFlight;
