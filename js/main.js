const inputText = document.getElementById('input-text');
const display = document.getElementById('books');
const bookImage = document.getElementById('book-img');
const bookName = document.getElementById('book-name');
const authorName = document.getElementById('author-name');
const publication = document.getElementById('first-piblication');
const spinner = document.getElementById('spiners');


// Search Input Function
const searchClick = () => {
    const text = inputText.value;
    inputText.value = '';
    const url = `https://openlibrary.org/search.json?q=${text}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayBook(data))
}

//Book Count Function
const displayBook = books => {
    document.getElementById('total-search').innerText = `12 of ${books.numFound}`;
    display.textContent = '';

    //books.numFound


    //Error Handling
    if (books.docs.length === 0) {

        display.innerHTML = `
        <div class="col-md-12 text-center">
            <div class="error-template">
                <h1>
                    Oops!</h1>
                <h2>
                    404 Not Found</h2>
                <div class="error-details">
                    Sorry, The page you requested was not found!
                </div>
            </div>
        </div>
        `;
    }


    // get single book
    books.docs.slice(0, 12).forEach(book => {
        console.log(book);

        //Book Cover
        const cover = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;

        const div = document.createElement("div");
        div.classList.add("col");
        //Book Information Details
        div.innerHTML = `
                <div class="p-3 border bg-light" style="
                height: 500px;">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="d-block m-auto pb-3" style="width:200px; height:250px;" />
                <h5 class="">${book.title.slice(0, 30)}</h2><br>
                <p class=""><b>Author:</b> ${book.author_name ? book.author_name[0].slice(0, 30) : 'Unknown author'}</p>
                <p class=""><b>First Published:</b> ${book.first_publish_year ? book.first_publish_year : 'Unknown'}</p>
                <p class=""><b>Publisher:</b> ${book.publisher ? book.publisher[0].slice(0, 20) : 'Unknown'}</p>
                </div>
        `;
        display.appendChild(div);
    });
}