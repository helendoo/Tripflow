// Static country-to-region and visit info

const seasonalRegions = {
    Thailand: {
      North: { months: "Rainy season: May–Oct", color: "#3498db" },
      SouthWest: { months: "Rainy season: May–Oct", color: "#2ecc71" },
      SouthEast: { months: "Rainy season: Oct–Jan", color: "#f39c12" }
    },
    Italy: {
      North: "Cold winters, snowy Alps. Best travel: May–Sep",
      South: "Hot summers. Best travel: Mar–Jun & Sep–Nov",
    },
    Japan: {
      Hokkaido: "Cool climate, snowy winters. Best: Jun–Sep",
      TokyoRegion: "Rainy season: June–July. Best: Apr–May, Oct",
      Okinawa: "Tropical. Rainy: May–June. Typhoons: Aug–Sep",
    },
    Sweden: {
      North: "Snowy winters. Summer June–August.",
      South: "Mild winters. Rain throughout year. Best May–Sep",
    }  
  };
  
  const bestTimeInfo = {
    Bangkok: {
      affordability: "May–Oct: Lower hotel and flight prices due to low season",
      crowd: "Quieter from June–Sep, peak in Dec–Jan",
      experiences: [
        "Explore floating markets in less crowded canals",
        "Rooftop dining and nightlife is best in the cooler months"
      ],
      festivals: [
        "Songkran (Thai New Year): April",
        "Loy Krathong (Lantern Festival): November"
      ]
    },
    Tokyo: {
      affordability: "Best flight deals in summer (rainy) and winter (cold)",
      crowd: "Cherry blossom & autumn foliage seasons are peak",
      experiences: [
        "Shopping in quiet districts during summer sales",
        "Beautiful shrines and gardens in fall"
      ],
      festivals: [
        "Sanja Matsuri: May",
        "Sumida River Fireworks Festival: July"
      ]
    },
    Rome: {
      affordability: "Nov–Mar (except holidays): Cheaper hotels and airfare",
      crowd: "High summer tourism; spring & fall are calmer",
      experiences: [
        "Visit ancient ruins without the heat",
        "Sip wine outdoors in shoulder seasons"
      ],
      festivals: [
        "Carnival of Rome: February",
        "Festa della Repubblica: June 2"
      ]
    },
    Stockholm: {
      affordability: "Cheaper travel in winter months (excluding December)",
      crowd: "Pleasant weather and fewer tourists in spring and fall",
      experiences: [
        "Midnight sun in June in the far north",
        "Enjoy fika culture in cozy cafés"
      ],
      festivals: [
        "Midsummer Festival: June",
        "Stockholm Culture Festival: August"
      ]
    },
      Paris: {
        affordability: "Winter (Jan–Mar) offers lower rates, especially post-holiday",
        crowd: "Most crowded in summer; spring and fall are calmer",
        experiences: [
          "Charming cafés and gardens in spring",
          "Less crowded museums in winter"
        ]
      },
      NewYork: {
        affordability: "January–February = cheapest for flights & hotels",
        crowd: "Summer & December holidays are busiest",
        experiences: [
          "Broadway shows year-round",
          "Central Park in fall colors or snowy winter scenes"
        ]
      },
      London: {
        affordability: "Shoulder seasons (Mar–May, Sep–Nov) are more affordable",
        crowd: "Summer (Jul–Aug) is peak tourist time",
        experiences: [
          "West End theatre, free museums anytime",
          "Hyde Park and the Thames in mild weather"
        ]
      },
      Sydney: {
        affordability: "Best deals in Australian winter (Jun–Aug)",
        crowd: "Peak season: Dec–Feb (Aussie summer)",
        experiences: [
          "Surf beaches and the Opera House in spring",
          "Great Barrier Reef in dry season (June–Oct)"
        ]
      },
      Barcelona: {
        affordability: "Fall and late winter offer better hotel deals",
        crowd: "Summer very crowded, especially August",
        experiences: [
          "Sagrada Familia and Gothic Quarter without long lines in spring",
          "Tapas tours & street festivals in shoulder season"
        ]
      },
      Berlin: {
        affordability: "Off-season (Nov–Feb) is cheapest",
        crowd: "Summer festivals and Christmas markets bring crowds",
        experiences: [
          "Street art and historic sites best explored in spring/fall",
          "Underground clubs open year-round"
        ]
      },
      Rio: {
        affordability: "Winter (May–Sep) is budget-friendly",
        crowd: "Carnival season (Feb–Mar) is peak time",
        experiences: [
          "Christ the Redeemer with fewer lines off-season",
          "Beach & samba culture year-round"
        ]
      },
      Beijing: {
        affordability: "Winter (Nov–Feb) = low prices, but cold",
        crowd: "Golden Week in Oct = avoid",
        experiences: [
          "Great Wall hiking in spring & fall",
          "Cultural tours less crowded in winter"
        ]
      },
      MexicoCity: {
        affordability: "Summer is cheapest but also rainy",
        crowd: "Fall and spring are ideal, less rain and crowds",
        experiences: [
          "Historic Zócalo and Frida Kahlo museum anytime",
          "Outdoor food and markets best in dry season"
        ]
      },
      Dubai: {
        affordability: "Cheapest months: May–September (hot!)",
        crowd: "Peak: Nov–Mar (pleasant weather)",
        experiences: [
          "Desert safaris and rooftop lounges in winter",
          "Luxury shopping year-round"
        ]
    }
  };

  const countryFestivalData = {
    Thailand: [
      "Songkran (Thai New Year): April ",
      "Loy Krathong (Lantern Festival): November ",
      "Vegetarian Festival: October ",
      "Full Moon Party (Koh Phangan): Monthly during full moon "
    ],
    Japan: [
      "Sakura (Cherry Blossom) Viewing: Late March–Early April ",
      "Gion Matsuri (Kyoto): July ",
      "Tanabata Star Festival: July 7 "
    ],
    Italy: [
      "Venice Carnival: February ",
      "Festa della Repubblica: June 2 🇮🇹",
      "Grape Harvest Festivals: September "
    ],
    Sweden: [
      "Midsummer Festival: Late June ",
      "Crayfish Parties: August ",
      "Saint Lucia Day: December 13 "
    ],
    France: [
      "Bastille Day: July 14 🇫🇷",
      "Fête de la Musique: June 21 ",
      "Christmas Markets (Alsace, Paris): Dec "
    ],
    USA: [
      "4th of July: Independence Day 🇺🇸",
      "Thanksgiving: November ",
      "New Year's in Times Square: Dec 31 "
    ],
    UK: [
      "Notting Hill Carnival: August ",
      "Trooping the Colour: June 🇬🇧",
      "Bonfire Night (Guy Fawkes): Nov 5 "
    ],
    Australia: [
      "Sydney New Year’s Fireworks: Dec 31 ",
      "Vivid Sydney (light festival): May–June ",
      "Australia Day: January 26 🇦🇺"
    ],
    Spain: [
      "La Tomatina: August ",
      "Semana Santa (Holy Week): March–April ",
      "Las Fallas Festival: March "
    ],
    Germany: [
      "Oktoberfest (Munich): Sept–Oct ",
      "Berlin Film Festival: February ",
      "Christmas Markets: Dec "
    ],
    Brazil: [
      "Rio Carnival: February–March ",
      "São João Festival: June ",
      "New Year’s on Copacabana Beach: Dec 31 "
    ],
    China: [
      "Chinese New Year: Jan–Feb ",
      "Mid-Autumn Festival: Sept–Oct ",
      "National Day: October 1 🇨🇳"
    ],
    Mexico: [
      "Day of the Dead: Nov 1–2 ",
      "Independence Day: Sept 16 🇲🇽",
      "Guelaguetza Festival: July (Oaxaca) "
    ],
    UAE: [
      "Dubai Shopping Festival: Jan–Feb ",
      "National Day: Dec 2 🇦🇪",
      "Eid al-Fitr & Eid al-Adha: Variable "
    ]
  };
  
  const countryMap = {
    Bangkok: "Thailand",
    Tokyo: "Japan",
    Rome: "Italy",
    Stockholm: "Sweden",
    Paris: "France",
    NewYork: "USA",
    London: "UK",
    Sydney: "Australia",
    Barcelona: "Spain",
    Berlin: "Germany",
    Rio: "Brazil",
    Beijing: "China",
    MexicoCity: "Mexico",
    Dubai: "UAE"
  };