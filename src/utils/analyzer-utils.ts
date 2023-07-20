import ob from "urbit-ob";

// sigil shapes are named after something they loosely resemble (example: thumb, feather, triangle, etc)

type Planet = {
  patp: string;
  point: number;
};

const prefix_feather_left = [
  "lit",
  "dal",
  "roc",
  "loc",
  "sit",
  "rit",
  "bal",
  "mal",
  "sal",
  "pal",
  "ral",
  "moc",
  "poc",
  "bit",
  "rac",
  "toc",
  "mit",
  "fit",
  "nal",
  "tal",
  "pit",
];

const prefix_feather_right = ["wit", "soc", "doc", "fal", "hal", "wal"];

const suffix_feather_right = [
  "dyr",
  "tyv",
  "del",
  "sel",
  "syr",
  "bel",
  "myr",
  "pel",
  "fel",
  "tyr",
  "mel",
  "wel",
  "rel",
  "nyr",
  "lyr",
  "byr",
  "fyr",
  "tel",
  "nel",
];

const suffix_feather_left = [
  "syd",
  "wyd",
  "sef",
  "tyd",
  "ref",
  "def",
  "ryd",
  "lyd",
  "nyd",
];

const prefix_square = [
  "bin",
  "rin",
  "pas",
  "rov",
  "liv",
  "win",
  "das",
  "nov",
  "min",
  "som",
  "fin",
  "sip",
  "tas",
  "siv",
  "div",
  "las",
  "nom",
  "tin",
  "pin",
  "lom",
  "has",
  "lin",
  "tom",
  "fas",
  "hin",
  "mas",
  "din",
  "dov",
  "riv",
  "sov",
];

const suffix_square = [
  "sut",
  "pen",
  "heb",
  "peg",
  "put",
  "lut",
  "wen",
  "feb",
  "rut",
  "reb",
  "den",
  "nut",
  "reg",
  "meg",
  "web",
  "mut",
  "teb",
  "ben",
  "meb",
  "dut",
  "deg",
  "ren",
  "neb",
  "seg",
  "leb",
  "leg",
  "ten",
  "deb",
  "hut",
  "len",
  "fen",
  "seb",
  "sen",
  "weg",
  "teg",
];

const prefix_circle = [
  "doz",
  "mar",
  "sig",
  "sib",
  "rig",
  "sol",
  "dop",
  "hop",
  "dar",
  "fol",
  "hol",
  "lib",
  "bol",
  "lop",
  "nar",
  "mol",
  "rop",
  "tol",
  "nop",
  "dol",
  "lig",
  "tar",
  "wol",
  "rol",
  "nib",
  "sop",
  "hap",
  "tap",
  "dib",
  "bar",
  "par",
  "har",
  "top",
  "mop",
  "fop",
  "nol",
  "rib",
  "lar",
  "sar",
  "pol",
];

const suffix_circle = [
  "zod",
  "let",
  "ful",
  "sun",
  "lun",
  "sul",
  "ped",
  "tem",
  "led",
  "tul",
  "met",
  "dul",
  "het",
  "pet",
  "rul",
  "sem",
  "net",
  "mul",
  "wet",
  "det",
  "bet",
  "set",
  "med",
  "pun",
  "red",
  "ted",
  "nem",
  "pem",
  "wed",
  "nul",
  "ned",
  "fet",
  "ret",
  "hul",
  "rem",
  "dem",
  "fed",
  "sed",
  "mun",
];

const prefix_triangle_top_left = [
  "don",
  "pon",
  "lon",
  "ton",
  "lab",
  "ris",
  "mip",
  "mon",
  "mog",
  "ron",
  "tip",
  "nap",
  "tog",
  "fog",
  "sog",
  "mis",
  "dis",
  "lad",
  "wic",
  "lav",
  "rab",
  "pon",
  "son",
  "bon",
  "fon",
  "nis",
  "map",
];

const suffix_triangle_top_right = [
  "nec",
  "bud",
  "wyl",
  "dys",
  "hec",
  "lur",
  "pyc",
  "pyl",
  "tyl",
  "bes",
  "wyc",
  "nep",
  "rys",
  "sub",
  "rec",
  "sec",
  "fus",
  "hep",
  "mus",
  "ruc",
  "dec",
  "dyl",
  "mes",
  "tux",
  "sur",
  "tud",
  "nux",
  "rux",
  "nub",
  "dus",
  "mec",
  "rus",
  "num",
  "fep",
  "tus",
  "tyc",
  "lus",
  "nus",
  "tec",
  "pub",
  "tuc",
  "sud",
  "bus",
  "duc",
  "luc",
  "lec",
  "hus",
  "rud",
  "lud",
  "lys",
  "nys",
  "ryc",
  "nyl",
  "bec",
  "mud",
  "mur",
  "pec",
];

const prefix_triangle_bottom_left = [
  "wan",
  "hid",
  "fid",
  "dir",
  "wac",
  "sab",
  "wis",
  "lid",
  "mir",
  "lac",
  "sat",
  "tab",
  "tic",
  "pid",
  "los",
  "tir",
  "tad",
  "bic",
  "dif",
  "wid",
  "bis",
  "mid",
  "dap",
  "san",
  "nid",
  "sic",
  "nat",
  "pan",
  "pos",
  "ban",
  "wat",
  "bid",
  "pad",
  "dac",
  "tan",
  "sid",
  "fab",
  "lat",
  "nav",
  "rid",
  "pac",
  "rav",
  "pat",
  "tac",
  "fir",
  "bos",
  "bat",
  "hac",
  "tid",
  "hav",
  "sap",
  "hos",
  "dab",
  "dos",
  "mac",
  "hab",
  "nos",
  "dat",
  "hat",
  "nac",
  "rap",
  "mos",
  "bac",
  "lap",
  "ros",
  "mat",
];

const suffix_triangle_bottom_right = [
  "ryp",
  "syx",
  "byn",
  "bur",
  "pur",
  "syn",
  "wyn",
  "nym",
  "sum",
  "nyx",
  "wyx",
  "sym",
  "myn",
  "syp",
  "rum",
  "tyn",
  "lyx",
  "dux",
  "ryn",
  "pyx",
  "ryg",
  "ryx",
  "syl",
  "rym",
  "fyl",
  "byl",
  "typ",
  "myl",
  "fur",
  "fyn",
  "lyn",
  "dyn",
  "lux",
];

const prefix_triangle_bottom_right = ["han", "fos", "had", "fad"];

const suffix_triangle_bottom_left = ["ryl"];

const suffix_triangle_top_left = [
  "wes",
  "wep",
  "pes",
  "sep",
  "mep",
  "dep",
  "tep",
  "res",
  "bep",
  "lep",
  "des",
  "hes",
  "nes",
  "tes",
  "rep",
  "fes",
];

const prefix_triangle_top_right = ["lis", "pic", "mic", "ric", "rad"];

export const shapeChecker = (
  start: number,
  stop: number,
  patp: string,
  shapeList: string[]
): boolean => {
  let flag = false;
  for (let i = 0; i < shapeList.length; i++) {
    if (patp.substring(start, stop).includes(shapeList[i])) {
      flag = true;
      return flag;
    }
  }
  return flag;
};

export const sigilFullCircle = (patp: string) => {
  const result: boolean =
    shapeChecker(1, 4, patp, prefix_triangle_top_left) &&
    shapeChecker(4, 7, patp, suffix_triangle_top_right) &&
    shapeChecker(8, 11, patp, prefix_triangle_bottom_left) &&
    shapeChecker(11, 14, patp, suffix_triangle_bottom_right);

  return result;
};

export const sigilAllCircles = (patp: string) => {
  const result: boolean =
    shapeChecker(1, 4, patp, prefix_circle) &&
    shapeChecker(4, 7, patp, suffix_circle) &&
    shapeChecker(8, 11, patp, prefix_circle) &&
    shapeChecker(11, 14, patp, suffix_circle);

  return result;
};

export const sigilHappyFace = (patp: string) => {
  const result: boolean =
    shapeChecker(1, 4, patp, prefix_circle) &&
    shapeChecker(4, 7, patp, suffix_circle) &&
    shapeChecker(8, 11, patp, prefix_triangle_bottom_left) &&
    shapeChecker(11, 14, patp, suffix_triangle_bottom_right);

  return result;
};

export const sigilSadFace = (patp: string) => {
  const result: boolean =
    shapeChecker(1, 4, patp, prefix_circle) &&
    shapeChecker(4, 7, patp, suffix_circle) &&
    shapeChecker(8, 11, patp, prefix_triangle_top_left) &&
    shapeChecker(11, 14, patp, suffix_triangle_top_right);

  return result;
};

export const sigilFullSquare = (patp: string) => {
  const result: boolean =
    shapeChecker(1, 4, patp, prefix_square) &&
    shapeChecker(4, 7, patp, suffix_square) &&
    shapeChecker(8, 11, patp, prefix_square) &&
    shapeChecker(11, 14, patp, suffix_square);

  return result;
};

export const sigilHollowCircle = (patp: string) => {
  const result: boolean =
    shapeChecker(1, 4, patp, prefix_feather_right) &&
    shapeChecker(4, 7, patp, suffix_feather_left) &&
    shapeChecker(8, 11, patp, prefix_feather_left) &&
    shapeChecker(11, 14, patp, suffix_feather_right);

  return result;
};

export const sigilHalfMoons = (patp: string) => {
  const result: boolean =
    (shapeChecker(1, 4, patp, prefix_triangle_top_right) &&
      shapeChecker(4, 7, patp, suffix_triangle_top_right) &&
      shapeChecker(8, 11, patp, prefix_triangle_bottom_right) &&
      shapeChecker(11, 14, patp, suffix_triangle_bottom_right)) ||
    (shapeChecker(1, 4, patp, prefix_triangle_top_left) &&
      shapeChecker(4, 7, patp, suffix_triangle_top_left) &&
      shapeChecker(8, 11, patp, prefix_triangle_bottom_left) &&
      shapeChecker(11, 14, patp, suffix_triangle_bottom_left));

  return result;
};

export const sigilShield = (patp: string) => {
  const result: boolean =
    shapeChecker(1, 4, patp, prefix_square) &&
    shapeChecker(4, 7, patp, suffix_square) &&
    shapeChecker(8, 11, patp, prefix_triangle_bottom_left) &&
    shapeChecker(11, 14, patp, suffix_triangle_bottom_right);

  return result;
};

export const findAlmostDoubles = (patp: string) => {
  if (
    patp.substring(1, 5) === patp.substring(8, 12) &&
    patp.substring(1, 7) !== patp.substring(8, 14)
  )
    return true;
};

export const findDoubles = (patp: string) => {
  if (patp.substring(1, 7) === patp.substring(8, 14)) return true;
};

export const findSameEndings = (patp: string) => {
  if (
    patp.substring(3, 7) === patp.substring(10, 14) &&
    patp.substring(1, 7) !== patp.substring(8, 14)
  )
    return true;
};

export const findEnglishPatps = (patp: string) => {
  const ps = [
    "balder",
    "balled",
    "baller",
    "ballet",
    "banned",
    "banter",
    "barfed",
    "barfer",
    "batted",
    "battel",
    "batter",
    "bolder",
    "boldyr",
    "biches",
    "bitdev",
    "bitter",
    "dapper",
    "darrel",
    "darren",
    "darryl",
    "docter",
    "doctyr",
    "doller",
    "dotnet",
    "dotted",
    "fabled",
    "fallen",
    "faster",
    "fastyr",
    "fitter",
    "forbes",
    "happen",
    "harden",
    "harder",
    "harper",
    "hasten",
    "hatred",
    "hidden",
    "hodler",
    "holder",
    "holdyr",
    "hopper",
    "larper",
    "lasted",
    "laster",
    "littel",
    "littul",
    "magnet",
    "magnum",
    "magnus",
    "mapped",
    "martyn",
    "martyr",
    "master",
    "mastyr",
    "midnyt",
    "miller",
    "misder",
    "mister",
    "missed",
    "misled",
    "missel",
    "missyl",
    "mistyr",
    "mitten",
    "molten",
    "parden",
    "pilled",
    "piller",
    "ponder",
    "possum",
    "ranted",
    "ranter",
    "rapper",
    "rapped",
    "rapter",
    "riches",
    "ridden",
    "riddel",
    "ripped",
    "ripper",
    "roller",
    "rolled",
    "rollex",
    "salted",
    "salter",
    "sampel",
    "signed",
    "signer",
    "sonnet",
    "sovryn",
    "tapper",
    "tapped",
    "tasted",
    "taster",
    "tinder",
    "walnut",
    "walrus",
    "wanted",
    "wantyd",
    "wanter",
    "wander",
    "wandyr",
    "watsup",
    "winner",
    "winnyr",
    "winter",
    "wisdem",
    "wisdym",
    "wishes",
    "witnes",
    "worsen",
  ];

  return ps.reduce((acc, x) => acc || patp.includes(x), false);
};

export const findBothEnglish = (patp: string) => {
  const first = patp.substring(1, 7);
  const second = patp.substring(8, 14);

  if (findEnglishPatps(first) && findEnglishPatps(second)) return true;
};

const findSameDigits = (point: string) => {
  for (let i = 1; i < point.length; i++) {
    if (point[i] !== point[0]) {
      return false;
    }
  }
  return true;
};

export const findRareNumbers = (point: string): boolean => {
  const regex = /^[1-9]0*$/; // number followed by all zeros

  return regex.test(point) || findSameDigits(point);
};

export const ENGLISH_LIKE = "english-like";
export const DOUBLES = "doubles";
export const ALMOST_DOUBLES = "almost doubles";
export const FULL_CIRCLE = "full circle";
export const FULL_SQUARE = "full square";
export const HALF_MOONS = "half moons";
export const HOLLOW_CIRCLE = "hollow circle";
export const SHIELD = "shield";
export const ALL_CIRCLES = "all circles";
export const SAME_ENDING = "same ending";
export const FACE_LIKE = "face-like";
export const BOTH_ENGLISH = "both english";
export const RARE_NUMBERS = "rare numbers";

export const filters = [
  ENGLISH_LIKE,
  DOUBLES,
  ALMOST_DOUBLES,
  FULL_CIRCLE,
  FULL_SQUARE,
  HALF_MOONS,
  HOLLOW_CIRCLE,
  SHIELD,
  ALL_CIRCLES,
  SAME_ENDING,
  FACE_LIKE,
  BOTH_ENGLISH,
  RARE_NUMBERS,
];

export const assignTags = ({ patp, point }: Planet) => {
  let tags = [];
  const stringPoint = point.toString();

  if (findRareNumbers(stringPoint)) {
    tags.push(RARE_NUMBERS);
  }

  if (findBothEnglish(patp)) {
    tags.push(BOTH_ENGLISH);
  }

  if (findDoubles(patp)) {
    tags.push(DOUBLES);
  }

  if (findAlmostDoubles(patp)) {
    tags.push(ALMOST_DOUBLES);
  }

  if (findSameEndings(patp)) {
    tags.push(SAME_ENDING);
  }

  if (sigilFullCircle(patp)) {
    tags.push(FULL_CIRCLE);
  }

  if (sigilFullSquare(patp)) {
    tags.push(FULL_SQUARE);
  }

  if (sigilAllCircles(patp)) {
    tags.push(ALL_CIRCLES);
  }

  if (sigilSadFace(patp) || sigilHappyFace(patp)) {
    tags.push(FACE_LIKE);
  }

  if (sigilHalfMoons(patp)) {
    tags.push(HALF_MOONS);
  }

  if (sigilHollowCircle(patp)) {
    tags.push(HOLLOW_CIRCLE);
  }

  if (sigilShield(patp)) {
    tags.push(SHIELD);
  }

  if (findEnglishPatps(patp) && !findBothEnglish(patp)) {
    tags.push(ENGLISH_LIKE);
  }

  return tags;
};

export const getTagColor = (tag: string) => {
  switch (tag) {
    case DOUBLES:
      return "#5cb85c";
    case ALMOST_DOUBLES:
      return "#0275d8";
    case SAME_ENDING:
      return "#5bc0de";
    case FULL_CIRCLE:
      return "purple";
    case FULL_SQUARE:
      return "orange";
    case SHIELD:
      return "#FF1493";
    case HALF_MOONS:
      return "#A9A9A9";
    case HOLLOW_CIRCLE:
      return "black";
    case ALL_CIRCLES:
      return "#008000";
    case FACE_LIKE:
      return "brown";
    case ENGLISH_LIKE:
      return "red";
    case BOTH_ENGLISH:
      return "#eb6134";

    default:
      return "#d1cf9b";
  }
};

export const formatPatp = (patp: string) => {
  if (typeof patp !== "string" || patp.length === 0) {
    return patp;
  }

  if (patp.substring(0, 1) === "~") {
    return patp.toLowerCase();
  } else if (patp.substring(0, 1) !== "~") {
    return `~${patp.toLowerCase()}`;
  }
};

export const getPlanets = (patp: string) => {
  let shipArr = [];

  const pnt = parseInt(ob.patp2dec(patp));

  if (pnt >= 256 && pnt <= 65535) {
    for (let i = 1; i < 65535; i++) {
      const planet = ob.patp(pnt + 65536 * i);
      shipArr.push({
        point: pnt + 65536 * i,
        patp: planet,
        tags: assignTags({ point: pnt + 65536 * i, patp: planet }),
      });
    }
  }

  return shipArr;
};
