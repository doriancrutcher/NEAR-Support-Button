window.addEventListener("DOMContentLoaded", function () {
  const helpFormContainer = document.querySelector(".help-form-container");
  const helpButton = document.querySelector(".help-button");
  const closeButton = document.querySelector(".close-button");
  const helpForm = document.querySelector(".help-form");

  // display button
  helpButton.addEventListener("click", function () {
    helpFormContainer.classList.toggle("show");
  });

  // hide button
  closeButton.addEventListener("click", function () {
    helpFormContainer.classList.remove("show");
  });

  // submit request
  helpForm.addEventListener("submit", function (event) {
    console.log("Request is Submitted awesome ");
    event.preventDefault();

    console.log("sending request");

    //
    const name = document.querySelector("#name").value;
    const email = document.querySelector("#email").value;
    const description = document.querySelector("#description").value;

    const subject = `Help request from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\nDescription: ${description}`;

    console.log("body is", body);

    // Create new ticket using Zendesk API
    const zendeskSubdomain = "near2527";
    const zendeskEmail = process.env.ZUSER;
    const zendeskPassword = process.env.ZP;

    const authHeader = "Basic " + btoa(zendeskEmail + ":" + zendeskPassword);
    console.log("header is", authHeader);
    const url = `https://${zendeskSubdomain}.zendesk.com/api/v2/tickets.json`;
    console.log(url);

    const requestOptions = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: authHeader,
      }),
      body: JSON.stringify({
        ticket: {
          subject: subject,
          comment: {
            body: body,
          },
        },
      }),
    };

    console.log("request options", requestOptions);
    console.log("url", url);

    fetch(url, requestOptions)
      .then(function (response) {
        console.log(response);
      })
      // .then(function (data) {
      //   console.log("haha data ");
      //   console.log(data.ticket);
      //   alert("Your ticket has been submitted. Thank you!");
      // })
      .catch(function (error) {
        console.error(error);
      });

    // Reset form fields
    document.querySelector("#name").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#description").value = "";

    // Hide form container
    helpFormContainer.classList.remove("show");
  });
});
