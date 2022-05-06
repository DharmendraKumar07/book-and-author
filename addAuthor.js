import React from 'react'

const AddAuthor = () => {
    const [name, setName] = React.useState('');
    const [age, setAge] = React.useState('');
    const [book, setBook] = React.useState('');
    const [dateOfBirth, setDateOfBirth] = React.useState('');
    const [err,setErr]=React.useState(false);
    const addAuthor = async () => {
        //check entry validation of authors details
         console.log(!name);
         if(!name || !age || !book || !dateOfBirth)
         {
            setErr(true) 
            return false;
         }


        console.log(name, age, book, dateOfBirth);
        //get local data
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost5000/add-book",{
            method:'post',
            body:JSON.stringify({name,age,book,dateOfBirth}),
            headers:{
                "content-type":"application/json"
            }
        });
        result = await result.json();
        console.log(result)
    }
    return (
        <div className='addAuthor'>
            <h1>Add Author</h1>
            <input type="text" placeholder="enter author name" className='inputBox' value={name} onChange={(e) => { setName(e.target.value) }} />
            {err && !name &&<span className='invalid input'>Enter valid name</span>}
            <input type="text" placeholder="Age" className='inputBox' value={age} onChange={(e) => { setAge(e.target.value) }} />
            {err && !age &&<span className='invalid input'>Enter this field</span>}
            <input type="text" placeholder="Book" className='inputBox' value={book} onChange={(e) => { setBook(e.target.value) }} />
            {err && !book &&<span className='invalid input'>Enter this field</span>}
            <input type="text" placeholder="DateOfBirth" className='inputBox' value={dateOfBirth} onChange={(e) => { setDateOfBirth(e.target.value) }} />
            {err && !dateOfBirth &&<span className='invalid input'>Enter this field</span>}
            <button>Add Author</button>
        </div>
    )
}

export default AddAuthor;