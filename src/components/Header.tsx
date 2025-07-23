import { MapPinIcon } from '@phosphor-icons/react'

const Header = () => {
  return (
    <header className="w-full bg-white shadow-md h-16 px-4 flex items-center justify-between">
      {/* Left: Logo */}
      <div className="text-xl font-bold">Madrasa</div>

      {/* Right: Select Location Button */}
      <button className="flex flex-col items-end text-right">
        <div className="flex items-center space-x-1 text-sm font-semibold text-black">
          <span>Select Location</span>
        </div>
        <span className="text-xs text-purple-600 flex">
          <MapPinIcon size={16} weight="fill" />
            Get accurate Namaz time
        </span>
      </button>
    </header>
  )
}

export default Header
