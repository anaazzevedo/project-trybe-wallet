async function fetchCoins() {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(url);
  const json = await response.json();
  console.log(json.USDT);
  return json;
}

export default fetchCoins();
