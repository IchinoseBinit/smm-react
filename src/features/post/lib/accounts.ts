import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";

const accountConfigs = [
  { type: "FACEBOOK" as AccountType },
  { type: "TIKTOK" as AccountType },
  { type: "YOUTUBE" as AccountType },
  { type: "INSTAGRAM" as AccountType },
];

const iconMap = {
  FACEBOOK: { icon: FaFacebook, color: "blue.600" },
  TIKTOK: { icon: FaTiktok, color: { base: "black", _dark: "white" } },
  YOUTUBE: { icon: FaYoutube, color: "red.600" },
  INSTAGRAM: { icon: FaInstagram, color: "#E1306C" },
};

export { accountConfigs, iconMap };
