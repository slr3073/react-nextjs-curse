import React from "react";
import ReactDOM from "react-dom/client"
import './index.css'

const pizzaData = [
    {
        name: "Focaccia",
        ingredients: "Bread with italian olive oil and rosemary",
        price: 6,
        photoName: "pizzas/focaccia.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Margherita",
        ingredients: "Tomato and mozarella",
        price: 10,
        photoName: "pizzas/margherita.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Spinaci",
        ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
        price: 12,
        photoName: "pizzas/spinaci.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Funghi",
        ingredients: "Tomato, mozarella, mushrooms, and onion",
        price: 12,
        photoName: "pizzas/funghi.jpg",
        soldOut: false,
    },
    {
        name: "Pizza Salamino",
        ingredients: "Tomato, mozarella, and pepperoni",
        price: 15,
        photoName: "pizzas/salamino.jpg",
        soldOut: true,
    },
    {
        name: "Pizza Prosciutto",
        ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
        price: 18,
        photoName: "pizzas/prosciutto.jpg",
        soldOut: false,
    },
];

const App = () => (
    <div className="container">
        <Header/>
        <Menu/>
        <Footer/>
    </div>
)

const Header = () => {
    return (
        <header className="header">
            <h1>Fast React Pizza Co.</h1>
        </header>
    );
}

const Menu = () => (
    <main className="menu">
        <h2>Our Menu</h2>

        {pizzaData.length > 0 ? (
            <>
                <p>
                    Authentic Italian cuisine & creative dishes to choose from. All from
                    our stone oven, all organic, all delicious
                </p>
                <ul className="pizzas">
                    {pizzaData.map(pizzaInfo => (
                        <Pizza pizzaInfo={pizzaInfo} key={pizzaInfo.name}/>
                    ))}
                </ul>
            </>
        ) : (
            <p>We 're still working on our menu. Please come back later :</p>
        )}
    </main>
)

const Pizza = ({pizzaInfo}) => {
    // if (pizzaInfo.soldOut) return null

    return (
        // <li className={"pizza " + (pizzaInfo.soldOut ? "sold-out" : "")}>
        <li className={`pizza ${pizzaInfo.soldOut ? "sold-out" : ""}`}>
            <img src={pizzaInfo.photoName} alt={pizzaInfo.name}/>
            <div>x
                <h3>{pizzaInfo.name}</h3>
                <p>{pizzaInfo.ingredients}</p>
                <span>{pizzaInfo.soldOut ? 'Sold out' : pizzaInfo.price}</span>
            </div>
        </li>
    )
}

const Footer = () => {
    const hour = new Date().getHours()
    const openHour = 8;
    const closeHour = 22;
    const isOpen = hour >= openHour && hour <= closeHour
    console.log(isOpen)

    return (
        <footer className="footer">
            {isOpen ? <Order closeHour={closeHour} openHour={openHour}/> :
                <p>We're happy to welcome you between {openHour}:00 and {closeHour}:00.</p>}
        </footer>
    )
    //React.createElement('footer', null, "We're currently open")
}

const Order = ({closeHour, openHour}) => {
    return (
        <div className="order">
            <p>
                We're open from {openHour}:00 to {closeHour}: 00. Come visit us or order online.
            </p>
            <button className="btn">Order</button>
        </div>
    )
}


const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<React.StrictMode><App/></React.StrictMode>)
