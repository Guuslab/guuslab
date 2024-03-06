var firstResult = null;
var searchInput = document.getElementById('search');

// Get the previous search value from local storage
var previousSearchValue = localStorage.getItem('searchValue');
if (previousSearchValue) {
    searchInput.value = previousSearchValue;
    searchInput.focus();
}

function executeSearch(searchValue) {
    var gridItems = document.querySelectorAll('.grid-item');

    // Reset the border of the previous firstResult
    if (firstResult) {
        firstResult.style.border = '';
    }

    firstResult = null; // Reset firstResult at the start of each search

    gridItems.forEach(function(gridItem) {
        var img = gridItem.querySelector('img');
        var imgAlt = img ? img.alt.toLowerCase() : '';
        var dateElement = gridItem.querySelector('.date');
        var date = dateElement ? dateElement.textContent.toLowerCase() : '';
        var idElement = gridItem.querySelector('.id');
        var id = idElement ? idElement.textContent.toLowerCase().replace('#', '') : '';

        // Replace dashes and underscores with spaces in the searchValue
        var modifiedSearchValue = searchValue.replace(/[-_]/g, ' ');

        // Check if the modifiedSearchValue is in imgAlt, imgTitle, imgSrc, date, id
        var matches = imgAlt.includes(modifiedSearchValue) ||
                      date.includes(modifiedSearchValue) ||
                      id.includes(modifiedSearchValue);

        if (matches) {
            gridItem.style.display = '';

            // Set firstResult to the first visible grid item
            if (!firstResult && modifiedSearchValue !== '') {
                firstResult = gridItem;
                firstResult.style.border = '5px solid white'; // Add border to the first result
            }
        } else {
            gridItem.style.display = 'none';
        }
    });
};

// Execute the search immediately when the page is loaded
executeSearch(previousSearchValue);

searchInput.addEventListener('input', function(e) {
    var searchValue = e.target.value.toLowerCase();
    localStorage.setItem('searchValue', searchValue); // Save the search value in local storage
    executeSearch(searchValue);
});

document.getElementById('search').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        if (this.value === '') {
            this.blur();
        } else if (firstResult) {
            window.location.href = firstResult.querySelector('a').href; // Open the link of the first result
        }
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === '/') {
        e.preventDefault(); // Prevent the slash from being typed
        searchInput.focus(); // Focus on the search input
    }
});