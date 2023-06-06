interface IProps {
  origin: string;
  destination: string;
  departureDate: Date;
  departuretime: string;
  capacity: number;
}

const CardBody = ({
  origin,
  destination,
  capacity,
  departureDate,
  departuretime,
}: IProps) => {
  return (
    <div className="card-body">
      <h5 className="card-title">
        {origin} - {destination}
      </h5>
      <p className="card-text">
        Para que disfrutes de las hermosa vacaciones de verenano
        <br />
        capacidad para {capacity}
        <br />
        fecha salidad {departureDate.toString()}
        <br />
        hora {departuretime}
      </p>
    </div>
  );
};

export default CardBody;
