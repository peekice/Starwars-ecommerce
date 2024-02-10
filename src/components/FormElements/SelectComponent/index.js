export default function SelectComponent({label,onChange, value, option = []}){
    return(
        <div className="relative">
            <p className="pt-0 pr-2 pl-2 pb-0 -mt-3 mr-0 mb -0 ml-2 font-medium text-gray-600">{label}</p>
            <select value={value} onChange={onChange} className="border placeholder-gray-400 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-0 ml-0 mb-0 mr-0 text-base block bg-white border-gray rounded-md">
                {
                    option && option.length ?
                        option.map(optionItems => <option id={optionItems.id} value={optionItems.id} key={optionItems.id}>{optionItems.label}</option>)
                        : <option id="" value={''} >Select</option>
                }
            </select>
        </div>
    )
}