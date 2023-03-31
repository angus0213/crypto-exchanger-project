# Backend

## EndPoint

<table>
  <tr>
    <th>Method</th>
    <th>Endpoint</th>
    <th>Query or Body</th>
    <th>Return data</th>
  </tr>
  <tr>
   <td>POST</td>
    <td> /users </td>
    <td><strong>Query</strong><br/>_id_: string<br /> email: string, array<br /> password: string<br /> mobileNumber: string<br /> surName: string<br />givenName: string <br /> address: string <br />country:string <br />age: number<br />wallet: array</td>
    <td>[{name, price, body_location, category, _id, imageSrc, numInStock, companyId}] </td>
  </tr>
  <tr>
    <td>Patch</td>
    <td> /user:userId </td>
    <td></td>
    <td>{name, price, body_location, category, _id, imageSrc, numInStock, companyId}</td>
  </tr>
  <tr>
    <td>GET</td>
    <td> /user/:userId </td>
    <td></td>
    <td>{_id, firstName, imageSrc, isAdmin, cartItems, checkoutIds}</td>
  </tr>
  <tr>
    <td>GET</td>
    <td> /checkout/:checkoutId </td>
    <td></td>
    <td>{email, cardNumber, cardExpiration, cvc, country, zip, address}</td>
  </tr>
   <tr>
    <td>POST</td>
    <td> /checkout/:userId </td>
    <td><strong>Body</strong><br/> userId: string (required) <br/> email: string (required) <br/>cardNumber: number, 12 length (required)<br /> cardExpiration : MM/YY (required)<br />cvc: number, 3 length (required)<br /> country: string (required)<br />zip: string (required)<br /> address: string (required)              </td>
    <td>{checkoutId}</td>
  </tr>
  <tr>
    <td>Patch</td>
    <td> /user/:userId </td>
    <td><strong>Body</strong><br/>itemId: number (required)<br/>quantity: number (required) </td>
    <td>{cartItems}</td>
  </tr>
</table>
