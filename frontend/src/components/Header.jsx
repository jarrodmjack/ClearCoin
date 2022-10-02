


const Header = () => {




    return (
        <header className="navbar bg-base-300 h-32">
            <div className="container mx-auto">
                <div className="flex-1">
                    <a className="btn btn-ghost normal-case text-xl">Clearcoin</a>
                </div>
                <div className="flex-none gap-2">
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle w-24 h-24 avatar">
                            <div className="w-20 rounded-full">
                                <img className="w-20" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Chelonia_mydas_is_going_for_the_air_edit.jpg/1200px-Chelonia_mydas_is_going_for_the_air_edit.jpg" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header