import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import axios from 'axios'
import styles from '../../styles/Result.module.css'
import { FriendBox } from "../../components/FriendBox";

export default function Result() {
  const [friend, setFriend] = useState("");

  var nameOnCookie = Cookies.get('@amigo-secreto:name')
  var phoneOnCookie = Number(Cookies.get('@amigo-secreto:phone'))

  useEffect(() => {
    axios.get('api/result', { params: { phone: phoneOnCookie } }).then((result) => {
      setFriend(result.data.amigosecreto)
    })

  }, [])

  return (
    <div className={styles.container}>
      <p>
        Oi <strong>{nameOnCookie}!</strong>
      </p>

      {(() => {
        switch (friend) {
          case 'semsorteio':
            return (
              <p>O sorteio ainda não foi realizado</p>
            )
          case "javisto":
            return (
              <p>Como você já viu seu amigo, escondemos ele para ninguem mais ver!</p>
            )
          default:
            return (
              <FriendBox friend={friend} />
            )
        }
      })()}


    </div>
  );
}
