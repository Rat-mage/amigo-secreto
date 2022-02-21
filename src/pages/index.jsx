import { useState } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'
import Cookies from 'js-cookie'
import axios from 'axios'

import Image from "next/image";
import natal from "../assets/natal.svg";

import styles from '../styles/Home.module.css'

export default function Index() {
	const [accessCode, setAccessCode] = useState("");

	const router = useRouter();

	async function handleConfirmAccess(e) {
		e.preventDefault();
		Cookies.remove('@amigo-secreto:name')
		Cookies.remove('@amigo-secreto:accessCode')

		const registerData = await axios.get('/api/verify', { params: { accessCode: accessCode } })

		if (registerData.status === 202) {
			alert(`Vamos precisar cadastrar você primeiro!`)
			router.push('/register');
			return null;
		}
		Cookies.set('@amigo-secreto:name', registerData.data.name)
		Cookies.set('@amigo-secreto:accessCode', registerData.data.accessCode)
		alert(`Bem vindo ${registerData.data.name}`)
		router.push('/result');
	}


	return (
		<div className={styles.mainWrapper}>
			<Image width={150} height={150} src={natal} alt="imagem de natal" />
			<h1>Amigo secreto</h1>
			<p>Para começar, por favor informe seu código secreto:</p>

			<form
				onSubmit={handleConfirmAccess}
				className={styles.mainForm}>
				<input
					type="password"
					placeholder="Código secreto"
					value={accessCode}
					onChange={(e) => setAccessCode(e.target.value)}
					required
				/>

				<button type="submit">
					Acessar
				</button>

				<p>Caso seja seu primeiro acesso, clique <Link href="/register"><strong>aqui</strong></Link> e realize seu cadastro.</p>

			</form>
		</div >
	);
}

