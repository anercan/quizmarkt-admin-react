import React, {useEffect, useState} from 'react';
import {apiCall} from "../utils/apiCaller";

const Users: React.FC = () => {
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [idInput, setIdInput] = useState('');
    const [premiumCount, setPremiumCount] = useState<number | null>(null);

    useEffect(() => {
        filterTodaysUsers();
    }, []);

    const fetchUsers = async (filters: { premiumType?: string, id?: string }) => {
        const response = await apiCall('/get-users-filter', 'POST', filters);
        const activePremiumCount = response.filter((user: any) => isPremiumValid(user?.premiumInfo?.expireDate)).length;
        setPremiumCount(activePremiumCount);
        setFilteredUsers(response);
    };

    const filterTodaysUsers = () => {
        fetchUsers({});
    };

    const filterPremiumUsers = () => {
        fetchUsers({premiumType: 'LEVEL1'});
    };

    const getUserById = () => {
        fetchUsers({id: idInput.trim()});
    };

    const formatExpireDate = (timestamp: number) => {
        if (timestamp) {
            const date = new Date(timestamp);
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');

            return `${day}.${month}.${year} - ${hours}:${minutes}`;
        }
        return '';
    };

    const isPremiumValid = (expireDate: any): boolean => {
        const currentDate = new Date();
        const expireDateObj = new Date(expireDate);
        return expireDateObj > currentDate;
    };

    const getPremiumStatus = (premiumInfo: any) => {
        if (premiumInfo.premiumType === 'NONE') {
            return 'Free';
        }

        if (premiumInfo.expireDate && isPremiumValid(premiumInfo.expireDate)) {
            return 'Premium (Active)';
        } else {
            return 'Premium (Expired)';
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.filtersContainer}>
                <div style={styles.filterButtons}>
                    <button style={styles.button} onClick={filterTodaysUsers}>
                        Today's New Users
                    </button>
                    <button style={{...styles.button, marginLeft: '10px'}} onClick={filterPremiumUsers}>
                        Premium Users {'('+premiumCount+')'}
                    </button>
                </div>

                <div style={styles.searchContainer}>
                    <input
                        type="text"
                        placeholder="Enter user ID"
                        value={idInput}
                        onChange={e => setIdInput(e.target.value)}
                        style={styles.input}
                    />
                    <button style={styles.button} onClick={getUserById}>
                        Search
                    </button>
                </div>
            </div>

            <ul style={styles.userList}>
                {filteredUsers.length > 0 ? (
                    filteredUsers.map(user => (
                        <li key={user.id} style={styles.userListItem}>
                            <div style={styles.userInfo}>
                                <strong style={{color: '#a1e2be'}}>{user.name}</strong> ({user.id} - App: {user.appId}) <br/>
                                <span>Email: {user.email}</span> <br/>
                                <span>Created: {new Date(user.createdDate).toLocaleString()}</span> <br/>
                                <span style={styles.userStatus}>
                                    {getPremiumStatus(user.premiumInfo) + ' ' + formatExpireDate(Number(user?.premiumInfo?.expireDate))}
                                </span><br/>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </ul>
        </div>
    );
};

type User = {
    id: string;
    name: string;
    createdDate: string;
    email: string;
    avatarUrl: string;
    appId: number;
    premiumInfo: {
        premiumType: string;
        expireDate: string | null;
        subscriptionId: string | null;
        purchaseToken: string | null;
    };
};

// Doğru tipte stil objesi
const styles: { [key: string]: React.CSSProperties } = {
    container: {
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#96d5ca',
        padding: '12px 20px',
        borderRadius: '6px',
        marginBottom: '10px',
        border: 'none',
        cursor: 'pointer',
    },
    input: {
        width: '250px',
        borderWidth: '1px',
        borderColor: '#ccc',
        padding: '10px',
        borderRadius: '4px',
        marginBottom: '10px',
    },
    filtersContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: '20px',
    },
    filterButtons: {
        display: 'flex',
    },
    searchContainer: {
        display: 'flex',
        alignItems: 'center',
    },
    userList: {
        listStyleType: 'none',
        paddingLeft: '0',
        width: '100%',
        maxWidth: '800px',
    },
    userListItem: {
        backgroundColor: '#868282',
        padding: '15px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        marginBottom: '10px',
    },
    userInfo: {
        fontSize: '16px',
        lineHeight: '1.6',
    },
    userStatus: {
        fontWeight: 'bold',
        color: '#dedea2',
    },
};

export default Users;
