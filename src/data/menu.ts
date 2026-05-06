export type MenuArtType = "cup" | "plate" | "moon-cookie" | "pudding" | "paw";
export type MenuCharm =
  | "berries"
  | "lavender"
  | "leaf"
  | "lychee"
  | "mango"
  | "moon"
  | "peach"
  | "star";
export type MenuGroupIcon = "cup" | "potion" | "sparkles" | "treat";
export type MenuNoteIcon = "leaf" | "moon" | "sparkles";

export type MenuItem = {
  name: string;
  description: string;
  price: string;
  art: MenuArtType;
  accent: string;
  charm?: MenuCharm;
};

export type MenuGroup = {
  title: string;
  icon: MenuGroupIcon;
  items: MenuItem[];
};

export type MenuNote = {
  icon: MenuNoteIcon;
  text: string;
};

export const MENU_GROUPS: MenuGroup[] = [
  {
    title: "Signature Brews",
    icon: "sparkles",
    items: [
      {
        name: "Moon Milk Tea",
        description: "Creamy, dreamy, and lightly sweet.",
        price: "$5.75",
        art: "cup",
        accent: "#f4d39b",
        charm: "moon",
      },
      {
        name: "Starlight Thai Tea",
        description: "Bold Thai tea with a silky finish.",
        price: "$5.50",
        art: "cup",
        accent: "#f2a13e",
        charm: "star",
      },
      {
        name: "Lavender Hojicha",
        description: "Roasted hojicha with floral lavender.",
        price: "$5.75",
        art: "cup",
        accent: "#c7b4dc",
        charm: "lavender",
      },
      {
        name: "Witch's Matcha",
        description: "Smooth matcha with a touch of magic.",
        price: "$5.75",
        art: "cup",
        accent: "#c8d38c",
        charm: "leaf",
      },
    ],
  },
  {
    title: "Milk Teas",
    icon: "cup",
    items: [
      {
        name: "Classic Milk Tea",
        description: "Timeless and comforting.",
        price: "$5.25",
        art: "cup",
        accent: "#f4d7ad",
      },
      {
        name: "Brown Sugar Boba",
        description: "Caramelized sweetness in every sip.",
        price: "$5.75",
        art: "cup",
        accent: "#d98237",
      },
      {
        name: "Taro Milk Tea",
        description: "Creamy taro, perfectly smooth.",
        price: "$5.75",
        art: "cup",
        accent: "#d9c6f0",
      },
      {
        name: "Vanilla Cloud",
        description: "Light vanilla with a cloud-like finish.",
        price: "$5.50",
        art: "cup",
        accent: "#f6dfbf",
      },
    ],
  },
  {
    title: "Fruit Potions",
    icon: "potion",
    items: [
      {
        name: "Berry Nebula Tea",
        description: "Mixed berries with a hint of cosmos.",
        price: "$5.75",
        art: "cup",
        accent: "#7a52c6",
        charm: "berries",
      },
      {
        name: "Mango Meteor",
        description: "Bright mango with a burst of stardust.",
        price: "$5.75",
        art: "cup",
        accent: "#ffc64f",
        charm: "mango",
      },
      {
        name: "Lychee Luna",
        description: "Sweet lychee kissed by moonlight.",
        price: "$5.75",
        art: "cup",
        accent: "#ffe3d8",
        charm: "lychee",
      },
      {
        name: "Peach Comet",
        description: "Juicy peach with a comet's tail.",
        price: "$5.50",
        art: "cup",
        accent: "#f58f86",
        charm: "peach",
      },
    ],
  },
  {
    title: "Tiny Treats",
    icon: "treat",
    items: [
      {
        name: "Mochi Stars",
        description: "Chewy mochi in cute star shapes.",
        price: "$3.25",
        art: "plate",
        accent: "#f7b0b8",
      },
      {
        name: "Moon Cookies",
        description: "Buttery cookies with a hint of vanilla.",
        price: "$2.75",
        art: "moon-cookie",
        accent: "#f5b65e",
      },
      {
        name: "Galaxy Pudding",
        description: "Silky panna cotta with butterfly pea swirl.",
        price: "$3.75",
        art: "pudding",
        accent: "#8d64b3",
      },
      {
        name: "Cat's Paw Bite",
        description: "Soft chocolate cake with a fudge center.",
        price: "$3.25",
        art: "paw",
        accent: "#9a5f43",
      },
    ],
  },
];

export const MENU_NOTES: MenuNote[] = [
  {
    icon: "moon",
    text: "All drinks can be made hot, iced, or sparkling!",
  },
  {
    icon: "sparkles",
    text: "Add boba, jelly, or popping pearls for a little extra magic.",
  },
  {
    icon: "leaf",
    text: "Dairy-free options and staff favorites available.",
  },
];
