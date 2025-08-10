"use client";

import React, { createContext, useState, ReactNode, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";

type SnackbarType = "success" | "error";

interface NotificationParams {
  type: SnackbarType;
  text: string;
}

interface SnackbarContextType {
  notification: (params: NotificationParams) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

// eslint-disable-next-line import/no-mutable-exports
let notification: (params: NotificationParams) => void = () => {
  throw new Error(
    "notification function must be used within a SnackbarProvider"
  );
};

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    type: "success" as SnackbarType,
  });

  notification = ({ type, text }: NotificationParams) => {
    setSnackbar({ open: true, message: text, type });
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    const handleOffline = () => {
      notification({
        type: "error",
        text: "No internet connection. Please check your network and try again.",
      });
    };

    const handleOnline = () => {
      notification({
        type: "success",
        text: "You are back online!",
      });
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <SnackbarContext.Provider value={{ notification }}>
      {children}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.type}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export { notification };
