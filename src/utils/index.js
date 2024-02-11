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
        path: "/product/listing/starship",
    },
    {
        id: "listingLightSaber",
        label: "Light Saber",
        path: "/product/listing/lightsaber",
    },
    {
        id: "listingHelmet",
        label: "Helmet",
        path: "/product/listing/helmet",
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
        id: 'priceDrop',
        type : 'number',
        placeholder : "Enter Price Drop",
        label : 'PriceDrop',
        componentType : 'input'
    },
];


export const firebaseConfig = {
    apiKey: "AIzaSyBeDc6zGxoNIq36kO2p2Ma8oaZtGFVEVoU",
    authDomain: "starwars-ecommerce.firebaseapp.com",
    projectId: "starwars-ecommerce",
    storageBucket: "starwars-ecommerce.appspot.com",
    messagingSenderId: "1023121887501",
    appId: "1:1023121887501:web:c5f31d168d849f66fba044",
    measurementId: "G-M063GGM88H"
};

export const firebaseStorageUrl = 'gs://starwars-ecommerce.appspot.com'