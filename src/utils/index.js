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
];

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
];

export const adminAddProductFormControls = [
    {
        id: 'name',
        type : 'text',
        placeholder : "Enter name",
        label : 'Name',
        componentType : 'input'
    },
    {
        id: 'price',
        type : 'number',
        placeholder : "Enter price",
        label : 'Price',
        componentType : 'input'
    },
    {
        id: 'description',
        type : 'text',
        placeholder : "Enter description",
        label : 'Description',
        componentType : 'input'
    },
    {
        id: 'category',
        type : '',
        placeholder : "",
        label : 'Category',
        componentType : 'select',
        options: [
            {
                id : "starship",
                label : "Starship"
            },
            {
                id : "lightsaber",
                label : "Light Saber"
            },
            {
                id : "helmet",
                label : "Helmet"
            }
        ]
    },
    {
        id: 'deliveryInfo',
        type : 'text',
        placeholder : "Enter Delivery Info",
        label : 'Delivery Info',
        componentType : 'input'
    },
    {
        id: 'onSale',
        type : '',
        placeholder : "",
        label : 'On Sale',
        componentType : 'select',
        options: [
            {
                id : "yes",
                label : "Yes"
            },
            {
                id : "no",
                label : "No"
            }
        ]
    },
    {
        id: 'price',
        type : 'number',
        placeholder : "Enter Price",
        label : 'Price',
        componentType : 'input'
    },
];