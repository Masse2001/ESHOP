/* eslint-disable import/no-anonymous-default-export */
const apiUrl = "http://localhost:80/shop-api";
export default {
    register(payload) {
		return fetch(`${apiUrl}/insert_fournisseur.php`,{
			method: "POST",
			headers: {
				"Content-Type": "Application/json",
			},
			body: JSON.stringify(payload),
		}).then((res) => res.json());
	},

	getMeFournisseur(jwt) {
        return fetch(`${apiUrl}/listfournisseur.php`, {
			method: "GET",
			headers: {
				"Content-Type": "Application/json",
                "Authorization": `Bearer ${jwt}`,
			},
		}).then((res)=>res.json())
    },
	
	getMeClient(jwt) {
        return fetch(`${apiUrl}/listclient.php`, {
			method: "GET",
			headers: {
				"Content-Type": "Application/json",
                "Authorization": `Bearer ${jwt}`,
			},
		}).then((res)=>res.json())
    }
	
	
};