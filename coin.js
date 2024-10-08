let coinData = []; 


async function fetchDataAsync() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
    const data = await response.json();
    coinData = data;
    renderTable(data);
  } catch (error) {
    console.error('Error:', error);
  }
}


function renderTable(data) {
  const tableBody = document.getElementById('coinTable');
  tableBody.innerHTML = ''; 

  data.forEach(coin => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${coin.id}</td>
      <td>${coin.name}</td>
      <td>${coin.symbol.toUpperCase()}</td>
      <td><img src="${coin.image}" alt="${coin.name}" width="30"></td>
      <td>$${coin.current_price.toFixed(2)}</td>
      <td>${coin.total_volume.toLocaleString()}</td>
      <td class="${coin.price_change_percentage_24h >= 0 ? 'green' : 'red'}">
          ${coin.price_change_percentage_24h.toFixed(2)}%
      </td>
      <td class="mkt-cap">Mkt Cap: $${coin.market_cap.toLocaleString()}</td>
    `;
    tableBody.appendChild(row);
  });
}


function searchData() {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  const filteredData = coinData.filter(coin =>
    coin.name.toLowerCase().includes(searchInput) || 
    coin.symbol.toLowerCase().includes(searchInput)
  );
  renderTable(filteredData);
}


function sortByMarketCap() {
  const sortedData = [...coinData].sort((a, b) => b.market_cap - a.market_cap);
  renderTable(sortedData);
}


function sortByPercentage() {
  const sortedData = [...coinData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
  renderTable(sortedData);
}


fetchDataAsync();
