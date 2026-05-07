import berryNebulaTea from "../assets/menu/fruit-potions/berry-nebula-tea.png";
import lycheeLuna from "../assets/menu/fruit-potions/lychee-luna.png";
import mangoMeteor from "../assets/menu/fruit-potions/mango-meteor.png";
import peachComet from "../assets/menu/fruit-potions/peach-comet.png";
import classicMilkTea from "../assets/menu/milk-teas/classic-milk-tea.png";
import moonMilkTea from "../assets/menu/milk-teas/moon-milk-tea.png";
import starlightThaiTea from "../assets/menu/milk-teas/starlight-thai-tea.png";
import taroMilkTea from "../assets/menu/milk-teas/taro-milk-tea.png";
import brownSugarBoba from "../assets/menu/signature-brews/brown-sugar-boba.png";
import lavenderHojicha from "../assets/menu/signature-brews/lavendar-hojicha.png";
import vanillaCloud from "../assets/menu/signature-brews/vanilla-cloud.png";
import witchMatcha from "../assets/menu/signature-brews/witch-matcha.png";
import catPawCookie from "../assets/menu/tiny-treats/cat-paw-cookie.png";
import galaxyPudding from "../assets/menu/tiny-treats/galaxy-pudding.png";
import mochiStars from "../assets/menu/tiny-treats/mochi-stars.png";
import moonCookies from "../assets/menu/tiny-treats/moon-cookies.png";

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
  charm?: MenuCharm;
  details?: string;
  ingredients?: string[];
  caffeine?: string;
  image?: string;
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
        details:
          "Our house black tea steeped slow and stirred with cold milk and a whisper of vanilla. Made for late evenings and longer conversations.",
        ingredients: ["Black tea", "Milk", "Vanilla syrup", "Boba pearls"],
        price: "$5.75",
        charm: "moon",
        caffeine: "Medium",
        image: moonMilkTea,
      },
      {
        name: "Starlight Thai Tea",
        description: "Bold Thai tea with a silky finish.",
        details:
          "Spiced Thai tea brewed dark, then layered with sweetened condensed milk so each sip glows from amber to gold.",
        ingredients: [
          "Thai tea blend",
          "Condensed milk",
          "Cane sugar",
          "Boba pearls",
        ],
        price: "$5.50",
        charm: "star",
        caffeine: "Medium",
        image: starlightThaiTea,
      },
      {
        name: "Lavender Hojicha",
        description: "Roasted hojicha with floral lavender.",
        details:
          "Toasty roasted hojicha softened with steamed milk and a few drops of lavender syrup. Earthy, mellow, gently floral.",
        ingredients: ["Hojicha", "Milk", "Lavender syrup", "Honey"],
        price: "$5.75",
        charm: "lavender",
        caffeine: "Low",
        image: lavenderHojicha,
      },
      {
        name: "Witch's Matcha",
        description: "Smooth matcha with a touch of magic.",
        details:
          "Ceremonial-grade matcha whisked fresh, balanced with creamy oat milk and a touch of agave for a smooth finish.",
        ingredients: ["Ceremonial matcha", "Oat milk", "Agave"],
        price: "$5.75",
        charm: "leaf",
        caffeine: "Medium",
        image: witchMatcha,
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
        details:
          "The one we'd brew on any night. House black tea, fresh milk, brown sugar to taste — nothing more, nothing less.",
        ingredients: ["Black tea", "Milk", "Brown sugar", "Boba pearls"],
        price: "$5.25",
        caffeine: "Medium",
        image: classicMilkTea,
      },
      {
        name: "Brown Sugar Boba",
        description: "Caramelized sweetness in every sip.",
        details:
          "Boba pearls cooked in dark brown sugar syrup until they ribbon down the cup, finished with cold milk for a swirling tiger print.",
        ingredients: ["Brown sugar boba", "Milk", "Black tea"],
        price: "$5.75",
        caffeine: "Low",
        image: brownSugarBoba,
      },
      {
        name: "Taro Milk Tea",
        description: "Creamy taro, perfectly smooth.",
        details:
          "Real steamed taro blended into a silky purple cream and shaken with our house tea for a cozy nutty-vanilla flavor.",
        ingredients: ["Taro", "Black tea", "Milk", "Cane sugar"],
        price: "$5.75",
        caffeine: "Medium",
        image: taroMilkTea,
      },
      {
        name: "Vanilla Cloud",
        description: "Light vanilla with a cloud-like finish.",
        details:
          "Lightly sweetened oolong topped with a soft vanilla cream cap. Sip through the foam for a layered, fluffy finish.",
        ingredients: ["Oolong tea", "Vanilla cream cap", "Cane sugar"],
        price: "$5.50",
        caffeine: "Medium",
        image: vanillaCloud,
      },
    ],
  },
  {
    title: "Fruit Potions",
    icon: "potion",
    items: [
      {
        name: "Berry Nebula",
        description: "Mixed berries with a hint of cosmos.",
        details:
          "Strawberry, blueberry, and raspberry shaken into iced green tea — bright, tart, and a little fizzy on the tongue.",
        ingredients: [
          "Green tea",
          "Strawberry",
          "Blueberry",
          "Raspberry",
          "Lemon",
        ],
        price: "$5.75",
        charm: "berries",
        caffeine: "Low",
        image: berryNebulaTea,
      },
      {
        name: "Mango Meteor",
        description: "Bright mango with a burst of stardust.",
        details:
          "Sun-ripened mango puree poured over jasmine tea and crackling popping pearls that burst like little comets.",
        ingredients: ["Jasmine tea", "Mango puree", "Popping pearls"],
        price: "$5.75",
        charm: "mango",
        caffeine: "Low",
        image: mangoMeteor,
      },
      {
        name: "Lychee Luna",
        description: "Sweet lychee kissed by moonlight.",
        details:
          "Floral lychee shaken with iced white tea and a squeeze of lime. Light, perfumed, and barely sweet.",
        ingredients: ["White tea", "Lychee", "Lime"],
        price: "$5.75",
        charm: "lychee",
        caffeine: "Low",
        image: lycheeLuna,
      },
      {
        name: "Peach Comet",
        description: "Juicy peach with a comet's tail.",
        details:
          "Yellow peach blended with oolong and a streak of passionfruit so each sip lands soft, then sparkles.",
        ingredients: ["Oolong tea", "Peach", "Passionfruit"],
        price: "$5.50",
        charm: "peach",
        caffeine: "Low",
        image: peachComet,
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
        details:
          "Hand-shaped mochi with a sweet red bean filling, dusted with star anise sugar. Three to a plate.",
        ingredients: ["Glutinous rice flour", "Red bean", "Star anise sugar"],
        price: "$3.25",
        image: mochiStars,
      },
      {
        name: "Moon Cookies",
        description: "Buttery cookies with a hint of vanilla.",
        details:
          "Crescent-shaped shortbread baked golden, with a soft vanilla center and a sugar dusting like fresh snow.",
        ingredients: ["Butter", "Flour", "Vanilla", "Powdered sugar"],
        price: "$2.75",
        image: moonCookies,
      },
      {
        name: "Galaxy Pudding",
        description: "Silky panna cotta with butterfly pea swirl.",
        details:
          "Vanilla panna cotta swirled with butterfly pea so the cup turns indigo and violet. Topped with a glittering edible star.",
        ingredients: [
          "Cream",
          "Vanilla",
          "Butterfly pea flower",
          "Edible silver",
        ],
        price: "$3.75",
        image: galaxyPudding,
      },
      {
        name: "Cat's Paw Bite",
        description: "Soft chocolate cake with a fudge center.",
        details:
          "Warm chocolate cake with a molten fudge core, shaped into tiny paws. Boba's favorite, of course.",
        ingredients: ["Cocoa", "Butter", "Dark chocolate ganache", "Sea salt"],
        price: "$3.25",
        image: catPawCookie,
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
