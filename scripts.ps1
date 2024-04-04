# this script works with YARN Package Manager (https://yarnpkg.com/)

# create new app
yarn create react-app mtw-app --template typescript

# install packages
yarn add -D @types/mime@3
yarn add -D @heroicons/react
yarn add -D react-zoom-pan-pinch
yarn add -D tailwind-scrollbar
yarn add -D tailwindcss
yarn add -D react-swipeable
yarn add -D react-router-dom
yarn add -D classnames
yarn add -D @headlessui/react
yarn add -D @babel/plugin-proposal-private-property-in-object # bug?

yarn tailwindcss init

# testing framework
yarn add -D jest
yarn test --watchAll

# start local server
yarn run start

# split long classnames
function Invoke-TransformCSSClasses([string] $ClassNames) {
  $classesArray = $ClassNames.Split(" ") | ForEach-Object { "`""+ $_ + "`"" }
  return "className={classNames(`r`n" + ($classesArray -join "`r`n") + "`r`n)}"
}

$ClassName
Invoke-TransformCSSClasses -ClassNames $ClassName | Set-Clipboard