'use strict';

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const stripe = require('stripe')(process.env.STRIPE_KEY)

const MY_DOMAIN = 'https://nuxt-strapi-ecommerce.herokuapp.com/cart';

module.exports = {
    async create(ctx) {

        console.log('ctx', ctx.request.body)
        const { cartDetail, cartTotal } = ctx.request.body
        //build line items array
        const line_items = cartDetail.map((cartItem) => {
            const item = {}
            item.price_data = {
                currency: 'usd',
                product_data: {
                    name: cartItem.name,
                    images: [`${cartItem.url}`]
                },
                unit_amount: (cartItem.price * 100).toFixed(0),
            },
            item.quantity = cartItem.quantity
            return item;
        })
        await strapi.services.order.create(line_items)
        console.log('line_items', line_items)
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items,
            mode: 'payment',
            success_url: `${MY_DOMAIN}?success=true`,
            cancel_url: `${MY_DOMAIN}?canceled=true`,
        })
        return { id: session.id}
    } 
};
