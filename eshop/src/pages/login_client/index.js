import { useState } from "react"
import { useRouter } from "next/router";
import Input from "../../components/inputs";
import Button from "../../components/Button";
import axios from "axios";


const LoginC = () => {
    const home = useRouter();
    const[success, setSuccess] = useState(false);
    
    const [email_client, setUsername] = useState("");
    const [mdp,setPassword] = useState("");

    const [error,setError] = useState(false);

    
    function handleSubmit(e) {
        e.preventDefault()
        
        if(email_client.length < 6){
            setError(true);
        }
        else
        {
            axios.post('http://localhost:80/shop-api/authenticate_client.php',{
                identifier: email_client,
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
                        localStorage.setItem("jwt_client", res.data.jwt)
                        localStorage.setItem("client_login", JSON.stringify(res.data.user))
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
        home.push('/profil_client')
        
    }

    return (
        
         <div>
            <form className='form' onSubmit={e => handleSubmit(e)}>
                <h1>Login Client</h1>
                <br/>
                
                
                <Input
                    label="Email Client"
                    name="email_client"
                    id="email_client"
                    type="text"
                    classes="form__input"
                    required={true}
                    placeholder="Veuillez saisir votre email"
                    handleChange={(e)=>setUsername(e.target.value)}
                     value={email_client}
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
                    <p>Je n'ai pas encore e compte, je voudrais m'
                        <Link href="regiter_client">
                            <a className="nav__link">inscrire</a>
                    </Link>
                    </p>
                </center>  
                <center>
                   
                </center>   
            </form>
            {success &&  succesRegister()}
        

          </div>  
        
    )
}

export default LoginC;