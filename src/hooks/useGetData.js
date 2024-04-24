import { useEffect, useState } from "react";
import axios from "axios";

const LAND_DATA_API = "https://prod-be.1acre.in/lands";

export default function useGetData(pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState([]);
  const [hasMore, setHasMore] = useState([]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    const apiParams = {
      ordering: "-updated",
      page_size: 10,
      page: pageNumber,
    };
    axios({
      method: "GET",
      url: LAND_DATA_API,
      params: apiParams,
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((response) => {
        setData((prevData) => {
          const newData = [
            ...new Set([...prevData, ...response?.data?.results]),
          ];
          if (newData?.length < response?.data?.count) {
            setHasMore(true);
          } else {
            setHasMore(false);
          }
          return newData;
        });
        setLoading(false);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          return;
        }
        setError(error);
      });
    return () => cancel();
  }, [pageNumber]);

  return { loading, error, data, hasMore };
}
