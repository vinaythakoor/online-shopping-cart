import React, { Component } from 'react'

export default class OrderConfirm extends Component {
  
  constructor(props) {
    super(props);
     }

  render() {
    const { values, handleChange, orderdetail } = this.props;
    let total, productcount;
    console.log(orderdetail)

    Object.keys(orderdetail).map((orders, index) => {
      //console.log(orderdetail[orders].productCount)
      productcount = orderdetail[orders].productCount
      total = orderdetail[orders].total  
    })

    return (
      
    <div class="container">
        <div class="alert alert-success">
          <h3 class="text-center">Your Order is Confirmed!!</h3>
        </div>
 
        {Object.keys(orderdetail).map((orders, index) => {
 
          return Object.keys(orderdetail[orders]).map((order, index) => {
          
          if( order == "orderDetail" ){
               let orderdeta = orderdetail[orders][order]
              return (
              <div class="row">
                  <div class="col-12">
                  <div class="invoice-title">
                    <h2>Invoice</h2><h3 class="pull-right">Order # {orderdeta.id} </h3>
                  </div>
                  <hr/>
                  <div class="row">
                    <div class="col-6">
                      <address>
                      <strong>Billed To:</strong><br/>
                        {orderdeta.user.firstName} {orderdeta.user.lastName}<br/>
                        {orderdeta.billing.addressLineOne}<br/>
                        {orderdeta.billing.addressLineTwo}<br/>
                        {orderdeta.billing.city} - {orderdeta.billing.postalCode}<br/>
                        {orderdeta.billing.state} - {orderdeta.billing.country}<br/>
                      </address>
                    </div>
                    <div class="col-6 text-right">
                      <address>
                        <strong>Shipped To:</strong><br/>
                        {orderdeta.user.firstName} {orderdeta.user.lastName}<br/>
                        {orderdeta.shipping.addressLineOne}<br/>
                        {orderdeta.shipping.addressLineTwo}<br/>
                        {orderdeta.shipping.city} - {orderdeta.shipping.postalCode}<br/>
                        {orderdeta.shipping.state} - {orderdeta.shipping.country}<br/>
                      </address>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-6">
                      <address>
                        <strong>Payment Method:</strong><br/>
                        Card Payment <br/>
                        {orderdeta.user.email}
                      </address>
                    </div>
                    <div class="col-6 text-right">
                      <address>
                        <strong>Order Date:</strong><br/>
                      </address>
                    </div>
                  </div>
                </div>
              </div>
              );
            }  
        }) 
        })}

        <div class="row">
            <div class="col-md-12">
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title"><strong>Order summary</strong></h3>
                </div>
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table table-condensed">
                      <thead>
                          <tr>
                            <td><strong>Item</strong></td>
                            <td class="text-center"><strong>Price</strong></td>
                            <td class="text-center"><strong>Quantity</strong></td>
                            <td class="text-right"><strong>Totals</strong></td>
                          </tr>
                      </thead>
                      <tbody>
                      
                      {Object.keys(orderdetail).map((orders, index) => {
                        return Object.keys(orderdetail[orders]).map((products, index) => {
                         if( products == "product" ){
                              let product = orderdetail[orders][products]
                              //console.log(product.id)
                        return (
                        <tr>
                            <td>{ product.name }</td>
                            <td class="text-center">&#8377; { product.unitPrice }</td>
                            <td class="text-center">{ productcount }</td>
                            <td class="text-right">&#8377; { total }</td>
                        </tr>
                          );
                          }  
                        }) 
                      })}
                       </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
 
          <div class="text-center">
            <a href="${contextRoot}/show/all/products" class="btn btn-lg btn-warning mt-3">Continue Shopping</a>
          </div>
      </div>
     )
  }
}
