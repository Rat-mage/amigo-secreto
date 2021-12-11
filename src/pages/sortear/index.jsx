import Image from 'next/image'
import axios from 'axios'
import styles from '../../styles/Sortear.module.css'
import { useEffect, useState } from 'react';

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

        {Object.keys(users).map((name, i) => (
          <div key={i} className={styles.nomes}>
            <p>{i + 1} {users[name].name}</p>
            <p>{users[name].visualized ? ' ✔' : ' ❌'}</p>
          </div>
        ))}

      </div>
      <button onClick={handleDraw}>
        <img src='https://c.tenor.com/OH7SMS7CNQ0AAAAM/cartas-sorteio.gif' />
      </button>
    </div>
  );
}
