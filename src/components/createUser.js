import React, {useState} from 'react';
import axios from 'axios';

function CreateUser() {
    const [username, setUserName] = useState('');

    const onChangeUsername = (e) => {
        setUserName(e.target.value)
    }
    
    const onSubmit = (e) => {
        e.preventDefault();
        const newUser = {
          username: username,
        };
        console.log(newUser);

        axios.post('http://localhost:5000/users/add', newUser)
            .then(res => console.log(res.data));
        
        setUserName('')
      }

    return (
        <div className="container">
            <h3>Utwórz nowego użytkownika</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group"> 
                <label>Username: </label>
                <input  type="text"
                    required
                    className="form-control"
                    value={username}
                    onChange={onChangeUsername}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Utwórz" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default CreateUser;
