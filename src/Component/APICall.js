import React from 'react';
import './APICall.css'
class APICall extends React.Component {

    // Constructor
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            DataisLoaded: false
        };
    }

    // Called immediately after a component is mounted. Setting state here will trigger re-rendering.
    componentDidMount() {
        fetch(
            "https://reqres.in/api/users")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true,
                });
            })
    }
    handleEvent=(e)=>{
        localStorage.setItem('currentUser', JSON.stringify(e));
    }
    render() {
        const { DataisLoaded, items } = this.state;
        const datum = items.data;
        if (!DataisLoaded) return <div>
            <h1>Wait for some time.... </h1> </div>;

        return (
            <div className="App">
                {
                    datum.map((element) => (
                        <details key={element.id} className='users' >
                            <summary onClick={()=>{this.handleEvent(element)}} className="header">{element.first_name}</summary><br/>
                            <p className="details">
                                <span className="leftside">
                                    <img src={element.avatar} alt={element.first_name} />
                                </span>
                                <span className="rightside">
                                    First name : {element.first_name}<br />
                                    Last name  : {element.last_name}<br />
                                    Email : {element.email}
                                </span>
                            </p>
                        </details>))
                }
            </div>
        )
    }
}

export default APICall;
