import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

export default function Alert({ title, description }) {
  return (
    <div className="fixed text-white right-0 top-24 z-50">
      <div className="rounded-md bg-red-50 opacity-90 p-4 m-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <ExclamationTriangleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">{ title }</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>
                { description }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
