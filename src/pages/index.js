import { useState } from "react";
import { useRouter } from 'next/router'

import Image from "next/image";
import natal from "../assets/natal.svg";

import api from '../utils/api'
import styles from '../styles/Home.module.css'

export default function Index() {
	const [name, setName] = useState("");
	const [phone, setPhone] = useState(0);
	const [user, setUser] = useState({});

	const router = useRouter();

	async function handleConfirmAccess(e) {
		e.preventDefault();
		const registerData = await api.post('api/register', { name, phone })
		if (registerData.status === 202) {
			alert(registerData.data.message)
			return null
		}
		setUser(registerData);
		alert(`bem vindo ao nosso amigo secreto ${registerData.data.dataValues.name}!`)
		router.push('/result');
	}

	return (
		<div className={styles.mainWrapper}>
			<Image width={150} height={150} src={natal} alt="imagem de natal" />

			<h1>Amigo secreto</h1>
			<p>Este é seu primeiro acesso, preciamos de poucos dados:</p>


			<form
				onSubmit={handleConfirmAccess}
				className={styles.mainForm}>
				<input
					type="text"
					placeholder="Nome"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>

				<input
					type="text"
					placeholder="Telefone"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
				/>

				<button type="submit" style={{ margin: 10 }}>
					Participar
				</button>

			</form>
		</div >
	);
}
