import React , {useState , useEffect} from 'react';
import './assets/style/style.scss';
import AppRouter from './Router/AppRouter';
import Loader from './components/Loader';

let data;

const App = () => {
  const [isLoading , statusLoading] = useState(true);
  const [loadingPercent , setLoadingPercent] = useState(0);

  useEffect(() => {
    setTimeout(() => {
        setLoadingPercent(50);
    }, 750)
    const fetchData = async() => {
        const res = await fetch('http://localhost:5000/all');
        ({data} = await res.json());
        setLoadingPercent(100);
        setTimeout(() => {
            statusLoading(false);
        }, 1500)
    }
    fetchData();
  }, [])
  if(isLoading){
      return <Loader percentage={loadingPercent}/>
  }
  return (
    <div className="App">
      <AppRouter graphData={data}/>
    </div>
  );
}

export default App;
