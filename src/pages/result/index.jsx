import { useState, useEffect } from "react";
import Link from 'next/link'
import Cookies from 'js-cookie'
import axios from 'axios'
import { AiOutlineHome } from 'react-icons/ai'

import { FriendBox } from "../../components/FriendBox"; 3
import styles from '../../styles/Result.module.css'

export default function Result() {
  const [friend, setFriend] = useState("");

  var nameOnCookie = Cookies.get('@amigo-secreto:name')
  var phoneOnCookie = Cookies.get('@amigo-secreto:phone')

  useEffect(() => {
    axios.get('api/result', { params: { phone: phoneOnCookie } }).then((result) => {
      setFriend(result.data.amigosecreto)
    })

  }, [])

  return (
    <div className={styles.container}>
      <Link href='/'>
        <AiOutlineHome size={25} color='#dd3f3f' />
      </Link>

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
