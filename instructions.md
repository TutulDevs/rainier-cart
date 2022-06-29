# Instructions

You have to create a basic product listing page with a cart, where the user can request for a new product to be supplied. The Carts must be reactive and The user must be able to update it. You can only use Tailwind CSS for the design and Vue.js/React.js for the front-end development (Vue.js is preferred).

You must be able to explain how you implemented it in the interview session.

## We are providing APIs for this task.

- Product Details Api: https://fec-inventory-api.herokuapp.com/product-info
- InventoryDetailsApi: https://fec-inventory-api.herokuapp.com/inventory-info

## In our API, we are providing the following information:

- Mock data of products and inventory.
- Inventory data has a relationship with product data (inventory data has the id of its product data).
- You can't create or modify any data in our API.
- Click on API links to see the object structure.

## How to use the API:

- Product Data: GET https://fec-inventory-api.herokuapp.com/product-info/{productId}
- Inventory Data: GET https://fec-inventory-api.herokuapp.com/inventory-info/{inventoryId}
- Inventory Data by Product Id: GET https://fec-inventory-api.herokuapp.com/inventory-info?product_id={productId}

To understand the workflow better , watch the video we have attached .

You need to send us a live link of your solution, also you must send us the github repo of the solution.
If you can't deploy, dockerize your solution and send us the github repo.

**HINT**: you can use the APIs provided in multiple ways. Either you can use both the APIs to get all data and create a single object for each item and then use it as necessary or you can call the APIs individually wherever it seems appropriate.
