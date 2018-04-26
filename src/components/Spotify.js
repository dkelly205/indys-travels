import React from "react";
import PlayWidget from 'react-spotify-widgets';
import "./Spotify.css";

const Spotify = (props) => {
	return (
		<aside id="spotify">
			<PlayWidget
				width={300}
				height={380}
				uri={'spotify:album:4XG6SGQlHvA3nD6r0gJGFx'}
				lightTheme={true}
			/>
		</aside>
	);
}

export default Spotify;
