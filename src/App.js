import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SubscriptionsContainer from './Components/SubscriptionsContainer/SubscriptionsContainer';
import SubscriptionDetails from './Components/SubscriptionDetails/SubscriptionDetails';


function App (){
  
  return (
    <Routes>
      <Route path="/" element={<SubscriptionsContainer />} />
      <Route path="/subscriptions/:subscriptionId" element={<SubscriptionDetails />} />
    </Routes>
  )
}

export default App;