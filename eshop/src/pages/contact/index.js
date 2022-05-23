import Input from "../../components/inputs";
import TitleSection from "../../components/TitleSection";

const Index = () => {

    return (
        <div>
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
                        onChange={e => handleChange(e)}
                        required="true"
                        placeholder="Name"
                        className="form__input"      
                    />
                    <label className="label">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        onChange={e => handleChange(e)}
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
                    onChange={e => handleChange(e)}
                    required="true"
                    placeholder="Message"
                    className="form__input message"      
                />

                <label>Subscribe to our newsletter</label>
                <input type="checkbox" id="news" name="news"></input>
                <center><button type="register" className="btn__black"> ENVOYER MON MESSAGE</button></center>
            </form>
        </div>
        </div>
    )
}
export default Index;