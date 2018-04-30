import React from "react";
import "./JourneySelect.css";

const JourneySelect = (props) => {
	let content;

	if(props.selectedFilm){
		content = (
			<React.Fragment>
				<h2>{props.selectedFilm}</h2>
				<button onClick={props.onNextButtonClicked}>Next</button>
				<button onClick={props.onResetButtonClicked}>Reset</button>
			</React.Fragment>
		);
	}else{
		content = (
			<React.Fragment>
				<ul>
					<li><a onClick={() => {props.select("raiders")}} href="#">Raiders of the Lost Ark</a></li>
					<li><a onClick={() => {props.select("temple")}} href="#">Temple of Doom</a></li>
					<li><a onClick={() => {props.select("crusade")}} href="#">Last Crusade</a></li>
				</ul>
			</React.Fragment>
		);
	}

	return (
		<main>
			<h1>Indy's Journeys</h1>
			{content}
		</main>
	);
};

export default JourneySelect;
