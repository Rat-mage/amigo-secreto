import { useEffect, useState } from 'react';
import Image from 'next/image'
import axios from 'axios'

import loteryDrawImg from '../../assets/loterydraw.png'

import styles from '../../styles/Sortear.module.css'

export default function Result() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/api/names').then((result) => {
      setUsers(result.data)
    })
  }, [])

  function handleDraw() {
    axios.put('/api/draw').then((data) => {
      alert('SORTEADO!')
    });

  }

  return (
    <div className={styles.container}>
      <h1>Hora do sorteio!</h1>

      <strong>Participantes | Já viu o amigo?</strong>
      <div className={styles.nomesDiv}>

        {Object.keys(users).map((name, index) => (
          <div key={index} className={styles.nomes}>
            <p>{index + 1}. {users[name].name}</p>
            <p>{users[name].visualized ? ' ✔' : ' ❌'}</p>
          </div>
        ))}

      </div>
      <button onClick={handleDraw}>
        <Image src={loteryDrawImg} width={200} height={200} priority />
      </button>
    </div>
  );
}
