import { useRef } from "react";
import "./App.css";

const data = [];
let stream;
function App() {
	const videoRef = useRef();
	const shareScreen = async () => {
		if (navigator.mediaDevices.getDisplayMedia) {
			stream = await navigator.mediaDevices.getDisplayMedia({
				audio: true,
				video: {
					cursor: "always",
				},
			});
			const mr = new MediaRecorder(stream);
			mr.ondataavailable = (chnk) => {
				console.log(chnk.data);
				data.push(chnk.data);
			};
			mr.start(1000);
			mr.onstop = (e) => {
				console.log(e);
				const videoUrl = URL.createObjectURL(
					new Blob(data, { type: "video/mp4" })
				);
				alert(videoUrl);
				videoRef.current.src = videoUrl;
			};
			videoRef.current.srcObject = stream;
		}
	};
	return (
		<div className="App">
			<button onClick={() => shareScreen()}>Playing</button>
			<button
				onClick={() => {
					let tracks = videoRef.current.srcObject.getTracks();
					tracks.forEach((track) => track.stop());
					videoRef.current.srcObject = null;
				}}
			>
				Play
			</button>
			<header className="App-header">
				<video width={800} height={800} ref={videoRef} autoPlay controls />
			</header>
		</div>
	);
}

export default App;
