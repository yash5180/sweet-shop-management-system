import gulabJamun from "../assets/sweets/gulab-jamun.jpg";
import rasgulla from "../assets/sweets/rasgulla.jpg";
import ladoo from "../assets/sweets/ladoo.jpg";
import jalebi from "../assets/sweets/jalebi.jpg";
import barfi from "../assets/sweets/barfi.jpg";
import defaultImg from "../assets/sweets/default.jpg";

export const sweetImageMap: Record<string, string> = {
  "gulab jamun": gulabJamun,
  rasgulla,
  ladoo,
  jalebi,
  barfi,
};

export const getSweetImage = (name: string) => {
  return sweetImageMap[name.toLowerCase()] || defaultImg;
};
