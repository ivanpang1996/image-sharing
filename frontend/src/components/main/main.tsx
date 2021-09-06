import React, {useEffect, useState} from 'react';

function Main() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState<any[]>([]);

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        fetch("http://localhost:8080/images?pageIndex=1")
            .then(res => res.json())
            .then(
                (response) => {
                    setIsLoaded(true);
                    setItems(response.images);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Error: </div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <ul>
                {items.map(item => (
                    <li key="1">
                        <img src={item.imageURL} alt=""></img>
                        Author: {item.author}
                    </li>
                ))}
            </ul>
        );
    }
}

export default Main;