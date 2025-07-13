export default function Stats({items}) {
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
