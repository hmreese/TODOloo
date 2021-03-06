import React from 'react'


function TableHeader()  {
    return (
      <thead>
        <tr>
            <h1>Your Lists</h1>
        </tr>
      </thead>
    );
}


function TableBody(props) {
    const rows = props.characterData.map((row, index) => {
      return (
        <tr key={index}>
          <td>{row.name}</td>
          <td>{row.job}</td>
          <td>{row._id}</td>
          <td>
            <button onClick={() => props.removeCharacter(index)}>Delete</button>
          </td>
        </tr>
      );
     }
    );
    return (
        <tbody>
          {rows}
         </tbody>
     );
  }

function Table (props) {
  return (
    <table>
      <draw/>
      <TableHeader />
      <TableBody characterData={props.characterData} removeCharacter={props.removeCharacter} />
    </table>
  );
  }


export default Table;