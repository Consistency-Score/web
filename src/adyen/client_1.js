// Set your X-API-KEY with the API key from the Customer Area.

function adyenPayment() {
  const { Client, Config, CheckoutAPI } = require("@adyen/api-library");
  const config = new Config();
  // Set your X-API-KEY with the API key from the Customer Area.
  config.apiKey =
    "AQEhhmfuXNWTK0Qc+iSbm2ostetvAMDK6qDV9H7qu8cGiii+EMFdWw2+5HzctViMSCJMYAc=-Ok4ZKwW47w1eqvkMkoN1q4/eVm+Ux+W7J+5J0DsCE9s=-6*,P>h7CNVWm=ZJe";
  config.merchantAccount = "KintroECOM";
  const client = new Client({ config });
  client.setEnvironment("TEST");
  const checkout = new CheckoutAPI(client);
  checkout
    .payments({
      amount: { currency: "USD", value: 0 },
      paymentMethod: {
        type: "scheme",
        encryptedCardNumber: "test_5555555555554444",
        encryptedExpiryMonth: "test_03",
        encryptedExpiryYear: "test_2030",
        encryptedSecurityCode: "test_737",
      },
      reference: "ORDER_NUM_1",
      merchantAccount: config.merchantAccount,
      storePaymentMethod: "true",
      shopperInteraction: "Ecommerce",
      recurringProcessingModel: "CardOnFile",
      returnUrl: "https://your-company.com/...",
    })
    .then((res) => console.log(res))
    .catch((res) => console.log(res));
}

adyenPayment();
