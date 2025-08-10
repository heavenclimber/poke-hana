import React from "react";
import { Button } from "@mui/material";
import Image from "next/image";

const LoadingRefetch = ({
  loadAllFailed,
  fetchData,
}: {
  fetchData: () => void;
  loadAllFailed: boolean;
}) => {
  return (
    <div className="flex w-full items-center justify-center flex-1 h-full">
      {loadAllFailed ? (
        <div className="flex flex-col items-center justify-center p-4">
          <h4 className="mb-3">{`There's something wrong, please try again`}</h4>
          <Button
            variant="contained"
            color="primary"
            onClick={fetchData}
            data-testid="button-refresh"
          >
            Refresh
          </Button>
        </div>
      ) : (
        <div className="animate-spin-slow flex-1 flex items-center justify-center">
          <Image
            src="/img/pokeball.svg"
            alt="pokeball img"
            width={100}
            height={100}
          />
        </div>
      )}
    </div>
  );
};

export default LoadingRefetch;
