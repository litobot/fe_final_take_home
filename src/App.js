import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SubscriptionDetails from './Component/SubscriptionsDetails/SubscriptionsDetails.js';

import './App.css';
import SubscriptionsContainer from './Component/SubscriptionsContainer/SubscriptionsContainer.js';

function App (){
  

  return (
    <Router>
      <Routes>
          <Route path="/" element={<SubscriptionsContainer />} />
          <Route path="/subscriptions/:subscriptionsId" element={<SubscriptionDetails />} />
      </Routes>
    </Router>
  )
}

export default App;