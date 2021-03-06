import { useState } from "react"
import { useRouter } from "next/router";
import Input from "../../components/inputs";
import Button from "../../components/Button";
import axios from "axios";
import Link from "next/link";


const login = () => {
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
        window.confirm("Success Login, allez valider votre panier !")
        home.push('/cart')
        
    }

    return (
        
         <div>
            <form className='form' onSubmit={e => handleSubmit(e)}>
               <center>  <h1>Login Client</h1></center>
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
                    placeholder="Veuillez saisir un password d'au moins 6 caract??res"
                    handleChange={(e)=>setPassword(e.target.value)}
                    value={mdp}
                    />    
                  {error && <p style={{color :"red"}}>Veuillez d??finir un mot de passe d'au moins 6 caract??res</p>}    
           
    
                 <center><Button title="Login" classes="btn btn__color-red" type="register"/>   </center>
                 <br/>
                <center><hr/></center>
                <br/>
                <center>
                    <p>Vous n'avez pas de compte ?
                        <Link href="register_client">
                            <a className="nav__link" style={{color : 'black', fontWeight :'bold'}}> Inscrivez-vous </a>
                        </Link>
                    </p>
                </center>  
               
            </form>
            {success &&  succesRegister()}
        

          </div>  
        
    )
}

export default login;