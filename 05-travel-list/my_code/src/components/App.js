import "../index.css"
import {useState} from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
    const [items, setItems] = useState([])

    function handleAddItem(item) {
        setItems(items => [...items, item])
    }

    function handleRemoveItem(id) {
        setItems(items => items.filter((item => item.id !== id)))
    }

    function handleClearItems() {
        if (items.length === 0) return

        const confirmed = window.confirm('Are you sure you want to delete all items ?')
        if (confirmed) setItems([])
    }

    function handleToggleItem(id) {
        setItems(items => items.map(item =>
            item.id === id ? {...item, packed: !item.packed} : item)
        )
    }

    return (
        <div className="app">
            <Logo/>
            <Form onAddItem={handleAddItem}/>
            <PackingList items={items} onRemoveItem={handleRemoveItem} onToggleItem={handleToggleItem} onClearItems={handleClearItems}/>
            <Stats items={items}/>
        </div>
    )
}