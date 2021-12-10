import Cookies from 'js-cookie'
import api from '../../utils/api';

import styles from '../../styles/FriendBoxt.module.css'

var phoneOnCookie = Number(Cookies.get('@amigo-secreto:phone'))

export function FriendBox({ friend }) {
  async function handleConfirmFriend() {
    await api.put('api/confirmfriend', { phone: phoneOnCookie })
  }

  return (
    <div className={styles.FriendBox}>
      <p>O seu amigo secreto é </p>
      <strong>{friend}</strong>
      <button onClick={handleConfirmFriend}>
        Confirma que viu seu amigo?
      </button>
      <strong>* vamos sumir com ele daqui!</strong>
    </div>
  );
}

