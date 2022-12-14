import React from "react";

const header = (sessionToken: string) => {
  const h = new Headers();
  h.append("Content-Type", "application/json");
  h.append("X-User-Token", sessionToken);

  return h;
};

export default header; 