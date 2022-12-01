import React, { useState } from "react";
import Map from "./Map";
import { useSelector } from "react-redux";
import type { RootState } from "@stores/store";
import { useAppDispatch } from "@stores/store";
import { getMapThunk } from "@stores/map/mapThunk";
import List from "@components/List";

export interface propsType {
  keyword: string;
}

const Main = () => {
  const mapData = useSelector((state: RootState) => state.map.data);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState<string>("");
  const [keyword, setKeyword] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value) {
      alert("검색어를 입력해주세요.");
    } else {
      dispatch(getMapThunk(value));
      setKeyword(value);
      setValue("");
    }
  };

  return (
    <div>
      <h1>지도 검색</h1>
      <form onSubmit={onSubmit}>
        <input type="text" value={value} onChange={onChange} />
        <input type="submit" value="검색" />
      </form>

      <Map keyword={keyword} />

      {mapData?.map((map) => (
        <List key={map.id} {...map} />
      ))}
    </div>
  );
};

export default Main;
