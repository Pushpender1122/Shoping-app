export const loginHomeTourConfig = {
    showProgress: true,
    steps: [
        { element: '.open-menu-login-account', popover: { title: 'Login and Sign up', description: 'You can click here to login or sign up for an account.', side: "left", align: 'start' } },
        { element: '#wishlist', popover: { title: 'Wishlist', description: 'You can click here to view your wishlist.', side: "left", align: 'start' } },
        { element: '#product_cart', popover: { title: 'Cart', description: 'You can click here to view your cart.', side: "left", align: 'start' } },
    ]
}
export const homeTourConfig = {
    showProgress: true,
    steps: [
        { element: '.open-menu-login-account', popover: { title: 'Account Menu', description: 'You can click here to view admin panel.', side: "left", align: 'start' } },
        // { element: '#wishlist', popover: { title: 'Wishlist', description: 'You can click here to view your wishlist.', side: "left", align: 'start' } },
        // { element: '#product_cart', popover: { title: 'Cart', description: 'You can click here to view your cart.', side: "left", align: 'start' } },
    ]
}
export const loginTourConfig = {
    showProgress: true,
    steps: [
        { element: '#visitor_login', popover: { title: 'Login', description: 'You can click here to login as a visitor to see additional features.', side: "left", align: 'start' } },
    ]
}
export const adminTourConfig = {
    showProgress: true,
    steps: [
        { element: '#product_count', popover: { title: 'Product', description: 'Total number of products in the store.', side: "left", align: 'start' } },
        { element: '#order_count', popover: { title: 'Orders', description: 'Total number of orders in the store.', side: "left", align: 'start' } },
        { element: '#user_count', popover: { title: 'Users', description: 'Total number of users in the store.', side: "left", align: 'start' } },
        { element: '#admin_home', popover: { title: 'Admin Home', description: 'You can click here to go back to the home page.', side: "left", align: 'start' } },
        { element: '#admin_products', popover: { title: 'Admin Product', description: 'You can click here to view all products.', side: "left", align: 'start' } },
        { element: '#admin_customers', popover: { title: 'Admin User', description: 'You can click here to view all users.', side: "left", align: 'start' } },
        { element: '#admin_transactions', popover: { title: 'Admin Order', description: 'You can click here to view all orders.', side: "left", align: 'start' } },

    ]
}