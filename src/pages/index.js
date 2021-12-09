import Image from "next/image";
import { useState } from "react";
import natal from "../assets/natal.svg";

import estilo from "../styles/Index.module.css";

export default function Index() {
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [phone, setPhone] = useState("");

	function handleConfirmAccess(e) {
		e.preventDefault();
		console.log(name, password, phone);
	}

	return (
		<div
			style={{
				alignItems: "center",
				justifyContent: "center",
				flexDirection: "column",
				display: "flex",

				height: "100%",
			}}>
			<Image width={150} height={150} src={natal} alt="imagem de natal" />

			<h1>Amigo secreto</h1>
			<p>Este é seu primeiro acesso, preciamos de poucos dados:</p>

			<form
				onSubmit={handleConfirmAccess}
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
					width: 200,
				}}>
				<input
					type="text"
					placeholder="Nome"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>

				<input
					type="text"
					placeholder="48 98765 3214"
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
				/>

				<button type="submit" style={{ margin: 10 }}>
					Participar
				</button>
			</form>
		</div>
	);
}
