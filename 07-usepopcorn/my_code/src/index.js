import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import StarRating from "./components/StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        {/*<App/>*/}
        <StarRating />
        <StarRating
            maxRating={4}
            color={"red"}
            messages={["Ugly", "Mehh", "Okay", "Nice"]}
            defaultRating={3}
            onSetRating
        />
    </React.StrictMode>
);
