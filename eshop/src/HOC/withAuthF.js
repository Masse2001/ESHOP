import React, {useEffect,useState} from 'react';
import { useRouter } from 'next/router'

const withAuthF = (WrappedComponent) => {
    return (props)=>{

        const Router = useRouter();
        const [authVerified, setAuthVerified] = useState(false);

        useEffect( () => {
            const token = localStorage.getItem('jwt_fournisseur');
            if(!token) {
                Router.push("/login_fournisseur")
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

export default withAuthF;