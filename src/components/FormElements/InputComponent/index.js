export default function InputComponent({label,placeholder, onChange, value, type}) {
    return (
        <div className="relative">
            <p className="absolute bg-white pt-0 pr-2 pl-2 pb-0 -mt-3 mr-0 mb-5 ml-2 font-medium text-gray-600">{label}</p>
            <input
            placeholder={placeholder}
            type={type || 'text'}
            value={value}
            onChange={onChange}
            className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-0 ml-0 mb-0 mr-0 text-base block bg-white border-gray rounded-md"
            />
        </div>
    )
}