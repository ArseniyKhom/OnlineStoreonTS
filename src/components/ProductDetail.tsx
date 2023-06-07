import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Product from "./Product";

function GetId() {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    console.log(id);
  }, [id]);

  return (
    <div>
      <Product id={id} />
    </div>
  );
}

export default GetId;
