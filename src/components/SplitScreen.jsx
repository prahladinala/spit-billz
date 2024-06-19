import React, { useState } from "react";

const SplitScreen = ({ groupSize, tripName }) => {
  const [expenses, setExpenses] = useState(
    Array.from({ length: groupSize }, () => ({ name: "", items: [] }))
  );

  const handleNameChange = (index, value) => {
    const newExpenses = [...expenses];
    newExpenses[index].name = value;
    setExpenses(newExpenses);
  };

  const handleItemChange = (personIndex, itemIndex, key, value) => {
    const newExpenses = [...expenses];
    newExpenses[personIndex].items[itemIndex][key] = value;
    setExpenses(newExpenses);
  };

  const handleAddItem = (personIndex) => {
    const newExpenses = [...expenses];
    newExpenses[personIndex].items.push({ item: "", amount: 0 });
    setExpenses(newExpenses);
  };

  const calculateTotals = () => {
    const totals = expenses.map((person) =>
      person.items.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0)
    );
    return totals;
  };

  const calculateBalances = (totals) => {
    const totalSpent = totals.reduce((sum, amount) => sum + amount, 0);
    const perPerson = totalSpent / groupSize;
    return totals.map((total) => perPerson - total);
  };

  const totals = calculateTotals();
  const balances = calculateBalances(totals);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Trip: {tripName}</h1>
      {expenses.map((person, personIndex) => (
        <div key={personIndex} className="mb-4 p-4 border">
          <input
            type="text"
            placeholder="Name"
            value={person.name}
            onChange={(e) => handleNameChange(personIndex, e.target.value)}
            className="mb-2 px-2 py-1 border"
          />
          {person.items.map((item, itemIndex) => (
            <div key={itemIndex} className="flex mb-2">
              <input
                type="text"
                placeholder="Item"
                value={item.item}
                onChange={(e) =>
                  handleItemChange(
                    personIndex,
                    itemIndex,
                    "item",
                    e.target.value
                  )
                }
                className="flex-1 px-2 py-1 border"
              />
              <input
                type="number"
                placeholder="Amount"
                value={item.amount}
                onChange={(e) =>
                  handleItemChange(
                    personIndex,
                    itemIndex,
                    "amount",
                    e.target.value
                  )
                }
                className="flex-1 px-2 py-1 border ml-2"
              />
            </div>
          ))}
          <button
            onClick={() => handleAddItem(personIndex)}
            className="px-2 py-1 bg-blue-500 text-white"
          >
            Add Item
          </button>
          <div className="mt-2">Total: {totals[personIndex]}</div>
        </div>
      ))}
      <div className="mt-4">
        <h2 className="text-xl mb-2">Balances:</h2>
        {balances.map((balance, index) => (
          <div key={index}>
            {balance > 0
              ? `${expenses[index].name} needs to send ${balance}`
              : `${expenses[index].name} receives ${-balance}`}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SplitScreen;
