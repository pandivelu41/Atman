import React from 'react'

const Todo = () => {

    const Fetchtodo = async () => {
        const res = await fetch('https://jsonplaceholder.typicode.com/todos')
        const data =  res.json()
        console.log(data)
    }
    return (
        <div onClick={Fetchtodo}>Get Todo</div>
    )
}

export default Todo