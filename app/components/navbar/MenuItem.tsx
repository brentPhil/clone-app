'use client'

interface MenuItemProps {
    onclick: () => void;
    label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
    onclick,
    label
}) => {
  return (
    <div
    onClick={onclick}
    className="px-4 py-3 font-semibold text-gray-500 transition  hover:text-gray-800 hover:bg-neutral-100">
        {label}
    </div>
  )
}

export default MenuItem
