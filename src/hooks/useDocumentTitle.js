import { useEffect } from "react";

export default function useDocumentTitle(title) {
	console.log("TITLE", title);
	useEffect(() => {
		document.title = title;
		return () => {
			console.log("Clean up...");
		};
	});
}
