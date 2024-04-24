import { useEffect, useState } from "react";
import dummyRespone from "../dummyRespone.json";

export default function useGetData(apiUrl) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch(apiUrl)
      .then((response) => response?.json())
      .then((response) => {
        setData((prevData) => {
          const newData = [...new Set([...prevData, ...response?.results])];
          if (newData?.length < response?.count) {
            setHasMore(true);
          } else {
            setHasMore(false);
          }
          return newData;
        });
        setLoading(false);
      })
      .catch((error) => {
        const url = new URL(apiUrl);
        const page_size = url.searchParams.get("page_size");
        const page = url.searchParams.get("page");
        const fetchedData = dummyRespone.results.slice(
          (page - 1) * page_size,
          page * page_size
        );
        setData((prevData) => {
          const newData = [...new Set([...prevData, ...fetchedData])];
          if (newData?.length < dummyRespone?.results?.length) {
            setHasMore(true);
          } else {
            setHasMore(false);
          }
          return newData;
        });
        setLoading(false);
        setError(error);
      });
  }, [apiUrl]);

  return { loading, error, data, hasMore };
}
