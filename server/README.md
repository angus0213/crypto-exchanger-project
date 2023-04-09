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
    <td>GET</td>
    <td> /user/:userId </td>
    <td></td>
    <td>{_id, ID, fullName, age, address, country, wallet, walletHistory, NFT, depositWallet, depositPrincipalData, depositWalletHistory}</td>
  </tr>
   <tr>
    <td>GET</td>
    <td> /quoteprices </td>
    <td></td>
    <td>{[price quote]}</td>
  </tr>
   <tr>
    <td>GET</td>
    <td> /quoteprices </td>
    <td></td>
    <td>{[price quote]}</td>
  </tr>
    <tr>
    <td>GET</td>
    <td> /nftcollections</td>
    <td></td>
    <td>{[nftstock]}</td>
  </tr>
   <tr>
    <td>GET</td>
    <td> /news</td>
    <td></td>
    <td>{[News]}</td>
  </tr>
    <tr>
    <td>GET</td>
    <td> /news</td>
    <td></td>
    <td>{[News]}</td>
  </tr>
  <tr>
   <td>POST</td>
    <td> /users </td>
    <td><strong>Query</strong><br/>_id_: string (required)<br /> email: string, array (required)<br /> password: string (required)<br /> mobileNumber: string (required)<br /> Referral Code: string (required)<br /></td>
    <td>{insertedId}</td>
  </tr>
   <tr>
    <td>POST</td>
    <td> /userlogin </td>
    <td><br /> email: string, array (required)<br /> password: string (required)<br /> mobileNumber: string (required)</td>
    <td>{_id, ID, fullName, age, address, country, wallet, walletHistory, NFT, depositWallet, depositPrincipalData, depositWalletHistory}</td>
  </tr>
  <tr>
    <td>Patch</td>
    <td> /user:userId </td>
    <td>surName: string (required)<br />givenName: string (required)<br /> address: string (required)<br />country:string (required)<br />age: number (required)<br />wallet: array (required)</td>
    <td>{acknowledged}</td>
  </tr>
  <tr>
    <td>Patch</td>
    <td> /wallet/:userId </td>
    <td><strong>Body</strong><br/>userId: string (required)<br/>_id: string (required) <br/>balanceChange: number (required)</td>
    <td>{acknowledged}</td>
  </tr>
   <tr>
    <td>patch</td>
    <td> /patchnft/:userId</td>
    <td><strong>Body</strong><br/>userId: string (required)<br/>_id: string (required)<br/>name: string (required)<br/>owner: string (required)<br/>imageSrc: string (required)<br/>quantity: number (required) <br/>Price: number (required)<br/>PriceUnit: string (required)<br/>PriceUnitImg: string (required)</td>
    <td>{acknowledged}</td>
  </tr>
    <tr>
    <td>patch</td>
    <td> /patchnftwallet/:userId</td>
    <td><strong>Body</strong><br/>_id: string (required)<br/>name: string (required)<br/>owner: string (required)<br/>imageSrc: string (required)<br/>quantity: number (required) <br/>Price: number (required)<br/>PriceUnit: string (required)<br/>PriceUnitImg: string (required)</td>
    <td>{acknowledged}</td>
  </tr>
     <tr>
    <td>patch</td>
    <td> /cancelnftlisting/:userId</td>
     <td><strong>Body</strong><br/>_id: string (required)<br/>name: string (required)<br/>owner: string (required)<br/>imageSrc: string (required)<br/>quantity: number (required) <br/>Price: number (required)<br/>PriceUnit: string (required)<br/>PriceUnitImg: string (required)</td>
    <td>{acknowledged}</td>
  </tr>
     <tr>
    <td>patch</td>
    <td> /redeem/:userId</td>
    <td><strong>Body</strong><br/>redeemCoin: string (required)<br/>_id: string (required) </td>
    <td>{acknowledged}</td>
  </tr>
   <tr>
    <td>patch</td>
    <td>/depositwallet/:userId</td>
    <td><strong>Body</strong><br/>crypto: string (required)<br/>amount: number (required) <br/>id: string (required)<br/>imageSrc: string (required)<br/>type: string (required)</td>
    <td>{acknowledged}</td>
  </tr>
</table>
