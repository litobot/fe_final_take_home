import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './SubscriptionDetails.css';

function SubscriptionDetails() {
  const [details, setDetails] = useState(null);
  const { subscriptionId } = useParams();

  useEffect(() => {
    if (subscriptionId) {
      fetchSubscriptionDetails();
    }
  }, [subscriptionId]);

  const fetchSubscriptionDetails = () => {
    fetch(`http://localhost:3000/api/v1/subscriptions/${subscriptionId}`)
      .then((response) => response.json())
      .then((subscriptionData) => {
        setDetails(subscriptionData.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateSubscriptionStatus = (newStatus) => {
    fetch(`http://localhost:3000/api/v1/subscriptions/${subscriptionId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ subscription: { status: newStatus } }),
    })
      .then((response) => response.json())
      .then((updatedData) => {
        setDetails(updatedData.data);
      })
      .catch((error) => console.error('Error updating subscription:', error));
  };

  if (!details || !details.attributes) {
    return <p>Failed to load subscription details. Please try again.</p>;
  }

  const { id, attributes: { customer_details, teas, subscription_frequency, subscription_status } } = details;
  const customerName = `${customer_details.first_name} ${customer_details.last_name}`;

  return (
    <div className='subscription-details'>
      <h3>Customer Name: {customerName}</h3>
      <p>Subscription ID: {id}</p>
      <p>Frequency: {subscription_frequency}</p>
      <p>Status: {subscription_status}</p>

      <div>
        {subscription_status === 'Active' && (
          <button onClick={() => updateSubscriptionStatus('Cancelled')}>Cancel Subscription</button>
        )}
        {subscription_status === 'Cancelled' && (
          <button onClick={() => updateSubscriptionStatus('Active')}>Reactivate Subscription</button>
        )}
      </div>

      <h3>Teas in Subscription</h3>
      <ul>
        {teas.map((tea, index) => (
          <li key={index} className="tea-item">
            <img 
              src='https://cdn-icons-png.flaticon.com/512/4363/4363425.png' 
              alt="tea icon" 
              className="tea-icon" 
            />
            <span>{tea.title} - ${tea.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SubscriptionDetails;
