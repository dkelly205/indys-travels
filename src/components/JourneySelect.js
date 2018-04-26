import React from "react";
import "./JourneySelect.css";

const JourneySelect = (props) => {
	let nextButton;

	if(props.selectedFilm){
		nextButton = <button onClick={props.onNextButtonClicked}>Next</button>
	}else{
		nextButton = null;
	}

	return (
		<main>
			<h1>Indy's Journeys</h1>
			<ul>
				<li><a onClick={() => {props.select("raiders")}} href="#">Raiders of the Lost Ark</a></li>
				<li><a onClick={() => {props.select("temple")}} href="#">Temple of Doom</a></li>
				<li><a onClick={() => {props.select("crusade")}} href="#">Last Crusade</a></li>
			</ul>
			{nextButton}
		</main>
	);
};

export default JourneySelect;
