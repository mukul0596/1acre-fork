import React, { useCallback, useRef, useState } from "react";
import LandCard from "./LandCard";
import { Alert, CircularProgress, Container, Grid, Stack } from "@mui/material";
import useGetData from "../hooks/useGetData";

const LandList = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const { loading, error, data, hasMore } = useGetData(pageNumber);

  const observer = useRef();
  const lastElementRef = useCallback(
    (node) => {
      if (loading) {
        return;
      }
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) {
        observer.current.observe(node);
      }
    },
    [loading, hasMore]
  );

  return (
    <Container>
      <Grid container spacing={4}>
        {data?.map((landData, index) => (
          <Grid
            key={landData?.id}
            ref={data?.length === index + 1 ? lastElementRef : null}
            item
            xs={12}
            sm={6}
            md={4}
          >
            <LandCard data={landData} />
          </Grid>
        ))}
      </Grid>
      {loading && (
        <Stack alignItems="center" pt={4}>
          <CircularProgress color="inherit" />
        </Stack>
      )}
      {error && (
        <Stack pt={4}>
          <Alert severity="error">{error.message}</Alert>
        </Stack>
      )}
    </Container>
  );
};

export default LandList;
