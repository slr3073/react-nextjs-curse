import {useState} from "react";

const initialFriends = [
    {
        id: 118836,
        name: "Clark",
        image: "https://i.pravatar.cc/48?u=118836",
        balance: -7,
    },
    {
        id: 933372,
        name: "Sarah",
        image: "https://i.pravatar.cc/48?u=933372",
        balance: 20,
    },
    {
        id: 499476,
        name: "Anthony",
        image: "https://i.pravatar.cc/48?u=1714ae89-ddff-401e-a053-8697fbcd8cd5",
        balance: 0,
    },
];

function Button({onClick, children}) {
    return <button className="button" onClick={onClick}>{children}</button>
}

export default function App() {
    const [showAddFriendForm, setShowAddFriendForm] = useState(false)
    const [selectedFriend, setSelectedFriend] = useState()
    const [friendList, setFriendList] = useState(initialFriends)

    function handleSelectFriend(friend) {
        setShowAddFriendForm(false)
        if (friend === selectedFriend) {
            setSelectedFriend(undefined)
            return
        }
        setSelectedFriend(friend)
    }

    function handleAddFriend(friend) {
        setFriendList((friends) => [...friends, friend])
        setShowAddFriendForm(false)
    }

    function handleSplitBill(value) {
        setFriendList(friends => friends.map(friend =>
                friend === selectedFriend
                    ? {...friend, balance: friend.balance + value}
                    : friend
            )
        )
        setSelectedFriend(undefined)
    }

    return (
        <div className="app">
            <div className="sidebar">
                <FriendList friends={friendList} selectedFriend={selectedFriend} onSelectFriend={handleSelectFriend}/>
                {showAddFriendForm && <AddFriendForm onAddFriend={handleAddFriend}/>}
                <Button onClick={() => setShowAddFriendForm((show) => !show)}>
                    {showAddFriendForm ? "Close" : "Add a friend"}
                </Button>
            </div>

            {
                selectedFriend && <SplitBillForm selectedFriend={selectedFriend} onSplitBill={handleSplitBill}
                />
            }
        </div>
    )
}

function FriendList({friends, selectedFriend, onSelectFriend}) {
    return (
        <ul>
            {friends.map((friend) => (
                <Friend friend={friend} selectedFriend={selectedFriend} key={friend.id}
                        onSelectFriend={onSelectFriend}/>
            ))}
        </ul>
    )
}

function Friend({friend, selectedFriend, onSelectFriend}) {
    return (
        <li className={friend === selectedFriend ? "selected" : ""}>
            <img src={friend.image} alt={friend.name}/>
            <h3>{friend.name}</h3>

            {friend.balance < 0 && (
                <p className="red">
                    You owe {friend.name} {Math.abs(friend.balance)} €
                </p>
            )}
            {friend.balance > 0 && (
                <p className="green">
                    {friend.name} owe you {Math.abs(friend.balance)} €
                </p>
            )}
            {friend.balance === 0 && (
                <p>
                    You and {friend.name} are even
                </p>
            )}

            <Button onClick={() => onSelectFriend(friend)}>
                {selectedFriend === friend ? "Close" : "Select"}
            </Button>
        </li>
    )
}

function AddFriendForm({onAddFriend}) {
    const [name, setName] = useState("")
    const [imageUrl, setImageUrl] = useState("https://i.pravatar.cc/48")

    function handleSubmit(e) {
        e.preventDefault()
        if (!name || !imageUrl) return;

        const id = crypto.randomUUID()
        const newFriend = {
            name,
            imageUrl: `${imageUrl}?u=${id}`,
            balance: 0,
            id
        }

        console.log(newFriend)
        onAddFriend(newFriend)

        resetForm()
    }

    function resetForm() {
        setName("")
        setImageUrl("https://i.pravatar.cc/48")
    }

    return (
        <form className="form-add-friend" onSubmit={handleSubmit}>
            <label>💃 Friend name</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <label>🖼️ Image url</label>
            <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
            />

            <Button>Validate</Button>
        </form>
    )

}

function SplitBillForm({onSplitBill, selectedFriend}) {
    const [expense, setExpense] = useState("")
    const [yourExpense, setyourExpense] = useState("")
    const paidByFriend = expense ? expense - yourExpense : ""
    const [youPayed, setYouPayed] = useState(true)

    function handleSubmit(e) {
        e.preventDefault()

        if (!expense || !yourExpense) return

        onSplitBill(youPayed ? paidByFriend : -yourExpense)
    }

    return (
        <form className="form-split-bill" onSubmit={handleSubmit}>
            <h2>Split a bill with {selectedFriend.name}</h2>

            <label>😎 Bill value</label>
            <input type="text" value={expense} onChange={(e) => setExpense(Number(e.target.value))}/>

            <label>✌️ Your expense</label>
            <input type="text" value={yourExpense}
                   onChange={(e) => setyourExpense(
                       Number(e.target.value) > expense ? expense : Number(e.target.value)
                   )}
            />

            <label>😘 {selectedFriend.name}'s expense</label>
            <input type="text" disabled value={expense - yourExpense}/>

            <label>😶‍🌫️ Who is paying the bill ?</label>
            <select value={youPayed ? "user" : "friend"}
                    onChange={(e) => setYouPayed(e.target.value === "user")}>
                <option value="user">You</option>
                <option value="friend">{selectedFriend.name}</option>
            </select>

            <Button>Validate</Button>
        </form>
    )
}