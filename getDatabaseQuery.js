import axios from 'axios';

const allDataBase = "./sql/app.sql";
const getAllData = async () => {
  const response = await axios.get(allDataBase);
  return response.data;
}

export const UseGetAllData = () => {
  const {isLoading, data} = useQuery (['allData'], getAllData);
  return {data, isLoading};
};
 