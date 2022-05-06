import React, { useState, useEffect } from 'react'


const Booklist = () => {
    const [book, setBook] = useState([]);

    useEffect(() => {
        getBook();
    }, [])
    const getBook = async () => {
        let result = await fetch('http://localhost:5000/Book-list', {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setBook(result);

    }
    const deleteBook = async (id) => {
        let result = await fetch(`http://localhost:5000/Book/${id}`, {
            method: "delete",
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json()
        if (result) {
            getBook();
        }
    }

    const searchHandle = async (e) => {
        let key = e.target.value
        let result = await fetch(`http://localhost:5000/search/${key}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result) {
            setBook(result)
        }

    }

    return (
        <div claaName="book-list">
            <h3>Book List with author</h3>
            <input type="text" placeholder='search book'
                onChange={searchHandle}
            />

            <ul>
                <li>S.No</li>
                <li>Book</li>
                <li>Author</li>
                <li>Price</li>
                <li>PublishedOn</li>
                <li>Operation</li>
            </ul>
            {
                book.length > 0 ? book.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.Book}</li>
                        <li>{item.Author}</li>
                        <li>{item.Price}</li>
                        <li>{item.PublishedOn}</li>
                        <li><button onClick={() => deleteBook(item._id)}>Delete</button>
                            <link to={"/update/id" + item._id}>Update</link> </li>
                    </ul>
                )
                    : <h1>No result found</h1>

            }


        </div>
    )
}

export default Booklist;