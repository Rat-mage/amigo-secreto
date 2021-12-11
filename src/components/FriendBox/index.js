import Cookies from 'js-cookie'
import axios from 'axios'
import styles from '../../styles/FriendBoxt.module.css'

var phoneOnCookie = Cookies.get('@amigo-secreto:phone')

export function FriendBox({ friend }) {
  async function handleConfirmFriend() {
    await axios.put('api/confirmfriend', { phone: phoneOnCookie })
    if (confirm("Deseja marcar como visto? Essa decisão não pode ser desfeita!")) {
      alert("Beleza, vamos marcar seu amigo como visto!!");
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

