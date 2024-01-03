
export default function FloatingBtn() {
    return(
        <>
            <div className="fixed text-white right-0 top-24">
                <div className="rounded-md bg-red-50 opacity-90 p-4 m-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                        {/* <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" /> */}
                        </div>
                        <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Title</h3>
                        <div className="mt-2 text-sm text-red-700">
                            <p>
                            Descriptiongiorgurighgriughriugfhedfugiufhgiughiu rhgiurgh
                            </p>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}