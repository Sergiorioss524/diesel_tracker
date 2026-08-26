export interface Port {
  name: string;
  lat: number;
  lng: number;
  aliases: string[];
}

// Coordinates are approximate (port city center) — good enough for a route overview map.
export const PORTS: Port[] = [
  { name: "Houston, US", lat: 29.7499, lng: -95.358, aliases: ["houston"] },
  { name: "Corpus Christi, US", lat: 27.8006, lng: -97.3964, aliases: ["corpus christi"] },
  { name: "New York, US", lat: 40.6692, lng: -74.0384, aliases: ["new york", "nueva york"] },
  { name: "New Orleans, US", lat: 29.9403, lng: -90.0662, aliases: ["new orleans"] },
  { name: "Los Angeles, US", lat: 33.7395, lng: -118.2611, aliases: ["los angeles"] },
  { name: "Rotterdam, NL", lat: 51.9496, lng: 4.1453, aliases: ["rotterdam"] },
  { name: "Antwerp, BE", lat: 51.2705, lng: 4.3826, aliases: ["antwerp", "amberes"] },
  { name: "Hamburg, DE", lat: 53.5459, lng: 9.9661, aliases: ["hamburg", "hamburgo"] },
  { name: "Marseille, FR", lat: 43.3316, lng: 5.3155, aliases: ["marseille", "marsella", "fos-sur-mer", "fos"] },
  { name: "Algeciras, ES", lat: 36.1408, lng: -5.4536, aliases: ["algeciras"] },
  { name: "Genoa, IT", lat: 44.4072, lng: 8.9339, aliases: ["genoa", "genova", "genova"] },
  { name: "Trieste, IT", lat: 45.6495, lng: 13.7768, aliases: ["trieste"] },
  { name: "Piraeus, GR", lat: 37.9475, lng: 23.6367, aliases: ["piraeus", "pireo"] },
  { name: "Gdansk, PL", lat: 54.352, lng: 18.6466, aliases: ["gdansk"] },
  { name: "Primorsk, RU", lat: 60.3167, lng: 28.6167, aliases: ["primorsk"] },
  { name: "Novorossiysk, RU", lat: 44.7239, lng: 37.7683, aliases: ["novorossiysk"] },
  { name: "Milford Haven, UK", lat: 51.7132, lng: -5.0359, aliases: ["milford haven"] },
  { name: "Southampton, UK", lat: 50.9097, lng: -1.4044, aliases: ["southampton"] },
  { name: "Singapore", lat: 1.2644, lng: 103.822, aliases: ["singapore", "singapur"] },
  { name: "Fujairah, AE", lat: 25.1288, lng: 56.3265, aliases: ["fujairah"] },
  { name: "Jebel Ali, AE", lat: 25.0119, lng: 55.0617, aliases: ["jebel ali", "dubai"] },
  { name: "Ras Tanura, SA", lat: 26.6444, lng: 50.1583, aliases: ["ras tanura"] },
  { name: "Jubail, SA", lat: 27.0046, lng: 49.6598, aliases: ["jubail"] },
  { name: "Yanbu, SA", lat: 24.0895, lng: 38.0618, aliases: ["yanbu"] },
  { name: "Sitra, BH", lat: 26.1547, lng: 50.6497, aliases: ["sitra"] },
  { name: "Mina Al Ahmadi, KW", lat: 29.0769, lng: 48.1489, aliases: ["mina al ahmadi", "ahmadi"] },
  { name: "Bandar Abbas, IR", lat: 27.1865, lng: 56.2808, aliases: ["bandar abbas"] },
  { name: "Jamnagar, IN", lat: 22.4707, lng: 70.0577, aliases: ["jamnagar"] },
  { name: "Mumbai, IN", lat: 18.9388, lng: 72.8354, aliases: ["mumbai", "bombay"] },
  { name: "Chennai, IN", lat: 13.0827, lng: 80.2707, aliases: ["chennai", "madras"] },
  { name: "Colombo, LK", lat: 6.9497, lng: 79.8433, aliases: ["colombo"] },
  { name: "Shanghai, CN", lat: 31.2304, lng: 121.4737, aliases: ["shanghai"] },
  { name: "Ningbo-Zhoushan, CN", lat: 29.868, lng: 121.544, aliases: ["ningbo", "zhoushan"] },
  { name: "Qingdao, CN", lat: 36.0671, lng: 120.3826, aliases: ["qingdao"] },
  { name: "Hong Kong, CN", lat: 22.3193, lng: 114.1694, aliases: ["hong kong"] },
  { name: "Ulsan, KR", lat: 35.5384, lng: 129.3114, aliases: ["ulsan"] },
  { name: "Yeosu, KR", lat: 34.7604, lng: 127.6622, aliases: ["yeosu"] },
  { name: "Busan, KR", lat: 35.1796, lng: 129.0756, aliases: ["busan", "pusan"] },
  { name: "Yokohama, JP", lat: 35.4437, lng: 139.638, aliases: ["yokohama"] },
  { name: "Kawasaki, JP", lat: 35.5308, lng: 139.7029, aliases: ["kawasaki"] },
  { name: "Chiba, JP", lat: 35.6073, lng: 140.1063, aliases: ["chiba"] },
  { name: "Kaohsiung, TW", lat: 22.6273, lng: 120.3014, aliases: ["kaohsiung"] },
  { name: "Manila, PH", lat: 14.5906, lng: 120.9799, aliases: ["manila"] },
  { name: "Sydney, AU", lat: -33.8688, lng: 151.2093, aliases: ["sydney"] },
  { name: "Melbourne, AU", lat: -37.8136, lng: 144.9631, aliases: ["melbourne"] },
  { name: "Fremantle, AU", lat: -32.0569, lng: 115.7439, aliases: ["fremantle", "perth"] },
  { name: "Durban, ZA", lat: -29.8587, lng: 31.0218, aliases: ["durban"] },
  { name: "Cape Town, ZA", lat: -33.9249, lng: 18.4241, aliases: ["cape town", "ciudad del cabo"] },
  { name: "Lagos, NG", lat: 6.4531, lng: 3.3958, aliases: ["lagos"] },
  { name: "Port Harcourt, NG", lat: 4.7719, lng: 7.0134, aliases: ["port harcourt"] },
  { name: "Mombasa, KE", lat: -4.0435, lng: 39.6682, aliases: ["mombasa"] },
  { name: "Santos, BR", lat: -23.9608, lng: -46.3336, aliases: ["santos"] },
  { name: "Rio de Janeiro, BR", lat: -22.9068, lng: -43.1729, aliases: ["rio de janeiro", "rio"] },
  { name: "Buenos Aires, AR", lat: -34.6037, lng: -58.3816, aliases: ["buenos aires"] },
  { name: "Cartagena, CO", lat: 10.391, lng: -75.4794, aliases: ["cartagena"] },
  { name: "Callao, PE", lat: -12.0566, lng: -77.1181, aliases: ["callao", "lima"] },
  { name: "Balboa, PA", lat: 8.9528, lng: -79.5658, aliases: ["balboa"] },
  { name: "Colon, PA", lat: 9.3592, lng: -79.9014, aliases: ["colon"] },
  { name: "Puerto Cabello, VE", lat: 10.4735, lng: -68.0086, aliases: ["puerto cabello"] },
  { name: "Veracruz, MX", lat: 19.1738, lng: -96.1342, aliases: ["veracruz"] },
  { name: "Altamira, MX", lat: 22.3833, lng: -97.8833, aliases: ["altamira"] },
  { name: "Tampico, MX", lat: 22.2331, lng: -97.8611, aliases: ["tampico"] },
  { name: "Willemstad, CW", lat: 12.1084, lng: -68.9335, aliases: ["willemstad", "curacao", "curazao"] },
  { name: "Freeport, BS", lat: 26.5333, lng: -78.7, aliases: ["freeport"] },
  { name: "Kingston, JM", lat: 17.9712, lng: -76.7936, aliases: ["kingston"] },
  { name: "Santo Domingo, DO", lat: 18.4861, lng: -69.9312, aliases: ["santo domingo"] },
  { name: "San Juan, PR", lat: 18.4655, lng: -66.1057, aliases: ["san juan"] },
];

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const SORTED_ALIASES = PORTS.flatMap((port) =>
  port.aliases.map((alias) => ({ port, alias: normalize(alias) }))
).sort((a, b) => b.alias.length - a.alias.length);

export function findPort(query: string): Port | null {
  const q = normalize(query);
  if (!q) return null;
  for (const { port, alias } of SORTED_ALIASES) {
    if (q.includes(alias)) return port;
  }
  return null;
}
