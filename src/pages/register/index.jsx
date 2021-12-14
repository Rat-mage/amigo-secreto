import { useState } from "react";
import { useRouter } from 'next/router'
import Cookies from 'js-cookie'
import Image from "next/image";
import axios from 'axios'

import natal from "../../assets/natal.svg";

import styles from '../../styles/Home.module.css'

export default function Register() {
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");

	const router = useRouter();

	async function handleRegister(e) {
		e.preventDefault();
		const registerData = await axios.post('api/register', { name, phone })
		Cookies.remove('@amigo-secreto:name')
		Cookies.remove('@amigo-secreto:phone')

		if (registerData.status === 202) {
			alert(`Esse número já ta cadastrado em nome de ${registerData.data.dataValues.name}! Volte uma casa e entra novamente.`)
			router.push('/')
			return null
		}

		Cookies.set('@amigo-secreto:name', registerData.data.dataValues.name)
		Cookies.set('@amigo-secreto:phone', registerData.data.dataValues.phone)
		alert(`bem vindo ao nosso amigo secreto ${registerData.data.dataValues.name}!`)
		router.push('/result');
		return null;
	}


	function validatePhone(phoneToChange) {
		if (phoneToChange.length > 12) {
			alert('Senha muito grande, tem de ser no máximo 12 caracteres!')
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

			<p>Precisamos só do seu nome e uma senha :</p>

			<form
				onSubmit={handleRegister}
				className={styles.mainForm}>
				<input
					type="text"
					placeholder="Nome"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>

				<input
					type="password"
					placeholder="Senha"
					value={phone}
					onChange={(e) => validatePhone(e.target.value)}
					required
				/>

				<button type="submit">
					Cadastrar!
				</button>

			</form>
		</div >
	);
}

