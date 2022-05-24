import { useState } from "react"
import { useRouter } from "next/router";
import Link from "next/link";
import Input from "../../components/inputs";
import userService from "../../services/user.service";
import Button from "../../components/Button";
import axios from "axios";


const RegisterC = () => {
    const home = useRouter();
    const[success, setSuccess] = useState(false);
    
    const [formData, setFormData] = useState({
        email_client: '', // required
        mdp: '', // required
        nom: '' ,// required
        prenom: '', //required
        adresse: '',//required
        age: '', // required
        sexe: '' ,// required
        tel: '', //required
        name_society: ''
    });

    const [error,setError] = useState(false);

    

    function handleSubmit(e) {
        e.preventDefault()
        
        if(formData.mdp.length < 6){
            setError(true);
        }
        else
        {
            axios.post('http://localhost:80/shop-api/register_client.php',formData)
            .then(res=>
                {
                    if(res.data == "ce mail existe déjà")
                    {
                        window.confirm(formData.email_client+" est un mail déjà existant, retentez avec un autre mail")
                        window.location.reload();

                    }
                    else 
                    {
                        setError(false)
                        console.log(res)  
                        setSuccess(true)

                    }
                 
                })
            .catch(error => {
              console.log(error.response)
            });
                
        }        
    }

    function handleChange(e) {
        setFormData({...formData, [e.target.name] : e.target.value})
       
    }

    function succesRegister(){
        window.confirm("Success register client, redirect in login page !")
        home.push('/login_client')
        
    }

    return (
        
         <div>
            <form className='form' onSubmit={e => handleSubmit(e)}>
               <center> <h1>Register Client</h1></center>
                <br/>
                
                
                <Input
                    label="Email Client"
                    name="email_client"
                    id="email_client"
                    type="text"
                    classes="form__input"
                    required={true}
                    value={formData.email_client}
                    placeholder="Veuillez saisir votre email"
                    handleChange={e => handleChange(e)}
                    />
                
                <Input
                    label="Password"
                    name="mdp"
                    id="mdp"
                    type="password"
                    classes="form__input"
                    required={true}
                    value={formData.mdp}
                    placeholder="Veuillez saisir un password d'au moins 6 caractères"
                    handleChange={e => handleChange(e)}
                    />    
                  {error && <p style={{color :"red"}}>Veuillez définir un mot de passe d'au moins 6 caractères</p>}    
           
                 <Input
                    label="Nom"
                    name="nom"
                    id="nom"
                    type="text"
                    classes="form__input"
                    required={true}
                    value={formData.nom}
                    placeholder="Veuillez saisir votre nom"
                    handleChange={e => handleChange(e)}
                    />
                 <Input
                    label="Prénom"
                    name="prenom"
                    id="prenom"
                    type="text"
                    classes="form__input"
                    required={true}
                    value={formData.prenom}
                    placeholder="Veuillez saisir un prenom"
                    handleChange={e => handleChange(e)}
                    />
                
                <Input
                    label="Adresse"
                    name="adresse"
                    id="adresse"
                    type="text"
                    classes="form__input"
                    required={true}
                    value={formData.adresse}
                    placeholder="Veuillez saisir une adresse"
                    handleChange={e => handleChange(e)}
                    />

                <Input
                    label="Age"
                    name="age"
                    id="age"
                    type="number"
                    classes="form__input"
                    required={true}
                    value={formData.age}
                    placeholder="Veuillez saisir un age"
                    handleChange={e => handleChange(e)}
                    />
                

                <h3>Sexe :</h3>
                <div class="radioGroup">

                    <label for="genre">M<br />
                      <Input
                        name="sexe"
                        id="sexe"
                        type="radio"
                        classes="form__input"
                        required={true}
                        value="m"
                        handleChange={e => handleChange(e)}
                        />
                    </label>
                    
                    <label for="genre">F<br />
                        <Input
                            name="sexe"
                            id="sexe"
                            type="radio"
                            classes="form__input"
                            required={true}
                            value="f"
                            handleChange={e => handleChange(e)}
                            />
                        
                    </label>
                </div>
                
                <Input
                    label="Tel"
                    name="tel"
                    id="tel"
                    type="number"
                    classes="form__input"
                    required={true}
                    value={formData.tel}
                    placeholder="Veuillez saisir un numéro de téléphone"
                    handleChange={e => handleChange(e)}
                    />

              
                 <center><Button title="Register" classes="btn btn__color-red" type="register"/>   </center>
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

export default RegisterC;