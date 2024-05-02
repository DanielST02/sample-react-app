import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Button,
} from "@nextui-org/react";
import { useState } from "react";
import { getChocolateData } from "../api/actions";

const ChocolateCard: React.FC = () => {
  const [data, setData] = useState<ChocolateData>();
  const [loadingState, setLoadingState] = useState(false);
  const [chocolateBar, setChocolateBar] = useState("");
  const [error, setError] = useState("");

  const handleSearch = () => {
    console.log("Fetching Chocolate Data...");
    console.log(chocolateBar);
    setLoadingState(true);
    getChocolateData(chocolateBar)
      .then((res) => {
        setError("");
        if (res) {
          console.log(res);
          setData(res);
          setLoadingState(false);
        }
      })
      .catch((error) => {
        console.error(error);
        setLoadingState(false);
        setData(undefined);
        setError(error);
      });
  };

  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className="flex flex-col w-full p-2 space-y-4">
            <Input
              id="chocolateBarName"
              type="text"
              label="ChocolateBar"
              value={chocolateBar}
              onChange={(e) => {
                setChocolateBar(e.target.value);
              }}
            />
            <Button
              className=""
              color="primary"
              isLoading={loadingState}
              type="submit"
            >
              Search
            </Button>
          </div>
        </form>
      </CardHeader>
      <Divider />
      {data ? (
        <CardBody>
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold">{data.chocolateBar}</h1>
            {data.calories > 250 ? (
              <div>
                Lower Calories
              </div>
            ) : (
              <div>
                Higher Calories!
              </div>
            )}
            <p className="text-3xl font-bold">{data.calories}kcal</p>
            <p className="text-lg">Sugar: {data.sugar}g</p>
            <p className="text-lg">Price: £{data.price}.99</p>
            <p className="text-lg">Rating: {data.rating} stars</p>
          </div>
        </CardBody>
      ) : (
        <CardBody>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold">Please enter a chocolate bar</p>
          </div>
        </CardBody>
      )}
      <Divider />
      <CardFooter>
        <div className="flex flex-col items-left">
          {error && <p className="text-xs text-red-600 ">{error}</p>}
          {data && (
            <p className="text-xs  text-gray-600 ">Last update successful.</p>
          )}
          {!data && (
            <p className="text-xs  text-gray-600 ">Waiting for input...</p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChocolateCard;
