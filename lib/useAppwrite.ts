import { useEffect, useState } from "react";
import { Models } from "react-native-appwrite"; // Adjust the import path if needed
import { Alert } from "react-native";

// Define the type of the function passed to useAppwrite
type FetchFunction = () => Promise<Models.Document[]>;

const useAppwrite = (fn: FetchFunction) => {
  // Explicitly define the type of `data` as `Models.Document[]`
  const [data, setData] = useState<Models.Document[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);

    try {
      const response = await fn(); // Ensure the passed function returns the correct type
      setData(response);
    } catch (error) {
      Alert.alert("Error", (error as any).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData();

  return { data, loading, refetch }; // Return both data and loading
};

export default useAppwrite;
