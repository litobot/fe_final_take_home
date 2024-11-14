import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function SubscriptionsContainer() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [filterQuery, setFilterQuery] = useState('')

  const fetchAllSubscriptions = () => {
    fetch("http://localhost:3000/api/v1/subscriptions")
      .then((response) => response.json())
      .then((subscriptionData) => setSubscriptions(subscriptionData.data))
      .catch((error) => console.error(error));
  };

  // Runs on mount - [] === only runs once
  useEffect(() => {
    fetchAllSubscriptions();
  }, []);

  // 
  const filterSubscriptions = (event) => {
    setFilterQuery(event.target.value)
    let subscriptionsCopy = [...subscriptions]
    const filteredResults = subscriptionsCopy.filter(subscription => {
      console.log('subscription: ', subscription)
      const customerName = `${subscription.attributes.customer_details.first_name} ${subscription.attributes.customer_details.last_name}`
      console.log('CustomerName: ', customerName)
      console.log('filterQuery: ', filterQuery)
      return customerName.toLowerCase().includes(filterQuery.toLowerCase());
    });
    console.log('Filtered Results: ', filteredResults)
    setSubscriptions(filteredResults)
  };
  

  const renderSubscriptionCards = () => {
    return subscriptions.map((subscription) => {
      const { id, attributes: { customer_details, teas, subscription_frequency, subscription_status } } = subscription;
      const customerName = `${customer_details.first_name} ${customer_details.last_name}`;

      return (
        <Link to={`/subscriptions/${id}`} key={id}>
            
          <div className='subscription-card'>
            <h3>Customer Name: {customerName}</h3>
            <p>Subscription ID: {id}</p>
            <ul>
              {teas.map((tea, index) => (
                <li key={index}>{tea.title} - ${tea.price.toFixed(2)}</li>
              ))}
            </ul>
            <p>Frequency: {subscription_frequency}</p>
            <p>Status: {subscription_status}</p>
          </div>
        </Link>
      );
    });
  };

  return (
    <div className='subscriptions-container'>
      <input
        type='text'
        placeholder='Search by Customer Name'
        className='search-bar'
        value={filterQuery}
        // Runs the filterSubscriptions fx every time new input received
        onChange={(event) => filterSubscriptions(event)}
        />
      {renderSubscriptionCards()}
    </div>
  );
}

export default SubscriptionsContainer;
