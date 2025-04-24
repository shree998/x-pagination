import {useEffect} from 'react';
import {useState} from 'react';
import './App.css';
import Pagination from './Components/Pagination/Pagination';

function App() {
  const [data, setData] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const maxRecords = 10;
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      });
  }
  , []);

  useEffect(() => {
    if(data!== null && data.length > 0){
    const startIndex = (currentPage - 1) * maxRecords;
    const endIndex = Math.min(currentPage * maxRecords, data.length) ;
    setCurrentList([...data].slice(startIndex, endIndex));
    const totalPages = Math.ceil(data.length / maxRecords);
    setTotalPages(totalPages);
    }
  }
  , [currentPage, data]);

  useEffect(() => {

    if(totalPages < currentPage && currentPage > 1){
        setCurrentPage(prev => prev - 1)
    }

}, [totalPages, currentPage])

  return (
    <div className="App">
      <h1>Employee Data Table</h1>
      {/* <header className="App-header">
        
      </header> */}
      <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentList.map((item) => (
            <tr key={item.id}>
            <td>{item.id}</td>
              <td>{item.name}</td>

              <td>{item.email}</td>
              <td>{item.role}</td>
            </tr>
          ))}
        </tbody>
        </table>
      </div>
      {totalPages > 1 && (<Pagination updatePage={setCurrentPage} currentPage={currentPage} totalPages={totalPages} />)}
    </div>
  );
}

export default App;
