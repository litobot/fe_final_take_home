import { useState, useEffect } from 'react'

function SubscriptionsContainer (){
  const [ subscriptions, setSubscriptions ] = useState([])

  console.log('subscriptions: ', subscriptions)

  const fetchAllSubscriptions = () => {
    fetch("http://localhost:3000/api/v1/tea_subscriptions")
      .then(response => response.json())
      .then(subscriptionData => {
        setSubscriptions(subscriptionData.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAllSubscriptions();
  }, []);

  const renderSubscriptionCards = () => {
    return subscriptions.map((subscription) => {
      const { customer_name, tea_title, subscription_frequency, subscription_status } = subscription.attributes;

      return (
        <div key={subscription.id} className='subscription-card'>
          <h3>Tea Title: {tea_title}</h3>
          <img src='https://cdn-icons-png.flaticon.com/512/4363/4363425.png' alt="tea icon" />
          <p>Customer Name: {customer_name}</p>
          <p>Frequency: {subscription_frequency}</p>
          <p>Status: {subscription_status}</p>
        </div>
      );
    });
  };

  return (
    <div className='subscriptions-container'>
      {renderSubscriptionCards()}
    </div>
  );
}

export default SubscriptionsContainer;

// Each of these divs can be clickable with Reach Router to take us to the Subscriptions Component
// Each of those will utilize a separate fetch as that endpoint is different

// ROUTER
// I need to conditionally render the SubscriptionsContainer based on the pathway
// I need to conditionally render the SubscriptionsDetails based on the pathway