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
            <h1 className="header">
                Fast React Pizza Co.
            </h1>
        </header>
    );
}

const Menu = () => (
    <div className="menu">
        <h2>Our Menu</h2>
        <Pizza name='Focaccia'
               ingredients='Bread with italian olive oil and rosemary'
               photoSrc='pizzas/focaccia.jpg'
               price={10}/>
        <Pizza name='Pizza Margherita'
               ingredients='Tomato and mozarella'
               photoSrc='pizzas/margherita.jpg'
               price={12}/>
    </div>
)

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

const Pizza = (props) => {
    console.log(props)
    return (
        <div className="pizza">
            <img src={props.photoSrc} alt={props.name}/>
            <h3>{props.name}</h3>
            <p>{props.ingredients}</p>
            <span>{props.price}</span>
        </div>
    )
}


const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<React.StrictMode><App/></React.StrictMode>)
