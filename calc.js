
        const API_URL = 'https://api.coindesk.com/v1/bpi/currentprice/BTC.json';

        async function fetchBitcoinPrice() {
            const response = await fetch(API_URL);
            const data = await response.json();
            return data.bpi.USD.rate_float;
        }

        async function updateCosts() {
            const quantity = parseInt(document.getElementById('quantity').value);
            const hashrate = parseFloat(document.getElementById('model').value); // TH/s
            const bitcoinPrice = await fetchBitcoinPrice(); // USD

            const monthlyBitcoinOutput = calculateMonthlyBitcoinOutput(hashrate); // BTC
            const monthlyMiningOutput = monthlyBitcoinOutput * bitcoinPrice; // USD
            const hostingFee = 205 * quantity;

            document.getElementById('mining-output').textContent = `$${(monthlyMiningOutput * quantity).toFixed(2)}`;
        }

        function calculateMonthlyBitcoinOutput(hashrate) {
            const secondsInMonth = 30 * 24 * 60 * 60;
            const bitcoinPerBlock = 6.25; // BTC per block
            const networkHashrate = 150000; // Example: 150 EH/s (adjust based on current network hashrate)

            const blocksPerMonth = secondsInMonth / 600; // Bitcoin block time: 600 seconds
            const monthlyBitcoinOutput = (hashrate * 1e12 / (networkHashrate * 1e18)) * blocksPerMonth * bitcoinPerBlock;

            return monthlyBitcoinOutput*30;
        }

        document.getElementById('decrease').addEventListener('click', function() {
            let quantityInput = document.getElementById('quantity');
            let currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
                updateCosts();
            }
        });

        document.getElementById('increase').addEventListener('click', function() {
            let quantityInput = document.getElementById('quantity');
            quantityInput.value = parseInt(quantityInput.value) + 1;
            updateCosts();
        });

        document.getElementById('model').addEventListener('change', updateCosts);

        document.addEventListener('DOMContentLoaded', updateCosts);
