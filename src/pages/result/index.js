import Image from "next/image";
import { useRouter } from 'next/router'
import { useState, useEffect } from "react";

import styles from '../../styles/Result.module.css'

export default function Result(props) {
  // console.log(route)





  useEffect(() => {
    // console.log(props)
  }, [])

  return (
    <div className={styles.container}>
      <p>
        Oi <strong>Gustavo!</strong>
      </p>

      <p>O seu amigo secreto é o(a):</p>

      <strong>Ossadaum</strong>

      <button>
        Confirma que viu?
      </button>
    </div>
  );
}
