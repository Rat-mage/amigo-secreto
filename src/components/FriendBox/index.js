import Cookies from 'js-cookie'
import axios from 'axios'
import styles from '../../styles/FriendBoxt.module.css'

var accessCodeOnCookie = Cookies.get('@amigo-secreto:accessCode')

export function FriendBox({ friend }) {
  async function handleConfirmFriend() {
    if (confirm("Deseja marcar como visto? Essa decisão não pode ser desfeita!")) {
      alert("Beleza, vamos marcar seu amigo como visto!!");
      await axios.put('api/confirmfriend', { accessCode: accessCodeOnCookie })
      window.location.reload(false);
    } else {
      alert("Show! Anota ele e depois confirma, beleza?");
    }
  }

  return (
    <div className={styles.FriendBox}>
      <p>O seu amigo secreto é o(a): </p>
      <strong>{friend}</strong>
      <button onClick={handleConfirmFriend}>
        Confirmar que viu o amigo
      </button>
      <strong>* vamos sumir com ele daqui!</strong>
    </div>
  );
}

