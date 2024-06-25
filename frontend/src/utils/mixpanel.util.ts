import mixpanel from "mixpanel-browser";
export const initMixPanel = () => {
  if (typeof window !== "undefined") {
    console.log("v", process.env.NEXT_PUBLIC_MIXPANEL_KEY);
    mixpanel.init(process.env.NEXT_PUBLIC_MIXPANEL_KEY || "");
  }
};
