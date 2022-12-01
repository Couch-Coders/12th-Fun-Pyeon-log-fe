import React, { useEffect } from "react";
import { useAppDispatch } from "@stores/store";
import type { RootState } from "@stores/store";
import { useSelector } from "react-redux";
import { getMapThunk } from "@stores/map/mapSlice";

const Map = () => {
  const mapData = useSelector((state: RootState) => state.map.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getMapThunk());
  }, []);

  return (
    <div>
      <h1>카카오맵</h1>
      {mapData?.map((map) => (
        <div key={map.id} style={{ margin: "20px" }}>
          <span>{map.place_name}</span>
          <span>{map.road_address_name}</span>
        </div>
      ))}
    </div>
  );
};

export default Map;
