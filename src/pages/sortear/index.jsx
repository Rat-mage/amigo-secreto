import Image from 'next/image'
import axios from 'axios'
import styles from '../../styles/Result.module.css'


export default function Result() {

  function handleDraw() {
    axios.put('/api/draw').then((data) => {
      console.log(data)
      alert(`foi? ${data}`)
    });
  }

  return (
    <div className={styles.container}>
      <h1>Hora do sorteio!</h1>

      <button onClick={handleDraw}>
        <img src='https://c.tenor.com/OH7SMS7CNQ0AAAAM/cartas-sorteio.gif' />
      </button>
    </div>
  );
}
