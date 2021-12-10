import { useState } from "react";
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import axios from 'axios'

import Image from "next/image";
import natal from "../assets/natal.svg";

import styles from '../styles/Home.module.css'

export default function Index() {
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");


	const router = useRouter();

	async function handleConfirmAccess(e) {
		e.preventDefault();
		Cookies.remove('@amigo-secreto:name')
		Cookies.remove('@amigo-secreto:phone')

		const registerData = await axios.post('api/register', { name, phone })
		if (registerData.status === 202) {
			Cookies.set('@amigo-secreto:phone', registerData.data.dataValues.phone)
			Cookies.set('@amigo-secreto:name', registerData.data.dataValues.name)
			alert(`Bem vindo ${registerData.data.dataValues.name}`)
			router.push('/result');
			return null;
		}
		alert(`Vamos precisar cadastrar você primeiro!`)
		router.push('/register');
		return null;
	}

	return (
		<div className={styles.mainWrapper}>
			<Image width={150} height={150} src={natal} alt="imagem de natal" />
			<h1>Amigo secreto</h1>
			<p>Para começar, por favor informe seu telefone:</p>

			<form
				onSubmit={handleConfirmAccess}
				className={styles.mainForm}>
				<input
					type="text"
					placeholder="Telefone"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
				/>

				<button type="submit">
					Vamo dale!
				</button>

			</form>
		</div >
	);
}

