import React from "react";
import styles from "./Stats.module.css";

function Stats(props) {
  return (
    <div className={styles.statsContainer}>
      <div className={styles.statsTitle}>Stats</div>
      <div className={styles.hp}>Hp: {props.hp}</div>
      <progress id="hp" value={props.hp} max="130" />
      <div className={styles.attack}>Attack: {props.attack}</div>
      <progress id="hp" value={props.attack} max="130" />
      <div className={styles.defense}>Defense: {props.defense}</div>
      <progress id="hp" value={props.defense} max="130" />
      <div className={styles.spAttack}>
        Special Attack: {props.specialAttack}
      </div>
      <progress id="hp" value={props.specialAttack} max="130" />
      <div className={styles.spDefense}>
        Special Defense: {props.specialDefense}
      </div>
      <progress id="hp" value={props.specialDefense} max="130" />
      <div className={styles.speed}>Speed: {props.speed}</div>
      <progress id="hp" value={props.speed} max="130" />
    </div>
  );
}

export default Stats;
