document.addEventListener('DOMContentLoaded', function () {
    const demonsGrid = document.querySelector('.demons-grid');
    const rankFilter = document.getElementById('rank-filter');
    const abilityFilter = document.getElementById('ability-filter');

    // Fetch the external XML data
    fetch('https://beelzebabe.neocities.org/home/Bookz/Infernalspirits.xml')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");
            const spirits = xmlDoc.getElementsByTagName('spirit');

            // Convert XML data to an array of demon objects
            const demons = Array.from(spirits).map(spirit => ({
                id: spirit.getAttribute('id'),
                number: spirit.getAttribute('number'),
                name: spirit.getElementsByTagName('name')[0].textContent,
                rank: spirit.getElementsByTagName('rank')[0].textContent,
                seal: spirit.getElementsByTagName('seal')[0].textContent,
                description: spirit.getElementsByTagName('description')[0].textContent
            }));

            // Render demon cards
            function renderDemons(filteredDemons) {
                demonsGrid.innerHTML = '';
                filteredDemons.forEach(demon => {
                    const demonCard = document.createElement('div');
                    demonCard.className = 'demon-card';
                    demonCard.innerHTML = `
                        <h3>${demon.name}</h3>
                        <div class="rank">${demon.rank}</div>
                        <div class="seal">Seal: ${demon.seal}</div>
                        <div class="description">${demon.description}</div>
                    `;
                    demonsGrid.appendChild(demonCard);
                });
            }

            // Initial render of all demons
            renderDemons(demons);

            // Filter by rank
            rankFilter.addEventListener('change', function () {
                const selectedRank = rankFilter.value.toLowerCase();
                const filteredDemons = demons.filter(demon =>
                    selectedRank === 'all' || demon.rank.toLowerCase().includes(selectedRank)
                );
                renderDemons(filteredDemons);
            });

            // Filter by ability
            abilityFilter.addEventListener('change', function () {
                const selectedAbility = abilityFilter.value.toLowerCase();
                const filteredDemons = demons.filter(demon =>
                    selectedAbility === 'all' || demon.description.toLowerCase().includes(selectedAbility)
                );
                renderDemons(filteredDemons);
            });

            // Handle demon card clicks for detailed view
            demonsGrid.addEventListener('click', function (event) {
                const demonCard = event.target.closest('.demon-card');
                if (demonCard) {
                    const demonName = demonCard.querySelector('h3').textContent;
                    const demon = demons.find(d => d.name === demonName);
                    if (demon) {
                        showDemonDetails(demon);
                    }
                }
            });

            // Function to show detailed view of a demon
            function showDemonDetails(demon) {
                const detailSection = document.createElement('div');
                detailSection.className = 'demon-detail';
                detailSection.innerHTML = `
                    <h3>${demon.name}</h3>
                    <div class="rank">${demon.rank}</div>
                    <div class="number">Number: ${demon.number}</div>
                    <div class="seal">Seal: ${demon.seal}</div>
                    <div class="description">${demon.description}</div>
                    <button class="close-btn">Close</button>
                `;
                document.body.appendChild(detailSection);

                // Close button functionality
                const closeBtn = detailSection.querySelector('.close-btn');
                closeBtn.addEventListener('click', function () {
                    detailSection.remove();
                });
            }
        })
        .catch(error => {
            console.error('Error fetching or parsing the XML file:', error);
            demonsGrid.innerHTML = `<p class="error">Failed to load demon data. Please try again later.</p>`;
        });
});