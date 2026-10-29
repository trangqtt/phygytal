import localFont from "next/font/local";

export const lostTypeFont = localFont({
    src: [
      {
        path: "./lost-type/LostType2023-Regular.otf",
        weight: "300",
      },
    ],
    variable: "--font-lostType",
  });
  
export const btBeausans = localFont({
    src: [
      {
        path: "./bt-beausans/BT-BeauSans-Light.ttf",
        weight: "300",
      },
      {
        path: "./bt-beausans/BT-BeauSans-Regular.ttf",
        weight: "400",
      },
      {
        path: "./bt-beausans/BT-BeauSans-Medium.ttf",
        weight: "500",
      },
      {
        path: "./bt-beausans/BT-BeauSans-Bold.ttf",
        weight: "600",
      },
      {
        path: "./bt-beausans/BT-BeauSans-ExtraBold.ttf",
        weight: "700",
      },
    ],
    variable: "--font-btBeausans",
  });