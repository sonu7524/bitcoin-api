//using then
fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
  .then(response => response.json())
  .then(data => {
    // code to populate table with data
    populatedTable(data);
}).catch(error => console.error(error));

// Fetch data using async/await
async function fetchData() {
  try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
      const data = await response.json();
      return data;
  } catch (error) {
      console.error(error);
  }
};

// Call the async function
fetchData();

//create table of coins data
function populatedTable(data) {
    const tableBody = document.getElementById('data-table');
    tableBody.innerHTML='';
      data.forEach(row => {
        const tr = document.createElement('tr');
        
        //name cell container include (img + name text)
        const nameCell = document.createElement('td');
          nameCell.style.display = 'flex';
          nameCell.style.alignItems = 'center';
          nameCell.style.gap="10px"
  
    // create a new image element and set its src and alt attributes
          const img = document.createElement('img');
          img.src = `${row.image}`;
          img.alt = 'Image';
          img.style.backgroundColor="#D9D9D9";
            img.style.borderRadius = "100px";
            img.style.border = "1px solid black"
            img.style.width = "30px"
  
    // create a new span element and set its text content to the name
          const span = document.createElement('span');
          span.textContent = row.name;
  
    // append the image and span elements to the name cell
          nameCell.appendChild(img);
          nameCell.appendChild(span);
          tr.appendChild(nameCell);
  
        const symbol = document.createElement('td');
        symbol.textContent = row.symbol.toUpperCase();
        tr.appendChild(symbol);
  
        const price = document.createElement('td');
        price.textContent = `$${row.current_price}`;
        tr.appendChild(price);
        
        const total = document.createElement('td');
        total.textContent = `$${row.total_volume}`;
        tr.appendChild(total);
        
        const percentage = document.createElement('td');
        percentage.textContent = `${row.price_change_percentage_24h.toFixed(2)}%`;
        if(row.price_change_percentage_24h > 0){
          percentage.style.color = "green";
        }
        else percentage.style.color = "red";
        tr.appendChild(percentage);
        
        const marketcpt = document.createElement('td');
        marketcpt.textContent = `$${row.market_cap}`;
        tr.appendChild(marketcpt);
  
        tr.style.borderBottom = '1px solid white';
        
        tableBody.appendChild(tr);
      });
  };

  //sort according to market capt.
document.getElementById('mktSort').addEventListener('click', () => {
  fetchData()
      .then(data => {
      let sortedData = [];
      sortedData = data.sort((a, b) => b.market_cap - a.market_cap);
      populatedTable(sortedData);
    })
    .catch(error => console.error(error));
});

//sort according to percentage change
document.getElementById('perSort').addEventListener('click', () => {
  fetchData()
      .then(data => {
      let sortedData = [];
      sortedData = data.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
      populatedTable(sortedData);
    })
    .catch(error => console.error(error));
});

//search filter
function filterData() {
  const searchInput = document.getElementById('search');
  const searchText = searchInput.value.toLowerCase();
  fetchData()
      .then(data => {
        const filteredData = data.filter(coin =>{
          return coin.name.toLowerCase().includes(searchText) || coin.symbol.toLowerCase().includes(searchText);
        });
        populatedTable(filteredData);
      })
      .catch(error => console.error(error));
}

const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', filterData);








