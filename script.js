// clearing UI 
const clearUI = () => {
    document.getElementById('search-field').value = '';
    document.getElementById('found-result').innerText = '';
    document.getElementById('book-container').innerText = '';

}

// handling search button
document.getElementById('search-btn').addEventListener('click', () => {
    const searchText = document.getElementById('search-field').value;
    // console.log(searchText);
    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
        .then(res => res.json())
        .then(data => displayData(data))
})

const displayData = ({ docs }) => {
    // clearing UI 
    clearUI();

    // updating total found result on UI
    document.getElementById('found-result').innerText = `About ${docs.length} results found`;

    // iterating all the books
    docs.forEach(book => {
        const { author_name, title, first_publish_year, publisher, cover_i } = book;
        const imgSrc = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;

        // creating book div
        const div = document.createElement('div');
        div.classList.add('border-2', 'p-6', 'bg-gray-100', 'text-gray-700', 'rounded');
        div.innerHTML = `
            <div class="flex justify-evenly">
                <div>
                    <img src="${imgSrc}" />
                </div>
                <div class="ml-4">
                    <h3 class="text-2xl">${title}</h3>
                    <div class="mt-4">
                        <p><span class="font-semibold">Author:</span> ${author_name?.[0]}</p>
                        <p><span class="font-semibold">First Publish:</span> ${first_publish_year}</p>
                        <p><span class="font-semibold">Publisher:</span> ${publisher}</p>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('book-container').appendChild(div);
    })
}