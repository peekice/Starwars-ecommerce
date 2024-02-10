export const navOptions = [
    {
        id: "home",
        label: "Home",
        path: "/",
    },
    {
        id: "listing",
        label: "All Products",
        path: "/product/listing/all-products",
    },
    {
        id: "listingStarShip",
        label: "Star Ship",
        path: "/product/listing/StarShip",
    },
    {
        id: "listingLightSaber",
        label: "Light Saber",
        path: "/product/listing/LightSaber",
    },
    {
        id: "listingHelmet",
        label: "Helmet",
        path: "/product/listing/Helmet",
    },
];

export const adminNavOptions = [
    {
        id: "adminListing",
        label: "Manage All Products",
        path: "/admin-view/all-products",
    },
    {
        id: "adminNewProduct",
        label: "Add New Product",
        path: "/admin-view/add-product",
    },
];

export const registrationFormControls = [
    {
        id: 'name',
        type : 'text',
        placeholder : "Enter your name",
        label : 'Name',
    },
    {
        id: 'email',
        type : 'email',
        placeholder : "Enter your email",
        label : 'Email',
    },
    {
        id: 'password',
        type : 'password',
        placeholder : "Enter your password",
        label : 'Password',
    },
]

export const loginFormControls = [
    {
        id: 'email',
        type : 'email',
        placeholder : "Enter your email",
        label : 'Email',
    },
    {
        id: 'password',
        type : 'password',
        placeholder : "Enter your password",
        label : 'Password',
    },
]