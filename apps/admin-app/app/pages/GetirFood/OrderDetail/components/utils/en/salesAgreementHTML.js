/* eslint-disable max-len */
export const salesAgreementHTMLen = ({ foodOrder }) => `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="" xml:lang="">
<head>
    <title>Terms and Conditions</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
    <style type="text/css">
        @page { size: auto;  margin-top: 8mm; }
        body {
            font-family: "Open Sans", sans-serif;
            color: #3e3e3e;
            font-weight: 600;
            font-size: 12px !important;
            margin: 0;
            padding: 0;
        }
        main {
            font-family: "Open Sans", sans-serif;
            font-weight: 600;
            font-size: 12px !important;
            padding: 20px 15px 5px 15px;
            color: #3e3e3e;
        }
        div {
            font-family: 'Open Sans',sans-serif;
            font-weight: 600;
            padding: 0px !important;
            font-size: 12px !important;
        }
        p {
            font-family: 'Open Sans',sans-serif;
            font-weight: 600;
            margin-top: -4px !important;
            font-size: 12px !important;
        }
        table {
            margin-bottom: 6px;
        }
        span {
            font-family: 'Open Sans',sans-serif;
            font-weight: 600;
            font-size: 12px !important
        }
        span > p {
            font-family: 'Open Sans',sans-serif;
            font-weight: 600;
            font-size: 12px !important
        }
        strong {
            font-family: 'Open Sans',sans-serif;
            font-weight: bold;
            font-size: 12px !important
        }
        blockquote {
            font-family: 'Open Sans',sans-serif;
            font-weight: 600;
            font-size: 12px !important;
            margin: 2px 0px 0px 0px !important;
            padding: 0px !important;
            border: none !important;

        }
        blockquote > div {
            font-family: 'Open Sans',sans-serif;
            font-weight: 600;
            font-size: 12px !important;
            margin-top: 0px;
            margin-bottom: 2px;
            padding-bottom: 2px;
            text-indent: 2em;
        }
        blockquote > p {
            font-family: 'Open Sans',sans-serif;
            font-weight: 600;
            margin-top: 0px;
            margin-bottom: 2px;
            padding-bottom: 2px;
            text-indent: 2em;
            font-size: 12px !important
        }
        blockquote > div > p {
            font-family: 'Open Sans',sans-serif;
            font-weight: 600;
            font-size: 12px !important
        }
        .primary-title, .section-header, th, .secondary-title{
            font-family: 'Open Sans',sans-serif;
            font-weight: 600;
            font-style: normal;
            font-stretch: normal;
            line-height: 1.14;
            letter-spacing: normal;
            color: #5d38c0;
        }
    </style>
</head>
<body>
<main>
    <p class="section-header"><strong>GETİR PERAKENDE LOJİSTİK ANONİM ŞİRKETİ PRE-DISCLOSURE FORM</strong></p>
    <p><strong>This pre-disclosure form (“Form”) is presented to you for your information ahead of the distance sales agreement in connection with the order you are placing using Getir application.</strong></p>
    <p class="secondary-title"><strong>INTERMEDIARY SERVICE PROVIDER INFORMATION</strong></p>
    <p>Title: Getir Perakende Lojistik A.Ş. (“Getir”)</p>
    <p>Etiler Mah. Tanburi Ali Efendi Sok. Maya Residences Sit. T Blok No: 13/334 Beşiktaş/Istanbul</p>
    <p>Phone number: +90 (850) 532 50 50</p>
    <p>E-mail: info@getir.com</p>
    <p>Mersis No: 0394048265800010</p>
    <p class="secondary-title"><strong>SELLER INFORMATION</strong></p>
    <p>Title: ${foodOrder?.restaurant?.companyName}</p>
    <p>Address: ${foodOrder?.restaurant?.companyAddress}</p>
    <p>Phone number: </p>
    <p>E-mail: ${foodOrder?.restaurant?.email}</p>
    <p>Mersis No: </p>
    <p class="secondary-title"><strong>CUSTOMER INFORMATION</strong></p>
    <p>Recipient: ${foodOrder?.client?.name}</p>
    <p>Delivery Address: ${foodOrder?.address}</p>
    <p>Phone number: ${foodOrder?.client?.gsm}</p>
    <p>E-mail: ${foodOrder?.client?.email}</p>
    <p class="secondary-title"><strong>INVOICE INFORMATION</strong></p>
    <p>Name-Surname/Title: ${foodOrder?.invoice?.title}</p>
    <p>Address: ${foodOrder?.invoice?.address}</p>
    <p>Phone number: ${foodOrder?.invoice?.gsm}</p>
    <p>E-mail: ${foodOrder?.invoice?.email}</p>
    <p class="secondary-title"><strong>PRODUCT INFORMATION</strong></p>
    <div align="center">
        <table style="border: 1px dashed #000000;" border="0" cellpadding="0" width="100%">
            <thead>
            <tr height="30px">
                <th width="50%">Product Description</th>
                <th width="5%">Piece</th>
                <th width="20%">Sale Price (Tax Included)</th>
            </tr>
            </thead>
            <tbody>
            ${foodOrder?.products?.map(product => `
              <tr height="28px">
                <td style="text-align:center;">${product?.name} ${product?.selectedAmount ? product?.selectedAmount : '-'}</td>
                <td style="text-align:center;">${product?.count}</td>
                <td style="text-align:center;">₺${product?.price}</td>
              </tr>
            `)}
            </tbody>
        </table>
    </div>
    <p class="secondary-title"><strong>DEFINITIONS</strong></p>
    <p>The following terms shall have the meanings ascribed herein for the interpretation of the Form and the Distance Sales Agreement.</p>
    <p><strong>Agreement:</strong> Distance sales agreement entered into by and between the Parties as per the information provided under this Form.</p>
    <p><strong>Application:</strong> Getir’s application which can be used on mobile and other devices with internet connection where the products/services offered by Getir to its customers may be ordered and which all intellectual and industrial property rights are owned by Getir.</p>
    <p><strong>Customer:</strong> Person placing a product or service order using the Application.</p>
    <p><strong>Force Majeure:</strong> Any and all events which may objectively prevent or delay compliance of the Parties with their obligations including but not limited to adverse weather conditions preventing transportation, transportation disruptions, infrastructure and internet malfunctions, fire, earthquake, flood and other natural disasters as well as extraordinary events including epidemics, turmoil, widespread violent acts, strikes or regulations by official authorities.</p>
    <p><strong>Getir/Intermediary Service Provider:</strong> Getir Perakende Lojistik Anonim Şirketi.</p>
    <p><strong>Seller:</strong>Real or legal persons, who provides the goods to Customers on its behalf or acts on behalf of the ones who provide the goods to Customers and whose information is listed above.</p>
    <p><strong>Parties:</strong> Customer, Seller and Getir.</p>
    <p><strong>Product:</strong> Service or product offered by the Seller to the Customer and chosen by the Customer from the offerings in the Application in the service areas where Getir operates.</p>
    <p class="secondary-title"><strong>PAYMENT</strong></p>
    <p>In case the Customer chooses online payment methods, any and all fees regarding the Product sale price, delivery, delivery vehicle and all other additional fees including taxes, duties and charges shall be withdrawn from the Customer’s specified credit card or debit card or meal cards upon placing of the order. The Customer shall select one of the tip amounts available in the Application or insert a tip amount and be redirected to a payment screen in case the Customer wishes to tip the courier delivering its order through the Application. For the avoidance of doubt, tipping is optional and based on Customer satisfaction. The sales price of the product is collected by Getir on behalf of the seller.</p>
    <p>Any and all delivery fees, delivery vehicle fees and all other additional fees including taxes, duties and charges shall be borne by the Customer unless clearly expressed otherwise in the Application. Getir or Seller shall be released from its delivery obligation in case the Customer fails to pay the Product fees or payment is cancelled by the bank/finance institution for any reason. Tip payment cannot be cancelled; Getir shall be released from its delivery obligation in case the Customer fails to pay the Product fees or payment is cancelled by the bank/finance institution for any reason. Getir will collect the entire tip amount upon completion of the payment and will not be able to refund the tip thereafter, unless the payment is cancelled by the bank/finance institution.</p>
    <p>Customer accepts that credit card interest rates shall be applied as per the agreement between the Customer and the bank for payments made using credit card.</p>
    <p>In case cash on delivery payment method is selected by the Customer, the sales price of the Product and any other charges, if any, and any additional fees such as taxes, fees, charges, will be collected from the Customer in cash, from credit or debit card or meal card by the Seller at the time of delivery.</p>
    <p class="secondary-title"><strong>DELIVERY</strong></p>
    <p>The delivery time shown in the Application is a non-binding estimate until when Getir or Seller aims to complete the delivery. Product is delivered to the Customer or the person/organization specified by the Customer at the earliest and no later than the statutory period of 30 (thirty) days as of the order date. The Customer may cancel the order in case the order is not delivered within 30 (thirty) days as of the order date.</p>
    <p>Getir and Seller will perform delivery in the areas designated by Getir where orders may be placed using the Application. No delivery will be performed through the Application outside these designated areas where an order may be placed. Product will be delivered to the address provided by the Customer while placing the order. Customer may not change the address after the completion of the order. Getir or the Seller assume no liability in the event the Customer or the specified recipient is not present at the delivery address, if the said persons refuse to take delivery of the Product or if the address is incorrect, and Getir or the Seller will be deemed to have made full and complete performance in these cases. Any and all losses arising from the Customer’s late acceptance of the delivery of the Product as well as any and all costs arising in connection with the Product being held due to Customer’s fault and/or return of the Product due to non-delivery shall be borne by the Customer.</p>
    <p>Getir or the Seller through Getir may replace the Product with another product or service with same qualities and price by informing the Customer and obtaining its express consent in the event it is understood that Getir will not be able to supply the Product. The order is cancelled in the event the Customer does not grant its consent.</p>
    <p>Getir or the Seller through Getir shall inform the Customer at the earliest convenience in the event it is understood that the delivery will not be completed due to Force Majeure.</p>
    <p class="secondary-title"><strong>RIGHT OF WITHDRAWAL</strong></p>
    <p>Customer may withdraw from the Agreement within 14 (fourteen) days as of the Product delivery date without giving any reason, and without incurring any penalty costs. In case of distance sales related to performance of services, the withdrawal period shall begin as of the execution date of the Agreement. However, the Customer may also exercise its withdrawal right in the period between execution of the Agreement and the delivery of the Product.</p>
    <p>Withdrawal right may only be exercised in cases where the Product is unsealed, unharmed and unused. The Product shall be returned in full and without any damage, together with its original box, packaging and standard accessories (if any).</p>
    <p>Moreover, the right of withdrawal cannot be exercised in respect of contracts:</p>
    <ol type="a">
        <li>for the supply of goods or services the price of which is dependent on fluctuations in the financial market outside the control of the supplier or the seller.</li>
        <li>for the supply of goods specifically made according to consumer's specifications or personal needs.</li>
        <li>for the supply of goods that may deteriorate or expire rapidly.</li>
        <li>for the supply of sealed goods which are not suitable for return due to health protection or hygiene concerns if unsealed after delivery.</li>
        <li>for the supply of goods which are, after delivery, inseparably mixed with other items by their nature.</li>
        <li>for the supply of books, digital content and computer consumables offered physically, if the good is unsealed after delivery.</li>
        <li>for the supply of periodical publications such as newspapers and magazines, except for those provided under subscription agreements.</li>
        <li>for accommodation, transport of goods, car rental, catering and entertainment or leisure provided for making use of spare if the contract provides for the services to be used within a specified date or period.</li>
        <li>for services to be rendered immediately on electronic platforms or intangible goods delivered to the consumer immediately.</li>
        <li>for services which performance has begun upon the consent of the consumer before the expiration of right of withdrawal period.</li>
    </ol>
    <p>The withdrawal right may not be exercised in these exceptional cases, and the Customer loses its withdrawal right if the Customer fails to duly or timely exercise its right.</p>
    <p>Customer shall submit its withdrawal request  to the Seller or to Getir either through Getir Customer service at +90 (850) 532 5050, by e-mail at info@getir.com or by filling out the sample withdrawal form provided in the appendix (APPENDIX – WITHDRAWAL FORM) and delivering the form by registered mail, fax or e-mail within the 14 (fourteen) day period described above, and the Customer may return the Product within 10 (ten) days as of the date of submission of the withdrawal request through any cargo service at Getir’s or Seller’s cost in case it wishes to return the Product by exercising its withdrawal right. Getir or the Seller are obliged to accept return of the Product and to reimburse the Product price to the relevant bank within 14 (fourteen) days as of its receipt of the Customer’s request.</p>
    <p>For payments made with credit or debit card, Getir will not reimburse the Customer in cash in case the Customer exercises its withdrawal right for the Product or the Product is returned, or the order is cancelled for any reason. Reimbursement of the Product price to the credit or debit card are made as per the relevant procedures of the bank. Refunds for payments made by meal cards will be made as per the relevant procedures of the related institutions.</p>
    <p>In cases where cash on door payment method was chosen by the Customer, the price paid by the Customer will be returned to the Customer by the Seller. In cases where payment is made by credit card or debit card at the door, within the scope of requests received within the same day, the transaction will be canceled by the Seller through the POS device and the fee will be refunded to the Customer. Refunds for requests not made on the same day will be made according to the procedures of the relevant bank. Refunds for payments made by meal cards will be made according to the procedures determined by the Seller.</p>
    <p>For all cancellations and withdrawals, the Customer can be contacted with the customer service by calling +90 (850) 532 50 50 or by e-mail at info@getir.com.</p>
    <p class="secondary-title"><strong>CONTACT INFORMATION</strong></p>
    <p>Our customer service may be reached by phone at +90 (850) 532 50 50 or by e-mail at info@getir.com for any queries regarding the Order.</p>
    <p class="secondary-title"><strong>JURISDICTION</strong></p>
    <p>Parties accept the jurisdiction of the consumer arbitration committee located in the registered address of the Customer and the Seller for any disputes arising from the Agreement within the monetary limits set out under relevant legislation, and the jurisdiction of the consumer courts located in the address of the Customer and the Seller for any disputes arising from the Agreement outside the said monetary limits.</p>
    <p class="secondary-title"><strong>MISCELLANEOUS</strong></p>
    <p>Upon acceptance, the Form and the Agreement shall be sent to the e-mail address provided during the on-boarding on the Application. These documents are available in the Application at all times. All records regarding the order shall be kept in Getir’s records for a period of 10 (ten) years as per relevant regulations.</p>
    <p>Upon acceptance, the Customer is hereby notified regarding all matters including the essential features-specifications of the Product, sale price, delivery procedures, refund and withdrawal right and contact information through this Form which shall constitute an integral part of the Agreement.</p>
    <p>All terms under this Form shall come into effect as of the time the Customer electronically accepts the Form and shall be applicable and binding together with the Agreement.</p>
    <p class="secondary-title"><strong>APPENDIX – WITHDRAWAL FORM</strong></p>
    <p>(This form will be filled out and sent for submitting a withdrawal request for the product(s).)</p>
    <p>To GETİR PERAKENDE LOJİSTİK A.Ş. or the Seller</p>
    <p>I hereby declare that I would like to exercise my withdrawal right for the purchase of the following products or delivery of the following services.</p>
    <ul>
        <li>Order date or delivery date:</li>
        <li>Product or service subject to withdrawal:</li>
        <li>Product or service fees subject to withdrawal:</li>
        <li>Customer’s name and surname:</li>
        <li>Customer’s phone number registered in the Application:</li>
        <li>Customer’s delivery address:</li>
        <li>Signature: (Only if the form is physically delivered)</li>
        <li>Date:</li>
    </ul>
    <p class="section-header"><strong>GETİR PERAKENDE LOJİSTİK ANONİM ŞİRKETİ DISTANCE SALES AGREEMENT</strong></p>
    <p class="primary-title"><strong>1. SCOPE</strong></p>
    <p>This Agreement sets out the rights and obligations of the Parties in connection with the sale and delivery by Seller of the Product ordered by the Customer by choosing the type/name, quantity, sale price, delivery price, payment method using the Application under the Consumer Protection Law no. 6502, Distance Sales Regulation and relevant legislation.</p>
    <p>Capitalized terms used under the Agreement shall have the meanings ascribed to them under the Form.</p>
    <p class="primary-title"><strong>2. SELLER, CUSTOMER AND PRODUCT INFORMATION</strong></p>
    <p class="secondary-title"><strong>INTERMEDIARY SERVICE PROVIDER INFORMATION</strong></p>
    <p>Title: Getir Perakende Lojistik A.Ş. (“Getir”)</p>
    <p>Etiler Mah. Tanburi Ali Efendi Sok. Maya Residences Sit. T Blok No: 13/334 Beşiktaş/Istanbul</p>
    <p>Phone number: +90 (850) 532 50 50</p>
    <p>E-mail: info@getir.com</p>
    <p>Mersis No: 0394048265800010</p>
    <p class="secondary-title"><strong>SELLER INFORMATION</strong></p>
    <p>Title: ${foodOrder?.restaurant?.companyName}</p>
    <p>Address: ${foodOrder?.restaurant?.companyAddress}</p>
    <p>Phone number: </p>
    <p>E-mail: ${foodOrder?.restaurant?.email}</p>
    <p>Mersis No: </p>
    <p class="secondary-title"><strong>CUSTOMER INFORMATION</strong></p>
    <p>Recipient: ${foodOrder?.client?.name}</p>
    <p>Delivery Address: ${foodOrder?.address}</p>
    <p>Phone number: ${foodOrder?.client?.gsm}</p>
    <p>E-mail: ${foodOrder?.client?.email}</p>
    <p class="secondary-title"><strong>INVOICE INFORMATION</strong></p>
    <p>Name-Surname/Title: ${foodOrder?.invoice?.title}</p>
    <p>Address: ${foodOrder?.invoice?.address}</p>
    <p>Phone number: ${foodOrder?.invoice?.gsm}</p>
    <p>E-mail: ${foodOrder?.invoice?.email}</p>
    <p class="secondary-title"><strong>PRODUCT INFORMATION</strong></p>
    <div align="center">
        <table style="border: 1px dashed #000000;" border="0" cellpadding="0" width="100%">
            <thead>
            <tr height="30px">
                <th width="50%">Product Description</th>
                <th width="5%">Piece</th>
                <th width="20%">Price</th>
                <th width="20%">Sale Price (Tax Included)</th>
            </tr>
            </thead>
            <tbody>
            ${foodOrder?.products?.map(product => `
              <tr height="28px">
                <td style="text-align:center;">${product?.name} ${product?.selectedAmount ? product?.selectedAmount : '-'}</td>
                <td style="text-align:center;">${product?.count}</td>
                <td style="text-align:center;">${product?.priceTaxExcluded ? product?.priceTaxExcluded : '-'}</td>
                <td style="text-align:center;">₺${product?.price}</td>
              </tr>
            `)}
            </tbody>
        </table>
    </div>
    <p class="primary-title"><strong>3. FEES AND FEE COLLECTION</strong></p>
    <p><strong>3.1.</strong> Customer has been notified regarding the Product sale price, delivery fees, delivery vehicle fees and all other additional fees including taxes, duties and charges through the Application prior to placing the order.</p>
    <p><strong>3.2.</strong> Customer shall submit its credit/debit card or meal card information during the on-boarding on the Application in order to make payments using credit card. The Application has been designed to ensure safe and secure submission of credit card information of the Customer while placing an order. The sales price of the product is collected by Getir on behalf of the seller.In case cash on delivery payment method is selected by the Customer, the sales price of the Product and any other charges, if any, and any additional fees such as taxes, fees, charges, will be collected from the Customer in cash, from credit or debit card by the Seller at the time of delivery.</p>
    <p><strong>3.3.</strong> Upon placing of the order, Product sale price, delivery fees, delivery vehicle fees and any and all other additional fees including taxes, duties and charges shall be immediately withdrawn from the credit/debit card or meal card provided by the Customer.</p>
    <p><strong>3.4.</strong> Getir or the Seller shall be released from its delivery obligation in case the Customer fails to pay the Product fees or payment is cancelled by the bank/finance institution for any reason.</p>
    <p><strong>3.5.</strong> In any event, the Customer agrees to compensate Seller for any and all losses and damages of Seller in case the Customer defaults in performance of its obligations owed to the Seller.</p>
    <p><strong>3.6.</strong> Customer accepts that credit card interest rates shall be applied as per the agreement between the Customer and the bank for payments made using credit card.</p>
    <p><strong>3.7.</strong> For payments made with credit or debit card or meal card, Customer will not be reimbursed in cash in case the Customer exercises its withdrawal right for the Product or if the Product is returned, or if the order is cancelled for any reason. Reimbursement of the Product price to the credit/debit card is made as per the relevant procedures of the bank. In cases where cash on door payment method was chosen by the Customer, the price paid by the Customer will be returned to the Customer by the Seller. In cases where payment is made by credit card or debit card at the door, within the scope of requests received within the same day, the transaction will be canceled by the Seller through the POS device and the fee will be refunded to the Customer. Refunds for requests not made on the same day will be made according to the procedures of the relevant bank. Refunds for payments made by meal cards will be made according to the procedures determined by the Seller.</p>
    <p class="primary-title"><strong>4. TERMS OF USE AND GENERAL CONDITIONS</strong></p>
    <p><strong>4.1.</strong> Getir and the Seller accept that the information provided in the Form related to Getir is true and accurate, and that the Customer has been notified regarding all its rights as per the Form and the Agreement</p>
    <p><strong>4.2.</strong> Seller shall deliver the Product to the Customer in good form, complete, in compliance with the product specifications and legislation together with any warranties and user manuals (if any).</p>
    <p><strong>4.3.</strong> Getir or the Seller shall address any questions submitted to its contact channels provided in the Form and the Agreement. Getir may request information which will enable it to identify the relevant Customer under its data processing procedures within this context.</p>
    <p><strong>4.4.</strong> All information available in the Application including but not limited to the fees are applicable unless modified through the Application.</p>
    <p><strong>4.5.</strong> Visual used on the Application may be representative. The copyrights of all content and visuals available on the Application are reserved, and their partial or full use, distribution, publication or re-processing are strictly forbidden.</p>
    <p><strong>4.6.</strong> Customer accepts and confirms that it has read the Form and has been notified about the essential features and specifications of the Product, sale price, payment methods and delivery. Customer’s digital acceptance of the Form confirms that the Customer has truly and accurately received all legally required information to be provided to the Customer prior to the execution of the distance sales agreement including but not limited to the essential features of the Product, product price including tax as well as other costs related to delivery and payment and delivery information.</p>
    <p><strong>4.7.</strong> Customer has been notified in detail regarding the scope of its withdrawal right as well its terms of use under the Form.</p>
    <p><strong>4.8.</strong> In cases where the Customer is provided with a gift coupon allowing it to pay for one or more products, the Customer may not request any refund or compensation if the gift coupon is not used within the designated period or if the order is cancelled due to Customer’s use of the coupon against the terms of use or abuse.</p>
    <p><strong>4.9.</strong> Getir may cancel the order if the Customer and the holder of the credit or debit card used in the order does not match and if any security breach is identified with regard to the card prior to the delivery of the Product to the recipient specified on the Application.</p>
    <p><strong>4.10.</strong> Links may be provided to other websites, electronic applications and/or other content outside Getir’s control and/or owned or managed by third parties through the Application. These links are provided for the convenience of the Customer for the purposes of redirecting and Getir will not be liable for any content on the links. Relevant privacy-security policies apply to websites or applications accessed through the Application.</p>
    <p class="primary-title"><strong>5. DELIVERY</strong></p>
    <p><strong>5.1.</strong> The Product purchased by the Customer from the Seller through Getir shall be delivered to the person/persons located in the address provided by the Customer through the Application, the address which is expressly available in the Form.</p>
    <p><strong>5.2.</strong> Any and all delivery fees, delivery vehicle fees and all other additional fees including taxes, duties and charges shall be borne by the Customer unless clearly expressed otherwise in the Application.</p>
    <p><strong>5.3.</strong> Delivery of the Product is completed within the time period set out under the Form as of stock availability and completion of payment.</p>
    <p><strong>5.4.</strong> Getir or the Seller shall be released from its delivery obligation in case the Customer fails to pay the Product fees or payment is cancelled by the bank/finance institution for any reason. Customer accepts that Getir shall not assume any liability in connection with the payments made by the bank/finance institution to Getir where the bank/finance institution sends a failure code for any reason.</p>
    <p><strong>5.5.</strong>In case cash on delivery payment method is selected by the Customer, the sales price of the Product and any other charges, if any, and any additional fees such as taxes, fees, charges, will be collected from the Customer in cash, from credit or debit card or meal card by the Seller at the time of delivery.</strong></p>
    <p class="primary-title"><strong>6. CUSTOMER’S REPRESENTATIONS AND UNDERTAKINGS</strong></p>
    <p><strong>6.1.</strong> Customer undertakes that all information including its tax number and the tax office is true and accurate, and that it shall immediately compensate Getir/the Seller for any and all losses Getir/the Seller may suffer due to inaccuracy of such information upon Getir’s primary notice.</p>
    <p><strong>6.2.</strong> Customer declares that it has reviewed the Form provided with regard to all matters including the essential features-specifications of the Product, sale price, delivery procedures, refund and withdrawal right and contact information, all legally required has been made to the Customer, and it has digitally accepted the Form.</p>
    <p><strong>6.3.</strong> Customer agrees to abide by the relevant legislation while using the Application. In no event shall the Customer use the Application against public order or public morals, for disturbing and harassing others, for illegal purposes, in breach of others’ material and moral rights. Customer may also not engage in acts preventing others from using the Application or making it difficult for others to use the Application (spam, virus, trojan horse etc.). All legal and penal liability shall be exclusively borne by the Customer otherwise. Getir’s rights to initiate legal action against the Customer for breach of legislation or the Agreement are reserved.</p>
    <p><strong>6.4.</strong> Getir’s right to suspend, update or amend the terms of the promotions/campaigns and validity of the gift coupons announced in the Application at any time it wishes is reserved. Customer shall review the terms of use of the promotions/campaigns, gift coupons prior to placing each order on the Application.</p>
    <p><strong>6.5.</strong> Customer may not use more than one promotion, campaign or gift coupon on the same order unless expressly announced otherwise on the Application.</p>
    <p><strong>6.6.</strong> Customer shall examine the Products subject to the Agreement prior to accepting delivery. Customer shall be liable for accepting delivery of damaged and defective Products such as damaged, crushed, broken Products and Products with ripped packages or for failure to immediately inform Getir or the Seller regarding missing Products. Product delivery of which has been accepted by the Customer is otherwise deemed to be free of harm, complete, intact and conforming to the requests in the Order.</p>
    <p><strong>6.7.</strong> Getir or the Seller will perform deliveries in the areas designated by Getir where orders may be placed using the Application. No delivery will be performed through the Application outside these designated areas where an order may be placed. Product will be delivered to the address provided by the Customer while placing the order. Customer may not change the address after the completion of the order. Getir or the Seller assume no liability in the event the Customer or the specified recipient is not present in the delivery address, the said persons refuse to take delivery of the Product or if the address is incorrect, and Getir or the Seller will be deemed to have made full and complete performance in this case. Any and all losses arising from the Customer’s late acceptance of the delivery of the Product as well as any and all costs arising in connection with the Product being held due to Customer’s fault and/or return of the Product to Getir or the Seller due to non-delivery shall be borne by the Customer.</p>
    <p class="primary-title"><strong>7. LIABILITY</strong></p>
    <p>Getir or the Seller shall have no liability for its failure to comply with its obligations under the Form and the Agreement in case of Force Majeure or due to any other reason not objectively arising from its own fault.</p>
    <p class="primary-title"><strong>8. CONTACT INFORMATION</strong></p>
    <p>Our customer service can be reached by phone at +90 (850) 532 50 50 or by e-mail at info@getir.com for any queries regarding the Order.</p>
    <p class="primary-title"><strong>9. JURISDICTION</strong></p>
    <p>Parties accept the jurisdiction of the consumer arbitration committee located in the registered address of the Customer and the Seller for any disputes arising from the Agreement within the monetary limits set out under relevant legislation, and the jurisdiction of the consumer courts located in the address of the Customer and Seller for any disputes arising from the Agreement outside the said monetary limits.</p>
    <p class="primary-title"><strong>10. EVIDENCE AGREEMENT</strong></p>
    <p>Customer accepts that both the information kept in Getir’s or Seller’s official books and commercial records and electronic records and computer and voice records kept in Getir’s databases and servers shall constitute evidence for any and all disputes which may arise in connection with the Agreement, and that this clause herein constitutes an evidence agreement within the meaning of article 193 of the Code of Civil Procedure.</p>
    <p class="primary-title"><strong>11. EFFECTIVE DATE</strong></p>
    <p>All terms and conditions under the Form and the Agreement shall come into effect immediately as of the time the Customer clicks the “I have read and accepted the Pre-Disclosure Form and the Distance Sales Agreement” button in the Application.</p>
</main>
</body>
</html>
`.replace(/\n/g, '');
