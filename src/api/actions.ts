import axios, { AxiosError } from "axios";

const API_URL = "https://curly-fortnight-g4pwwprqqxjhpg79-3000.app.github.dev/api";

export const getChocolateData = async (chocolateBar: string): Promise<ChocolateData> => {
  return new Promise<ChocolateData>((resolve, reject) => {
    axios
      .get(`${API_URL}/chocolate/${chocolateBar}`)
      .then((res) => {
        resolve({
          chocolateBar: chocolateBar,
          calories: res.data.calories,
          sugar: res.data.sugar,
          price: res.data.price,
          rating: res.data.rating,
        });
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError;
          if (axiosError.response?.status === 404) {
            reject("Chocolate not found");
          } else {
            // It's a good practice to reject with an Error object
            reject(axiosError.message);
          }
        } else {
          // Handle non-Axios errors
          reject("An unknown error occurred");
        }
      });
  });
};
