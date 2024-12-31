import React, { useState, useEffect } from 'react';

const AddNewBills = () => {
  const [newBillName, setNewBillName] = useState('');
  const [newBillAmount, setNewBillAmount] = useState('');
  const [newBillWeek, setNewBillWeek] = useState('');
  const [newBillDate, setNewBillDate] = useState('');
  const [billsList, setBillsList] = useState(() => {
    const savedBills = localStorage.getItem('billsList');
    return savedBills ? JSON.parse(savedBills) : [];
  });
  
  const [editIndex, setEditIndex] = useState(null);
  const [editBillName, setEditBillName] = useState('');
  const [editBillAmount, setEditBillAmount] = useState('');
  const [editBillWeek, setEditBillWeek] = useState('');
  const [editBillDate, setEditBillDate] = useState('');

  useEffect(() => {
    localStorage.setItem('billsList', JSON.stringify(billsList));
  }, [billsList]);

  const handleAddNewBill = () => {
    if (newBillName && newBillAmount && newBillWeek && newBillDate) {
      const newBill = {
        name: newBillName,
        amount: parseFloat(newBillAmount),
        week: newBillWeek,
        date: newBillDate,
        paid: false,
      };
      setBillsList([...billsList, newBill]);
      setNewBillName('');
      setNewBillAmount('');
      setNewBillWeek('');
      setNewBillDate('');
    }
  };

  const togglePaid = (index) => {
    const updatedBills = [...billsList];
    updatedBills[index].paid = !updatedBills[index].paid;
    setBillsList(updatedBills);
  };

  const handleEditBill = (index, newName, newAmount, newWeek, newDate) => {
    const updatedBills = [...billsList];
    updatedBills[index] = {
      ...updatedBills[index],
      name: newName,
      amount: parseFloat(newAmount),
      week: newWeek,
      date: newDate, 
    };
    setBillsList(updatedBills);
    setEditIndex(null);
  };

  const handleDeleteBill = (index) => {
    const updatedBills = [...billsList];
    updatedBills.splice(index, 1);
    setBillsList(updatedBills);
  };

  const countPaidBills = () => {
    return billsList.filter(bill => bill.paid).length;
  };

  const calculatePaidFraction = () => {
    const paidBillsCount = billsList.filter(bill => bill.paid).length;
    const totalBillsCount = billsList.length;
    return `${paidBillsCount}/${totalBillsCount}`;
  };

  const calculatePaidPercentage = () => {
    const paidBills = billsList.filter(bill => bill.paid);
    const totalBills = billsList.length;
    return totalBills > 0 ? ((paidBills.length / totalBills) * 100).toFixed(2) : 0.00;
  };

  const dateDue = (date) => {
    const [year, month, day] = date.split('-');
    const yearFormatter = year.length === 4 ? year : year.slice(0, 4);
    return `${month}/${day}/${yearFormatter}`;
  };

  return (
    <div className="content-wrapper">
      <div className="content">
        <table>
          <tbody className="progress">
            <tr>
              <th>Bills Paid</th>
              <td>{calculatePaidFraction()}</td>
            </tr>

            <tr>
              <th>Bills Left</th>
              <td>{billsList.length - countPaidBills()}</td>
            </tr>

            <tr>
              <th>Progress</th>
              <td>{calculatePaidPercentage()}%</td>
            </tr>
          </tbody>
        </table>

        <div className="content--submission">
          <h1>Add New Bill</h1>
          <div className="submission-data">
            <div className="submission-data-content">
              <div className="submit--name-amount">
                <div className="submit-name">
                  <label htmlFor="billName">Bill Name</label>
                  <input
                    type="text"
                    id="billName" 
                    name="billName" 
                    placeholder="Enter Bill Name"
                    maxLength={25}
                    value={newBillName}
                    onChange={(e) => setNewBillName(e.target.value)}
                    required
                  />
                </div>
                <div className="submit-amount">
                  <label htmlFor="billAmount">Amount</label>
                  <input
                    type="number"
                    id="billAmount"
                    step="0.01"
                    inputMode="decimal"
                    name="billAmount"
                    placeholder="$0.00"
                    value={newBillAmount}
                    onChange={(e) => setNewBillAmount(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="submit--week-datedue">
                <div className="submit-week">
                  <label htmlFor="billWeek">Week of Bill</label>
                  <select
                    id="billWeek"
                    value={newBillWeek}
                    onChange={(e) => setNewBillWeek(e.target.value)}
                  >
                    <option value="">Select Week</option>
                    <option value="Week 1">Week 1</option>
                    <option value="Week 2">Week 2</option>
                    <option value="Week 3">Week 3</option>
                    <option value="Week 4">Week 4</option>
                  </select>
                </div>

                <div className="submit-datedue">
                  <label htmlFor="billDate">Bill Date</label>
                  <input
                    type="date"
                    id="billDate"
                    max="9999-12-31"
                    value={newBillDate}
                    onChange={(e) => setNewBillDate(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button className="btn" onClick={handleAddNewBill}>Add Bill</button>
            </div>
          </div>
        </div>
      </div>

      <div className="list-items">
          <h1>Bill List</h1>
          <ul>
            {billsList.map((bill, index) => (
            <li key={index}>
              {editIndex === index ? (
                <>
                  <input
                    className='list-items--name'
                    placeholder='New Bill Name'
                    type="text"
                    value={editBillName}
                    onChange={(e) => setEditBillName(e.target.value)}
                    required
                  />

                  <input
                    className='list-items--amount'
                    type="number"
                    step="0.01"
                    placeholder="$0.00"
                    inputMode='decimal'
                    value={editBillAmount}
                    onChange={(e) => setEditBillAmount(e.target.value)}
                    required
                  />

                  <input
                    className='list-items--date'
                    type="date"
                    value={editBillDate}
                    onChange={(e) => setEditBillDate(e.target.value)}
                    required
                  />

                  <select 
                      className='list-items--week-select'
                      id="weekSelect" 
                      value={editBillWeek}
                      onChange={(e) => setEditBillWeek(e.target.value)} 
                      required
                    >
                      <option value="">Select a week</option>
                      <option value="Week 1">Week 1</option>
                      <option value="Week 2">Week 2</option>
                      <option value="Week 3">Week 3</option>
                      <option value="Week 4">Week 4</option>
                  </select>

                  <button className='save-btn' onClick={() => handleEditBill(index, editBillName, editBillAmount, editBillWeek, editBillDate)}>
                    Save
                  </button>
                  
                  <button className='cancel-btn' onClick={() => setEditIndex(null)}>
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <div className='list-items-info'>
                    <span className='list-items--name-amount'>
                      {bill.name}: ${bill.amount}
                    </span>
                   
                    <span className='list-items--week-datedue'>
                      {bill.week} - {dateDue(bill.date)}
                    </span>
                  </div>
                  
                  <div className='list-items-modifiers'>
                    <div className='list-items--checkbox'>
                      <input
                        type="checkbox"
                        checked={bill.paid}
                        onChange={() => togglePaid(index)}
                      />
                    </div>
                  
                    <div className="list-items--btns">
                      <button className='edit-btn' onClick={() => setEditIndex(index)}>Edit</button>
                      <button className='delete-btn' onClick={() => handleDeleteBill(index)}>Delete</button>
                    </div>
                  </div>
                </>
              )}
            </li>
            ))}
          </ul>
      </div>
    </div>
  );
};

export default AddNewBills;