import axios from "axios";

const CACHE_TTL_MS = 60 * 1000;
const REQUEST_TIMEOUT_MS = 5000;
const COINGECKO_URL =
  "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd";

type Rates = { btc: number; eth: number };

let cache: (Rates & { fetchedAt: number }) | null = null;
let inFlight: Promise<Rates> | null = null;

async function fetchLiveRates(): Promise<Rates> {
  const response = await axios.get(COINGECKO_URL, {
    timeout: REQUEST_TIMEOUT_MS,
  });

  const btc = Number(response.data?.bitcoin?.usd);
  const eth = Number(response.data?.ethereum?.usd);

  if (!btc || !eth) {
    throw new Error("Invalid response from crypto price provider");
  }

  return { btc, eth };
}

// Free-tier CoinGecko price lookup for the crypto wallets this app accepts
// deposits/withdrawals in. Cached in-memory to stay well under the free
// API's rate limit and to keep the deposit form snappy - a fresh quote
// every request isn't needed for a value that's only a preview/estimate.
export default class CryptoPriceService {
  static async getRates(): Promise<Rates> {
    const now = Date.now();

    if (cache && now - cache.fetchedAt < CACHE_TTL_MS) {
      return { btc: cache.btc, eth: cache.eth };
    }

    if (!inFlight) {
      inFlight = fetchLiveRates().finally(() => {
        inFlight = null;
      });
    }

    try {
      const rates = await inFlight;
      cache = { ...rates, fetchedAt: Date.now() };
      return rates;
    } catch (error) {
      // The free price API can be briefly flaky/rate-limited - fall back to
      // the last known good rate instead of hard-failing a deposit.
      if (cache) {
        return { btc: cache.btc, eth: cache.eth };
      }

      throw error;
    }
  }

  // USDT is treated as pegged 1:1 to USD, which is the standard assumption
  // for this kind of manual-deposit conversion (not a live market rate).
  static async getRateForWallet(wallet: string): Promise<number> {
    if (wallet === "btc") {
      return (await this.getRates()).btc;
    }

    if (wallet === "eth") {
      return (await this.getRates()).eth;
    }

    return 1;
  }
}
