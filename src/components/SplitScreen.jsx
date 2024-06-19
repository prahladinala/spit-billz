import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SplitScreen = ({ groupSize, tripName }) => {
  const [expenses, setExpenses] = useState(
    Array.from({ length: groupSize }, () => ({ name: "", items: [] }))
  );
  const navigate = useNavigate();

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
    toast.info("Add the item name and amount");
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

  const handleShare = async () => {
    const data = {
      tripName,
      expenses,
      createdAt: new Date().toISOString(),
    };
    try {
      //   console.log("CLICKED");
      const docRef = await addDoc(collection(db, "bills"), data);
      //   console.log(docRef);
      navigate(`/bill/${docRef.id}`);
      // Copy to Clipboard
      const billLink = `${window.location.origin}/bill/${docRef.id}`;
      await navigator.clipboard.writeText(billLink);
      toast.success("Copied the bill link to clipboard");
    } catch (error) {
      console.error("Error sharing the bill:", error);
      toast.error("Oops! unable to share the bill");
    }
  };

  const totals = calculateTotals();
  const balances = calculateBalances(totals);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 lg:px-8">
      <div className="w-full max-w-2xl p-4 bg-white shadow sm:rounded-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Bill for : {tripName}
        </h1>
        {expenses.map((person, personIndex) => (
          <div key={personIndex} className="mb-4 p-4 border rounded-md">
            <input
              type="text"
              placeholder="Name"
              value={person.name}
              onChange={(e) => handleNameChange(personIndex, e.target.value)}
              className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mb-2"
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
                  className="flex-1 block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="flex-1 block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ml-2"
                />
              </div>
            ))}
            <button
              onClick={() => handleAddItem(personIndex)}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add Item
            </button>
            <div className="mt-2 text-right font-semibold">
              Total: {totals[personIndex]}
            </div>
          </div>
        ))}
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2 text-center">Balances:</h2>
          {balances.map((balance, index) => (
            <div key={index} className="text-center">
              {balance > 0
                ? `${expenses[index].name} needs to send ${balance}`
                : `${expenses[index].name} receives ${-balance}`}
            </div>
          ))}
        </div>
        <button
          onClick={handleShare}
          className="flex w-full justify-center rounded-md bg-green-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 mt-4"
        >
          Share with Friends
        </button>
      </div>
    </div>
  );
};

export default SplitScreen;
