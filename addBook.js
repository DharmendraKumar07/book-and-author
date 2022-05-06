import React from 'react'

const AddBook = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [publishedOn, setPublishedOn] = React.useState('');
    const [err, setErr] = React.useState(false);
    const addBook = async () => {
        //check entry validation of book details
        console.log(!name);
        if (!name || !price || !author || !publishedOn) {
            setErr(true)
            return false;
        }


        console.log(name, price, author, publishedOn);
        //get local user data
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost5000/add-book", {
            method: 'post',
            body: JSON.stringify({ name, price, author, publishedOn }),
            headers: {
                "content-type": "application/json",
                 authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        });
        result = await result.json();
        console.log(result)
    }
    return (
        <div className='addBook'>
            <h1>Add Book</h1>
            <input type="text" placeholder="enter book name" className='inputBox' value={name} onChange={(e) => { setName(e.target.value) }} />
            {err && !name && <span className='invalid input'>Enter valid name</span>}
            <input type="text" placeholder="Price" className='inputBox' value={price} onChange={(e) => { setPrice(e.target.value) }} />
            {err && !price && <span className='invalid input'>Enter this field</span>}
            <input type="text" placeholder="Author Name" className='inputBox' value={author} onChange={(e) => { setAuthor(e.target.value) }} />
            {err && !author && <span className='invalid input'>Enter this field</span>}
            <input type="text" placeholder="Published On" className='inputBox' value={publishedOn} onChange={(e) => { setPublishedOn(e.target.value) }} />
            {err && !publishedOn && <span className='invalid input'>Enter this field</span>}
            <button>Add Book</button>
        </div>
    )
}

export default AddBook;