import React from "react";
import { Card, CardContent, CardMedia, Stack, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const LandCard = ({ data }) => {
  return (
    <Card sx={{ borderRadius: "0.5rem" }}>
      <CardMedia>
        <Swiper navigation={true} modules={[Navigation]}>
          {data?.land_media?.map((media) =>
            media?.media_type === "image" ? (
              <SwiperSlide key={media?.id}>
                <img
                  src={media?.image}
                  alt={data?.village_name}
                  style={{
                    height: 200,
                    width: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </SwiperSlide>
            ) : null
          )}
        </Swiper>
      </CardMedia>
      <CardContent>
        <Typography variant="h6" component="div">
          {data?.village_name}, {data?.mandal_name}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          {data?.district_name}(dt)
        </Typography>
        <Stack direction="row" spacing={0.5}>
          {Object.entries(data?.total_land_size_in_acres).map(
            ([unit, value], index) =>
              value ? (
                <Typography
                  key={index}
                  variant="subtitle2"
                  sx={{ fontWeight: "bold" }}
                >
                  {value} {unit}
                </Typography>
              ) : null
          )}
          <Typography variant="subtitle2">•</Typography>
          <Typography variant="subtitle2">₹</Typography>
          {Object.entries(data?.price_per_acre_crore).map(
            ([unit, value], index) =>
              value ? (
                <Typography key={index} variant="subtitle2">
                  {value} {unit}
                </Typography>
              ) : null
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default LandCard;
