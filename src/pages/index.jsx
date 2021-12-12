import { useState } from "react";
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import axios from 'axios'

import Image from "next/image";
import natal from "../assets/natal.svg";

import styles from '../styles/Home.module.css'

export default function Index() {
	const [phone, setPhone] = useState("");

	const router = useRouter();

	async function handleConfirmAccess(e) {
		e.preventDefault();
		Cookies.remove('@amigo-secreto:name')
		Cookies.remove('@amigo-secreto:phone')

		const registerData = await axios.get('/api/verify', { params: { phone: phone } })

		if (registerData.status === 202) {
			alert(`Vamos precisar cadastrar você primeiro!`)
			router.push('/register');
			return null;
		}
		Cookies.set('@amigo-secreto:phone', registerData.data.phone)
		Cookies.set('@amigo-secreto:name', registerData.data.name)
		alert(`Bem vindo ${registerData.data.name}`)
		router.push('/result');
	}

	function validatePhone(phoneToChange) {
		if (phoneToChange.length > 12) {
			alert('Telefone muito grande, tem de ser no máximo 12 caracteres!')
			let slicedPhone = phoneToChange.substring(0, 12)
			setPhone(slicedPhone)
			return null;
		}
		let phone = phoneToChange;
		let phoneChanged = phone.replace(/ /g, "")
		setPhone(phoneChanged)
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
					placeholder="048999999999"
					value={phone}
					onChange={(e) => validatePhone(e.target.value)}
					required
				/>

				<button type="submit">
					Vamo dale!
				</button>

			</form>
		</div >
	);
}

