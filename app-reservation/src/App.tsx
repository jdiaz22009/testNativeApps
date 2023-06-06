import CardFlight from "components/card";
import CardBody from "components/card/body";
import FormReservation from "components/form";
import { useFlight } from "hooks/api/useFlight";
import { useEffect, useState } from "react";

function App() {
  const { data, loading } = useFlight();
  const [search, setSearch] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [visibleForm, setVisibleForm] = useState<boolean>(false);
  const [uid, setUid] = useState<string>("");

  useEffect(() => {
    setFilteredData(data);
  }, [loading, data]);

  const handlerSearch = () => {
    if (search === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(
        (item) =>
          item.destination.toLowerCase().includes(search.toLowerCase()) ||
          item.origin.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const onVisibleForm = (uid: string) => {
    setUid(uid);
    setVisibleForm(!visibleForm);
  };

  return (
    <>
      <div className="container mt-5">
        <nav className="navbar bg-body-tertiary">
          <div className="container">
            <a className="navbar-brand">Vuelos</a>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success"
                type="button"
                onClick={handlerSearch}
              >
                Search
              </button>
            </form>
          </div>
        </nav>
        <br />

        {!visibleForm && (
          <CardFlight title="Vuelo">
            {filteredData?.length > 0 &&
              filteredData.map((item) => (
                <>
                  <CardBody
                    origin={item?.origin}
                    destination={item?.destination}
                    departureDate={item?.departureDate}
                    departuretime={item?.departuretime}
                    capacity={item?.capacity}
                  />
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => onVisibleForm(item?.uid)}
                  >
                    Reservar vuelo
                  </button>
                </>
              ))}
          </CardFlight>
        )}
      </div>

      {visibleForm && <FormReservation uid={uid} />}
    </>
  );
}

export default App;
