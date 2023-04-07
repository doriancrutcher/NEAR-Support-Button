const fetch = require('node-fetch');

async function createZendeskTicket(subject, description) {
  // Replace <your-subdomain> and <your-api-token> with your actual subdomain and API token.
  const subdomain = "near2527";
  const apiToken = "Vh1SGMZ2hNQUw93kBNkZ8e456KBIahY4wGnMR5jc";
  const url = `https://${subdomain}.zendesk.com/api/v2/tickets.json`;
  const zendeskPassword = "kA&PUjy7hj8!";
  const zendeskSubdomain = "near2527";
  const zendeskEmail = "dorian@near.org";

  // Build the JSON data for the new ticket.
  const data = {
    ticket: {
      subject: subject,
      comment: {
        body: description
      }
    }
  };

  // Send a POST request to create the new ticket.
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic " + btoa(zendeskEmail + ":" + zendeskPassword)
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Failed to create Zendesk ticket: ${response.status} ${response.statusText}`);
    }

    const responseData = await response.json();
    console.log(`Created Zendesk ticket #${responseData.ticket.id}`);
  } catch (error) {
    console.error(error);
  }
}

createZendeskTicket("Pokemon", "Catch em all")
