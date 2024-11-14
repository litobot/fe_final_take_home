// This component shows an individual subscription's details
// This would be a good place to be able to modify the status as well with a button

// What do I need to import here?:
  // CSS for any classes on here
  // Any images that appear here

import './SubscriptionsDetails.css'

function SubscriptionsDetails (){
  const [ details, setDetails ] = useState([])

  console.log('subscriptions: ', details)

  useEffect(() => {
    fetchSubscriptionDetails();
  }, []);

  const fetchSubscriptionDetails = () => {
    // Need to pass ID via props?
    // No. Because I'm doing the fetch call in here.
    fetch(`http://localhost:3000/api/v1/subscriptions${subscriptionId}`)
      .then(response => response.json())
      .then(subscriptionData => {
        setDetails(subscriptionData.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  if (!details) {
    return <p>Loading subscription details...</p>;
  }
  
  const { customer_name, tea_title, subscription_frequency, subscription_status } = details.attributes;

  // Need to double check this data - customer_name either needs to be concatenated or something

  return (
    <div key={details.id} className='subscription-details'>
      <h3>Tea Title: {tea_title}</h3>
      <img src='https://cdn-icons-png.flaticon.com/512/4363/4363425.png' alt="tea icon" className="tea-icon" />
      <p>Customer Name: {customer_name}</p>
      <p>Frequency: {subscription_frequency}</p>
      <p>Status: {subscription_status}</p>
    </div>
  );
}

export default SubscriptionsDetails;

// Each of these divs can be clickable with Reach Router to take us to the Subscriptions Component
// Each of those will utilize a separate fetch as that endpoint is different

// ROUTER
// I need to conditionally render the SubscriptionsContainer based on the pathway
// I need to conditionally render the SubscriptionsDetails based on the pathway