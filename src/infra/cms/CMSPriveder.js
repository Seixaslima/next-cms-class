import { createContext, useContext } from "react";
import get from "lodash/get";

const CMSContext = createContext({
  cmsContent: {},
});

export function getCMSContent(path = "") {
  const cmsContent = useContext(CMSContext).cmsContent;

  if (path === "") return cmsContent;

  const output = get(cmsContent, path);
  return output;
}

export default function CMSProvider({ cmsContent, children }) {
  return (
    <CMSContext.Provider value={{ cmsContent }}>{children}</CMSContext.Provider>
  );
}
