import { AuthProvider } from 'react-admin';

const authProvider = {
    login: ({ email, password}) =>  {
        const request = new Request('http://127.0.0.1:8000/api/v1/login', {
            method: 'POST',
            body: JSON.stringify({ email, password}),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(auth => {
                if(auth.user.isAdmin) {
                    localStorage.setItem('auth', JSON.stringify(auth));                
                }              
            })
            .catch(() => {
                throw new Error('Network error')
            });
    },
    logout: () => {
        localStorage.removeItem('auth');
        return Promise.resolve();
    },
    checkAuth: () =>
        localStorage.getItem('auth') ? Promise.resolve() : Promise.reject({ message: 'You must be logged on to access this page. ' }),
    checkError:  (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            return Promise.reject({ redirectTo: '/unauthorized', logoutUser: false });
        }
        return Promise.resolve();
    },
    getPermissions: () => Promise.resolve()
};

export default authProvider;