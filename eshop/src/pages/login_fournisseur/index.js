import { useState } from "react"
import { useRouter } from "next/router";
import Link from "next/link";
import Input from "../../components/inputs";
import userService from "../../services/user.service";
import Button from "../../components/Button";
import axios from "axios";


const LoginF = () => {
    const home = useRouter();
    const[success, setSuccess] = useState(false);
    
    const [email_fournisseur, setUsername] = useState("");
    const [mdp,setPassword] = useState("");

    const [error,setError] = useState(false);

    
    function handleSubmit(e) {
        e.preventDefault()
        
        if(email_fournisseur.length < 6){
            setError(true);
        }
        else
        {
            axios.post('http://localhost:80/shop-api/authenticate_fournisseur.php',{
                identifier: email_fournisseur,
                password: mdp
            })
            .then(res=>
                {
                    if(res.data == "error")
                    {
                        window.confirm("l\'email ou le mdp est inexistant")
                        window.location.reload();

                    }
                    else 
                    {
                        setError(false)
                        console.log(res)
                        localStorage.setItem("jwt_fournisseur", res.data.jwt)
                        localStorage.setItem("fournisseur_login", JSON.stringify(res.data.user))
                        localStorage.setItem("fournisseur_email", JSON.stringify(res.data.user.email_fournisseur))
                        setSuccess(true)
                    }    
                })
            .catch(error => {
              console.log(error.response)
            });
                
        }        
    }

   /* function handleChange(e) {
        setFormData({...formData, [e.target.name] : e.target.value})
    }*/

    function succesRegister(){
        window.confirm("Success register, redirect in login page !")
        home.push('/profil_fournisseur')
        
    }

    return (
        
         <div>
            <form className='form' onSubmit={e => handleSubmit(e)}>
                <h1>Register Fournisseur</h1>
                <br/>
                
                
                <Input
                    label="Email Fournisseur"
                    name="email_fournisseur"
                    id="email_fournisseur"
                    type="text"
                    classes="form__input"
                    required={true}
                    placeholder="Veuillez saisir votre email"
                    handleChange={(e)=>setUsername(e.target.value)}
                     value={email_fournisseur}
                    />
                
                <Input
                    label="Password"
                    name="mdp"
                    id="mdp"
                    type="password"
                    classes="form__input"
                    required={true}
                    placeholder="Veuillez saisir un password d'au moins 6 caractères"
                    handleChange={(e)=>setPassword(e.target.value)}
                    value={mdp}
                    />    
                  {error && <p style={{color :"red"}}>Veuillez définir un mot de passe d'au moins 6 caractères</p>}    
           
    
                 <center><Button title="Login" classes="btn btn__color-red" type="register"/>   </center>
                 <br/>
                <center><hr/></center>
                <br/>
                <center>
                   
                </center>   
            </form>
            {success &&  succesRegister()}
        

          </div>  
        
    )
}

export default LoginF;