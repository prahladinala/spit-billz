import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase"; // Adjust the path as needed
import { doc, getDoc } from "firebase/firestore";
import logo from "/logot.png";

const BillScreen = () => {
  const { id } = useParams();
  const [bill, setBill] = useState(null);

  useEffect(() => {
    const fetchBill = async () => {
      try {
        console.log("Fetching bill data for ID:", id);
        const billRef = doc(db, "bills", id);
        const billSnap = await getDoc(billRef);

        if (billSnap.exists()) {
          setBill(billSnap.data());
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching bill details:", error);
      }
    };

    fetchBill();
  }, [id]);

  if (!bill) {
    return <div>Loading...</div>;
  }

  const totals = bill.expenses.map((person) =>
    person.items.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0)
  );

  const totalSpent = totals.reduce((sum, amount) => sum + amount, 0);
  const perPerson = totalSpent / bill.expenses.length;
  const balances = totals.map((total) => perPerson - total);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 lg:px-8">
      <div className="w-full max-w-2xl p-4 bg-white shadow sm:rounded-lg">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img className="mx-auto h-20 w-auto" src={logo} alt="Your Company" />
        </div>
        <h1 className="text-2xl mt-4 font-bold mb-4 text-center">
          Bill for : {bill.tripName}
        </h1>
        {bill.expenses.map((person, personIndex) => (
          <div
            key={personIndex}
            className="mb-4 p-4 border rounded-md shadow-sm"
          >
            <h2 className="text-xl font-semibold mb-2">{person.name}</h2>
            {person.items.map((item, itemIndex) => (
              <div key={itemIndex} className="flex mb-2">
                <span className="flex-1 block rounded-md py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
                  {item.item}
                </span>
                <span className="flex-1 block rounded-md py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 ml-2">
                  {item.amount}
                </span>
              </div>
            ))}
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
                ? `${bill.expenses[index].name} needs to send ${balance}`
                : `${bill.expenses[index].name} receives ${-balance}`}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillScreen;
