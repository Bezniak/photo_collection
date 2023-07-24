import React, {useEffect, useState} from 'react';
import './index.scss';
import {Collection} from "./Collection";


const cats = [
    {"name": "All"},
    {"name": "Sea"},
    {"name": "Mountains"},
    {"name": "Architecture"},
    {"name": "Cities"}
];


function App() {

    const [collection, setCollection] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [categoryId, setCategoryId] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);


    useEffect(() => {
        setIsLoading(true);

        const category = categoryId ? `category=${categoryId}` : '';

        fetch(`https://64bd0ba02320b36433c75d8e.mockapi.io/api/photo_collections?page=${page}&limit=3&${category}`)
            .then((res) => res.json())
            .then((json) => {
                setCollection(json);
            })
            .catch((err) => {
                console.log(err);
                alert('Error while getting data');
            })
            .finally(() => setIsLoading(false))
    }, [categoryId, page]);

    return (
        <div className="App">
            <h1>My photo collection</h1>
            <div className="top">
                <ul className="tags">
                    {cats.map((obj, index) => (
                        <li onClick={() => setCategoryId(index)}
                            className={categoryId === index ? 'active' : ''}
                            key={obj.name}
                        >
                            {obj.name}
                        </li>
                    ))
                    }
                </ul>
                <input value={searchValue}
                       onChange={e => setSearchValue(e.target.value)}
                       className="search-input"
                       placeholder="Search by name"
                />
            </div>
            <div className="content">
                {isLoading
                    ? <h2>Loading...</h2>
                    : (
                        collection
                            .filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
                            .map((obj, index) => (<Collection key={index} name={obj.name} images={obj.photos}/>))
                    )
                }
            </div>
            <ul className="pagination">
                {
                    [...Array(3)].map((_, i) => <li key={i} onClick={() => setPage(i + 1)}
                                                    className={page === (i + 1) ? 'active' : ''}>{i + 1}</li>)
                }
            </ul>
        </div>
    );
}

export default App;
