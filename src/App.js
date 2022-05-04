import React, { useEffect } from 'react';
import './App.css';
import { useState } from 'react';

function App() {
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState([]);
  const domain = 'https://reqres.in/';
  const toggle = (i,element) => {
    if (selected === i) {
      return setSelected(null)
    }
    localStorage.setItem('currentUser',JSON.stringify(element))
    setSelected(i)
  }
  useEffect(() => {
    fetch(`${domain}api/users`)
      .then(res => res.json())
      .then((result) => {
        setIsLoaded(true);
        setData(result.data);
      }, (error) => {
        setIsLoaded(true);
        setError(error);
      })

  }, [])
  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>Loading....</div>
  }
  else {
    return (
      <div className="Wrapper">
        <div className='accordian'>
          {
            data.map((element, i) => {
              return <div className='item' key={element.id}>
                <div className='title' onClick={() => toggle(i,element)}>
                  <h2>{element.first_name}</h2>
                  <span>{selected === i ? '-' : '+'}</span>
                </div>
                <div className={
                  selected === i ? 'content show' : 'content'
                }>
                  <table>
                    <tr>
                      <td><img src={element.avatar} alt={element.first_name} /></td>
                      <td className='details'>
                        First name: {element.first_name}<br/>
                        Last name: {element.last_name}<br/>
                        Email: {element.email}<br/>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            })
          }
        </div>
      </div>
    );
  }
}
export default App;
