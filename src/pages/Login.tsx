import {useState} from "react";
import {motion} from "framer-motion";
import {apiCall} from "../utils/apiCaller";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        apiCall('/login', 'POST', {email: username, password: password})
            .then((r) => {
                if(r.jwt) {
                    localStorage.setItem("auth", r.jwt);
                    navigate('/data')
                } else {
                    alert('Login failed!')
                }
            })
            .catch((r) => alert('Login failed!'));
    };

    return (
        <motion.div
            initial={{opacity: 0, y: -20}}
            animate={{opacity: 1, y: 0}}
            style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh'}}
        >
            <div style={{
                width: '24rem',
                padding: '1.5rem',
                backgroundColor: '#333',
                color: 'white',
                borderRadius: '12px',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
                <h2 style={{textAlign: 'center', marginBottom: '1rem', fontSize: '1.5rem'}}>Welcome</h2>
                <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
                    <div style={{position: 'relative'}}>
                        <input
                            type="text"
                            placeholder="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            style={{
                                paddingLeft: '40px',
                                width: '100%',
                                padding: '10px',
                                borderRadius: '6px',
                                border: 'none',
                                backgroundColor: '#555',
                                color: 'white'
                            }}
                            required
                        />
                    </div>
                    <div style={{position: 'relative'}}>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                paddingLeft: '40px',
                                width: '100%',
                                padding: '10px',
                                borderRadius: '6px',
                                border: 'none',
                                backgroundColor: '#555',
                                color: 'white'
                            }}
                            required
                        />
                    </div>
                    <button style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#4da6ff',
                        color: 'white',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        borderRadius: '6px',
                        border: 'none',
                        cursor: 'pointer',
                        transition: '0.3s'
                    }}>Sign In
                    </button>
                </form>
            </div>
        </motion.div>
    );
}

export default Login;
