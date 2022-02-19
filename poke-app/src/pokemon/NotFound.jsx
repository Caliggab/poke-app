import React from "react";
import Poke from "../assets/img/avatar.svg";
import styles from "./NotFound.module.css"

const NotFound = () => {
	return (
		<div className={styles.notFoundContainer}>
			<h3>404! 😭 Not Found!</h3>
			<img src={Poke} alt="404 Not Found" className={styles.image}/>
			<p>
				The Pokemon you were looking for was not found{" "}
				<span role="img" aria-label="smile">
					😭
				</span>
			</p>
		</div>
	);
};

export default NotFound;
