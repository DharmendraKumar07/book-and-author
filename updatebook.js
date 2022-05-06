import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router=dom'
const updateBook = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [publishedOn, setPublishedOn] = React.useState('');
    const [err, setErr] = React.useState(false);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getBookDetails();
    }, [])
    const getBookDetails = async () => {
        console.log(params)
        let result = await fetch(`http://localhost:5000/${params.id}`,{
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setAuthor(result.author);
        setPublishedOn(result.publishedOn);
    }
    const updateBook = async () => {
        console.log(name, price, author, publishedOn)
        let result = fetch(`http://localhost5000/book/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({ name, price, author, publishedOn }),
            headers: {
                'content type': "application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }

        });
        result = await result.json()
        console.log(result)
        navigate('/')
    }


    return (
        <div className='book'>
            <h1>Update Book</h1>
            <input type="text" placeholder="enter book name" className='inputBox' value={name} onChange={(e) => { setName(e.target.value) }} />

            <input type="text" placeholder="Price" className='inputBox' value={price} onChange={(e) => { setPrice(e.target.value) }} />

            <input type="text" placeholder="Author Name" className='inputBox' value={author} onChange={(e) => { setAuthor(e.target.value) }} />

            <input type="text" placeholder="Published On" className='inputBox' value={publishedOn} onChange={(e) => { setPublishedOn(e.target.value) }} />

            <button onClick={updateBook} className='appButton'>Update Book</button>
        </div>
    )
}

export default updateBook;