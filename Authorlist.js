import React, { useState, useEffect } from 'react'


const Authorlist = () => {
    const [author, setAuthor] = useState([]);

    useEffect(() => {
        getAuthor();
    }, [])
    const getAuthor = async () => {
        let result = await fetch('http://localhost:5000/Author-list');
        result = await result.json();
        setAuthor(result);

    }
    const deleteAuthor = async (id) => {
        let result = await fetch(`http://localhost:5000/Author/${id}`, {
            method:"delete"
        });
        result = await result.json()
        if(result){
            getAuthor();
        }
    }

    return (
        <div claaName="author-list">
            <h3>Author List with Book</h3>

            <ul>
                <li>S.No</li>
                <li>Author</li>
                <li>Age</li>
                <li>Book</li>
                <li>DateOfBirth</li>
                <li>Operation</li>
            </ul>
            {
                book.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.Author}</li>
                        <li>{item.Age}</li>
                        <li>{item.Book}</li>
                        <li>{item.DateOfBirth}</li>
                        <li><button onClick={() => deleteAuthor(item._id)}>Delete</button> </li>
                    </ul>
                )
            }


        </div>
    )
}

export default Authorlist;