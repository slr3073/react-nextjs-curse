import "./index.css"
import {useState} from "react";

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

function Logo() {
    return (
        <h1>🌴 Far Away 🧳</h1>
    )
}

function Form({onAddItem}) {
    const [description, setDescription] = useState("")
    const [quantity, setQuantity] = useState(1)

    function handleSubmit(event) {
        event.preventDefault()

        if (!description) return

        const newItem = {id: Date.now(), description, quantity, packed: false}
        onAddItem(newItem)

        setDescription("")
        setQuantity(1)
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your 😍 trip ?</h3>
            <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                {Array.from({length: 20}, (_, i) => i + 1).map((num) => (
                    <option value={num} key={num}>
                        {num}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Item..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button>Add</button>
        </form>
    )
}

function PackingList({items, onRemoveItem, onToggleItem, onClearItems}) {
    const [sortBy, setSortBy] = useState('input')
    let sortedItems = items;

    if (sortBy === "description") {
        sortedItems = items.slice()
            .sort((a, b) => a.description.localeCompare(b.description))
    } else if (sortBy === "packed") {
        sortedItems = items.slice()
            .sort((a, b) => Number(a.packed) - Number(b.packed))
    }

    return (
        <div className="list">
            <ul>
                {
                    sortedItems.map(item => <Item
                        item={item}
                        key={item.id}
                        onRemoveItem={onRemoveItem}
                        onToggleItem={onToggleItem}
                    />)
                }
            </ul>
            <div className="actions">
                <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
                    <option value='input'>Sort by input order</option>
                    <option value='description'>Sort by description</option>
                    <option value='packed'>Sort by packed status</option>
                </select>
                <button onClick={() => {onClearItems()}}>Clear list</button>
            </div>
        </div>
    )
}

function Item({item, onRemoveItem, onToggleItem}) {
    return (
        <li>
            <input
                type="checkbox"
                value={item.packed}
                onChange={() => onToggleItem(item.id)}
            />
            <span style={item.packed ? {textDecoration: "line-through"} : {}}>
                {item.quantity} {item.description}
            </span>
            <button onClick={() => onRemoveItem(item.id)}>❌</button>
        </li>
    )
}

function Stats({items}) {
    if (!items.length) {
        return (
            <p className="stats">
                <em>Start adding some items to your packing list 👌</em>
            </p>
        )
    }


    const itemNumber = items.length
    const packedItemNumber = items.filter((item) => item.packed).length
    const percentPacked = Math.round((packedItemNumber / itemNumber) * 100)

    return (
        <footer className="stats">
            {percentPacked ?? percentPacked === 100 ?
                <em>You got everything! Ready to go 🐎</em>
                : <em>😎 You have {itemNumber} items on your list, and you already
                    packed {packedItemNumber} ({percentPacked}%)</em>
            }
        </footer>
    )
}
