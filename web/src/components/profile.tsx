import { getAuth, updateProfile } from "firebase/auth";
import { app } from "../firebaseConfig";

function Profile() {
  const auth = getAuth(app);
  const currentUser = auth.currentUser;
  const user = {
      name: currentUser?.displayName,
      email: currentUser?.email,
      imageUrl:
        currentUser?.photoURL || 'https://upload.wikimedia.org/wikipedia/en/thumb/7/70/Graduation_%28album%29.jpg/220px-Graduation_%28album%29.jpg',
  }

  async function handleProfileChange(event) {
    event.preventDefault();

    if (currentUser) {
      const newPhotoURL:string = event.target[0].value;
      const newDisplayName:string = event.target[1].value;
      
      updateProfile(currentUser, {
        displayName: newDisplayName, photoURL: newPhotoURL
      }).then(() => {
        alert("Updated Profile")
      }).catch((error) => {
        alert("Error: " + error)
      });
    }
  }

  return(
      <div className="container mx-auto w-fit">
          <div className="">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
              <div>
                <h2 className="text-base font-semibold leading-7 text-black dark:text-gray-400">Personal Information</h2>
                <p className="mt-1 text-sm leading-6 text-gray-900 dark:text-gray-400">
                  Use a permanent address where you can receive email.
                </p>
              </div>

              <form className="md:col-span-2" onSubmit={handleProfileChange}>
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                  <div className="col-span-full flex flex-col sm:flex-row items-center gap-x-8">
                    <img
                      src={ user.imageUrl }
                      alt=""
                      className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                    />    
                    <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-black dark:text-white">
                      Profile Picture URL
                    </label>
                    <input
                        type="text"
                        name="profile-picture-url"
                        id="profile-picture-url"
                        autoComplete="profile-picture-url"
                        className="rounded-md border-0 p-2 bg-gray-600/5 dark:bg-white/5 py-1.5 text-black dark:text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                        defaultValue={ user.imageUrl }
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-full">
                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-black dark:text-white">
                      Name
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="name"
                        defaultValue={ user.name || "" }
                        className="block w-full p-2 rounded-md border-0 bg-gray-600/5 dark:bg-white/5 py-1.5 text-black dark:text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex">
                  <button
                    type="submit"
                    className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
              <div>
                <h2 className="text-base font-semibold leading-7 text-black dark:text-white">Change password</h2>
                <p className="mt-1 text-sm leading-6 text-gray-400">
                  Update your password associated with your account.
                </p>
              </div>

              <form className="md:col-span-2">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                  <div className="col-span-full">
                    <label htmlFor="current-password" className="block text-sm font-medium leading-6 text-black dark:text-white">
                      Current password
                    </label>
                    <div className="mt-2">
                      <input
                        id="current-password"
                        name="current_password"
                        type="password"
                        autoComplete="current-password"
                        className="block w-full rounded-md border-0 bg-gray-600/5 dark:bg-white/5 py-1.5 text-black dark:text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="new-password" className="block text-sm font-medium leading-6 text-black dark:text-white">
                      New password
                    </label>
                    <div className="mt-2">
                      <input
                        id="new-password"
                        name="new_password"
                        type="password"
                        autoComplete="new-password"
                        className="block w-full rounded-md border-0 bg-gray-600/5 dark:bg-white/5 py-1.5 text-black dark:text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-black dark:text-white">
                      Confirm password
                    </label>
                    <div className="mt-2">
                      <input
                        id="confirm-password"
                        name="confirm_password"
                        type="password"
                        autoComplete="new-password"
                        className="block w-full rounded-md border-0 bg-gray-600/5 dark:bg-white/5 py-1.5 text-black dark:text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex">
                  <button
                    type="submit"
                    className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
      </div>
  )
}

export default Profile;