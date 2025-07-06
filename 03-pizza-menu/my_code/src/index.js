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

        <ul className="pizzas">
            {pizzaData.map(pizzaInfo => (
                <Pizza pizzaInfo={pizzaInfo} key={pizzaInfo.name}/>
            ))}
        </ul>
    </main>
)

const Pizza = (props) => {
    const pizzaInfo = props.pizzaInfo;
    return (
        <li className="pizza">
            <img src={pizzaInfo.photoName} alt={pizzaInfo.name}/>
            <div>
                <h3>{pizzaInfo.name}</h3>
                <p>{pizzaInfo.ingredients}</p>
                <span>{pizzaInfo.price}</span>
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

    // if (isOpen)
    //     alert("We're currently open !")
    // else
    //     alert("Sorry we're closed")

    return (
        <footer className="footer">
            {new Date().toLocaleTimeString()}. We're currently open
        </footer>
    )
    //React.createElement('footer', null, "We're currently open")
}


const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<React.StrictMode><App/></React.StrictMode>)
