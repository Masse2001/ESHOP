import Input from "../../components/inputs";
import TitleSection from "../../components/TitleSection";
import { useState } from "react";

const Index = () => {

    const [nom, setNom] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Sending')

        let data = {
            nom,
            email,
            message
        }

        fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
        }).then((res) => {
            console.log('Response received')
            if (res.status === 200) {
                console.log('Response succeeded!')
                window.confirm("Votre message a été bien envoyé :"+nom);
                window.location.reload();
                setSubmitted(true) 
                setNom('')
                setEmail('')
                setMessage('')
            }
        })
    }    

    return (
        <div  style={{marginBottom : '160px'}}> 
            <center><TitleSection title="CONTACTEZ NOUS" /></center>
            <div className="contact__box">
            <div className="infos__box">
                <p>As you might expect of a company that began as a high-end interiors contractor, we pay strict attention</p>
                <p>FRANCE</p>
                <p>12 Rue de La Mode, 75 004 Paris <br/>+33 01 XX XX XX XX<br/>+33 01 XX XX XX XX</p>
            </div>
            <form className="contact__form">
                <div>
                    <label className="label">Nom</label>
                    <input
                        type="text"
                        id="nom"
                        name="nom"
                        onChange={(e)=>{setNom(e.target.value)}}
                        required="true"
                        placeholder="Name"
                        className="form__input"      
                    />
                    <label className="label">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={(e)=>{setEmail(e.target.value)}}
                        required="true"
                        placeholder="Email"
                        className="form__input"      
                    />
                </div>
                
                <label className="label">Message</label>
                <input
                    type="text"
                    id="msg"
                    name="msg"
                    onChange={(e)=>{setMessage(e.target.value)}}
                    required="true"
                    placeholder="Message"
                    className="form__input message"      
                />

                <label>Subscribe to our newsletter</label>
                <input type="checkbox" id="news" name="news"></input>
                <center><button type="register" onClick={(e)=>{handleSubmit(e)}} className="btn__black"> ENVOYER MON MESSAGE</button></center>
            </form>
        </div>
        </div>
    )
}
export default Index;