import React, {useEffect,useState} from 'react';
import { useRouter } from 'next/router'

const withAuthC = (WrappedComponent) => {
    return (props)=>{

        const Router = useRouter();
        const [authVerified, setAuthVerified] = useState(false);

        useEffect( () => {
            const token = localStorage.getItem('jwt_client');
            if(!token) {
                Router.push("/login_client")
            }
            else{
                setAuthVerified(true)
            }

            
        }, [Router]);
        if(authVerified) {
            return <WrappedComponent {...props} />
        }
        else {
            return null;
        }

    }
};

export default withAuthC;