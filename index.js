const {
  ChainId,
  Fetcher,
  WETH,
  Route,
  Trade,
  TokenAmount,
  TradeType,
} = require("@uniswap/sdk");
const chainId = ChainId.MAINNET;
const tokenAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";

async function init() {
  const dai = await Fetcher.fetchTokenData(chainId, tokenAddress);
  const weth = WETH[chainId];
  const pair = await Fetcher.fetchPairData(dai, weth);
  const route = new Route([pair], weth);
  const trade = new Trade(
    route,
    new TokenAmount(weth, "1000000000000000"),
    TradeType.EXACT_INPUT
  );
  console.log(trade.executionPrice.toSignificant(6));
  console.log(route.midPrice.toSignificant(6));
  console.log(route.midPrice.invert().toSignificant(6));
}
init();
